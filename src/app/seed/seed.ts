import { BillingInterval } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";

async function main() {
  const billingPlans = [
    {
      name: "Basic",
      slug: "basic",
      description: "Basic plan for small businesses",
      amount: 499,
      currency: "usd",
      interval: BillingInterval.MONTHLY,
      isActive: true,
    },
    {
      name: "Standard",
      slug: "standard",
      description: "Standard plan for growing businesses",
      amount: 999,
      currency: "usd",
      interval: BillingInterval.MONTHLY,
      isActive: true,
    },
    {
      name: "Premium",
      slug: "premium",
      description: "Premium plan for large businesses",
      amount: 1999,
      currency: "usd",
      interval: BillingInterval.MONTHLY,
      isActive: true,
    },
  ];

  for (const plan of billingPlans) {
    const existingPlan = await prisma.billingPlan.findUnique({
      where: {
        slug: plan.slug,
      },
    });

    if (!existingPlan) {
      await prisma.billingPlan.create({
        data: plan,
      });
      console.log(`${plan.name} plan created`);
    } else {
      console.log(`${plan.name} plan already exists`);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Billing plan seeding completed");
  })
  .catch(async (error) => {
    console.error("Seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
