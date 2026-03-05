"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getBhajans() {
  return await prisma.bhajan.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createBhajan(data: {
  title: string;
  lyrics: string;
  singer?: string;
  audioUrl?: string;
  categoryId: string;
}) {
  const bhajan = await prisma.bhajan.create({
    data,
  });
  revalidatePath("/admin/bhajans");
  revalidatePath("/library");
  return bhajan;
}

export async function updateBhajan(
  id: string,
  data: {
    title?: string;
    lyrics?: string;
    singer?: string;
    audioUrl?: string;
    categoryId?: string;
  },
) {
  const bhajan = await prisma.bhajan.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/bhajans");
  revalidatePath("/library");
  return bhajan;
}

export async function deleteBhajan(id: string) {
  await prisma.bhajan.delete({
    where: { id },
  });
  revalidatePath("/admin/bhajans");
  revalidatePath("/library");
}

export async function getCategories() {
  let categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (categories.length === 0) {
    const defaultCategories = [
      "Shiva",
      "Krishna",
      "Devi",
      "Ganapathy",
      "Ayyappa",
    ];
    await prisma.category.createMany({
      data: defaultCategories.map((name) => ({ name })),
    });
    categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  return categories;
}
