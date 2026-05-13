import {
  OrgRole,
  OrganizationStatus,
  PlatformRole,
  SubscriptionStatus,
  UserStatus,
} from "../../generated/prisma/enums";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

const DEMO_CREDENTIALS = {
  admin: {
    name: "Demo Organization Admin",
    email: "admin@mitsales.demo",
    password: "12345678",
  },
  staff: {
    name: "Demo Staff User",
    email: "staff@mitsales.demo",
    password: "12345678",
  },
  platform: {
    name: "Platform Super Admin",
    email: "platformadmin@gmail.com",
    password: "12345678",
  },
};

const DEMO_ORG = {
  name: "M ITSales Demo Organization",
  slug: "mitsales-demo-organization",
};

const DEMO_SHOP = {
  name: "Demo Main Shop",
  slug: "demo-main-shop",
};

const ensureUser = async (payload: {
  name: string;
  email: string;
  password: string;
  platformRole?: PlatformRole;
}) => {
  const existing = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existing) {
    return prisma.user.update({
      where: { id: existing.id },
      data: {
        name: payload.name,
        emailVerified: true,
        status: UserStatus.ACTIVE,
        isDeleted: false,
        deletedAt: null,
        platformRole: payload.platformRole ?? null,
      },
    });
  }

  const created = await auth.api.signUpEmail({
    body: {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    },
  });

  if (!created?.user?.id) {
    throw new Error(`Failed to create demo user: ${payload.email}`);
  }

  return prisma.user.update({
    where: { id: created.user.id },
    data: {
      emailVerified: true,
      status: UserStatus.ACTIVE,
      platformRole: payload.platformRole ?? null,
    },
  });
};

const ensureOrganizationSubscription = async (organizationId: string) => {
  const plan =
    (await prisma.billingPlan.findUnique({
      where: { slug: "basic" },
    })) ||
    (await prisma.billingPlan.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
    }));

  if (!plan) {
    throw new Error("No billing plan found. Run billing seed first.");
  }

  const now = new Date();
  const inOneYear = new Date(now);
  inOneYear.setFullYear(inOneYear.getFullYear() + 1);

  const existing = await prisma.organizationSubscription.findFirst({
    where: {
      organizationId,
      status: SubscriptionStatus.ACTIVE,
    },
    orderBy: { createdAt: "desc" },
  });

  if (existing) {
    await prisma.organizationSubscription.update({
      where: { id: existing.id },
      data: {
        billingPlanId: plan.id,
        startsAt: existing.startsAt ?? now,
        endsAt: existing.endsAt ?? inOneYear,
      },
    });
    return;
  }

  await prisma.organizationSubscription.create({
    data: {
      organizationId,
      billingPlanId: plan.id,
      status: SubscriptionStatus.ACTIVE,
      startsAt: now,
      endsAt: inOneYear,
    },
  });
};

const main = async () => {
  const demoAdmin = await ensureUser(DEMO_CREDENTIALS.admin);
  const demoStaff = await ensureUser(DEMO_CREDENTIALS.staff);
  await ensureUser({
    ...DEMO_CREDENTIALS.platform,
    platformRole: PlatformRole.PLATFORM_SUPER_ADMIN,
  });

  const organization =
    (await prisma.organization.findUnique({
      where: { slug: DEMO_ORG.slug },
    })) ||
    (await prisma.organization.create({
      data: {
        name: DEMO_ORG.name,
        slug: DEMO_ORG.slug,
        status: OrganizationStatus.ACTIVE,
      },
    }));

  const shop =
    (await prisma.shop.findFirst({
      where: {
        organizationId: organization.id,
        slug: DEMO_SHOP.slug,
      },
    })) ||
    (await prisma.shop.create({
      data: {
        organizationId: organization.id,
        name: DEMO_SHOP.name,
        slug: DEMO_SHOP.slug,
      },
    }));

  await prisma.organizationMember.upsert({
    where: {
      organizationId_userId: {
        organizationId: organization.id,
        userId: demoAdmin.id,
      },
    },
    update: {
      role: OrgRole.ORG_ADMIN,
      isActive: true,
    },
    create: {
      organizationId: organization.id,
      userId: demoAdmin.id,
      role: OrgRole.ORG_ADMIN,
      isActive: true,
    },
  });

  await prisma.organizationMember.upsert({
    where: {
      organizationId_userId: {
        organizationId: organization.id,
        userId: demoStaff.id,
      },
    },
    update: {
      role: OrgRole.STAFF,
      isActive: true,
    },
    create: {
      organizationId: organization.id,
      userId: demoStaff.id,
      role: OrgRole.STAFF,
      isActive: true,
    },
  });

  const staffAssignment = await prisma.shopAssignment.findUnique({
    where: {
      shopId_userId: {
        shopId: shop.id,
        userId: demoStaff.id,
      },
    },
  });

  if (!staffAssignment) {
    await prisma.shopAssignment.create({
      data: {
        organizationId: organization.id,
        shopId: shop.id,
        userId: demoStaff.id,
        isActive: true,
      },
    });
  } else if (!staffAssignment.isActive) {
    await prisma.shopAssignment.update({
      where: { id: staffAssignment.id },
      data: { isActive: true },
    });
  }

  await ensureOrganizationSubscription(organization.id);

  console.log("Demo credentials are ready:");
  console.log("Admin:", DEMO_CREDENTIALS.admin.email, DEMO_CREDENTIALS.admin.password);
  console.log("Staff:", DEMO_CREDENTIALS.staff.email, DEMO_CREDENTIALS.staff.password);
  console.log("Platform:", DEMO_CREDENTIALS.platform.email, DEMO_CREDENTIALS.platform.password);
};

main()
  .catch((error) => {
    console.error("Demo seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
