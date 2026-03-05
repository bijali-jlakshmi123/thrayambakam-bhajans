import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not defined");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "bijalijayalakshmijayan@gmail.com";
  const password = "bijali123";

  console.log(`Setting up admin user: ${email}`);

  try {
    const admin = await prisma.admin.upsert({
      where: { email },
      update: { password },
      create: {
        email,
        password,
      },
    });
    console.log("Admin user created/updated successfully:", admin);
  } catch (error) {
    console.error("Error setting up admin:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
