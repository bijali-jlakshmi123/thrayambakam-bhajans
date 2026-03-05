import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const categories = [
    "Shiva Bhajans",
    "Krishna Bhajans",
    "Devi Bhajans",
    "Ganapathy Bhajans",
    "Muruga Bhajans",
    "Ayyappa Bhajans",
    "Guruvayoorappan Bhajans",
    "Saraswati Bhajans",
  ];

  console.log("Seeding categories...");

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
