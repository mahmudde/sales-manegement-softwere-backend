import { envVars } from "../config/env";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

const seedPlatformSuperAdmin = async () => {
  const email = envVars.PLATFORM_SUPER_ADMIN_EMAIL || "platformadmin@gmail.com";
  const password = envVars.PLATFORM_SUPER_ADMIN_PASSWORD || "12345678";
  const name = envVars.PLATFORM_SUPER_ADMIN_NAME || "Platform Super Admin";

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    if (existingUser.platformRole !== "PLATFORM_SUPER_ADMIN") {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          platformRole: "PLATFORM_SUPER_ADMIN",
          emailVerified: true,
        },
      });
    }

    console.log("Platform super admin already exists");
    return;
  }

  const result = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  if (!result?.user?.id) {
    throw new Error("Failed to create platform super admin");
  }

  await prisma.user.update({
    where: {
      id: result.user.id,
    },
    data: {
      platformRole: "PLATFORM_SUPER_ADMIN",
      emailVerified: true,
    },
  });

  console.log("Platform super admin created successfully");
};

const main = async () => {
  try {
    await seedPlatformSuperAdmin();
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main();
