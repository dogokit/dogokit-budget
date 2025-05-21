import { PrismaClient, TransactionType, Currency } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting database seeding...");
  console.log("👤 Creating test user...");
  // Create a test user
  const hashedPassword = await Bun.password.hash("password123");

  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "Test User",
      password: hashedPassword,
      currency: Currency.USD,
    },
  });

  console.log("📂 Creating categories...");
  // Create categories
  const categories = await prisma.$transaction([
    // Income categories
    prisma.category.create({
      data: {
        name: "Salary",
        type: TransactionType.INCOME,
        color: "#10B981",
        icon: "dollar-sign",
        userId: user.id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Freelance",
        type: TransactionType.INCOME,
        color: "#3B82F6",
        icon: "code",
        userId: user.id,
      },
    }),
    // Expense categories
    prisma.category.create({
      data: {
        name: "Housing",
        type: TransactionType.EXPENSE,
        color: "#EF4444",
        icon: "home",
        userId: user.id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Food",
        type: TransactionType.EXPENSE,
        color: "#F59E0B",
        icon: "utensils",
        userId: user.id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Transportation",
        type: TransactionType.EXPENSE,
        color: "#6366F1",
        icon: "car",
        userId: user.id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Entertainment",
        type: TransactionType.EXPENSE,
        color: "#8B5CF6",
        icon: "film",
        userId: user.id,
      },
    }),
  ]);

  console.log("💳 Creating accounts...");
  // Create accounts
  const accounts = await prisma.$transaction([
    prisma.account.create({
      data: {
        name: "Main Account",
        balance: 5000,
        color: "#3B82F6",
        icon: "wallet",
        userId: user.id,
      },
    }),
    prisma.account.create({
      data: {
        name: "Savings",
        balance: 10000,
        color: "#10B981",
        icon: "piggy-bank",
        userId: user.id,
      },
    }),
    prisma.account.create({
      data: {
        name: "Credit Card",
        balance: -1200,
        color: "#EF4444",
        icon: "credit-card",
        userId: user.id,
      },
    }),
  ]);

  console.log("💰 Creating sample transactions...");
  // Create transactions for the last 30 days
  const now = new Date();
  const transactions = [];

  // Salary (income)
  transactions.push(
    await prisma.transaction.create({
      data: {
        amount: 3500,
        type: TransactionType.INCOME,
        date: new Date(now.getFullYear(), now.getMonth(), 1),
        description: "Monthly salary",
        accountId: accounts[0].id,
        categoryId: categories[0].id,
        userId: user.id,
      },
    })
  );

  // Freelance income
  transactions.push(
    await prisma.transaction.create({
      data: {
        amount: 1200,
        type: TransactionType.INCOME,
        date: new Date(now.getFullYear(), now.getMonth(), 15),
        description: "Freelance project",
        accountId: accounts[0].id,
        categoryId: categories[1].id,
        userId: user.id,
      },
    })
  );

  // Rent (expense)
  transactions.push(
    await prisma.transaction.create({
      data: {
        amount: -1500,
        type: TransactionType.EXPENSE,
        date: new Date(now.getFullYear(), now.getMonth(), 3),
        description: "Monthly rent",
        accountId: accounts[0].id,
        categoryId: categories[2].id,
        userId: user.id,
      },
    })
  );

  // Groceries (expense)
  transactions.push(
    await prisma.transaction.create({
      data: {
        amount: -350,
        type: TransactionType.EXPENSE,
        date: new Date(now.getFullYear(), now.getMonth(), 5),
        description: "Weekly groceries",
        accountId: accounts[0].id,
        categoryId: categories[3].id,
        userId: user.id,
      },
    })
  );

  // Transportation (expense)
  transactions.push(
    await prisma.transaction.create({
      data: {
        amount: -120,
        type: TransactionType.EXPENSE,
        date: new Date(now.getFullYear(), now.getMonth(), 10),
        description: "Monthly transit pass",
        accountId: accounts[0].id,
        categoryId: categories[4].id,
        userId: user.id,
      },
    })
  );

  // Entertainment (expense)
  transactions.push(
    await prisma.transaction.create({
      data: {
        amount: -40,
        type: TransactionType.EXPENSE,
        date: new Date(now.getFullYear(), now.getMonth(), 12),
        description: "Movie night",
        accountId: accounts[0].id,
        categoryId: categories[5].id,
        userId: user.id,
      },
    })
  );

  // Transfer to savings
  transactions.push(
    await prisma.transaction.create({
      data: {
        amount: -1000,
        type: TransactionType.TRANSFER,
        date: new Date(now.getFullYear(), now.getMonth(), 25),
        description: "Monthly savings",
        accountId: accounts[0].id,
        userId: user.id,
      },
    })
  );

  // Update account balances based on transactions
  await prisma.account.update({
    where: { id: accounts[0].id },
    data: {
      balance: {
        increment: transactions
          .filter((t) => t.accountId === accounts[0].id)
          .reduce((sum, t) => sum + t.amount, 0),
      },
    },
  });

  await prisma.account.update({
    where: { id: accounts[1].id },
    data: {
      balance: {
        increment: transactions
          .filter((t) => t.accountId === accounts[1].id)
          .reduce((sum, t) => sum + Math.abs(t.amount), 0),
      },
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log("📊 Summary:");
  console.log(`   - Users: 1`);
  console.log(`   - Categories: ${categories.length}`);
  console.log(`   - Accounts: ${accounts.length}`);
  console.log(`   - Transactions: ${transactions.length}`);
  console.log("🌱 Seeding completed successfully!");
  console.log("🔑 Test user credentials:");
  console.log("   Email: test@example.com");
  console.log("   Password: password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
