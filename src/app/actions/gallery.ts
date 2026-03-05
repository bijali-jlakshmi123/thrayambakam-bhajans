"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getGalleryItems() {
  return await prisma.galleryItem.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createGalleryItem(data: {
  imageUrl: string;
  description?: string;
}) {
  const item = await prisma.galleryItem.create({
    data,
  });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return item;
}

export async function updateGalleryItem(
  id: string,
  data: {
    imageUrl?: string;
    description?: string;
  },
) {
  const item = await prisma.galleryItem.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return item;
}

export async function deleteGalleryItem(id: string) {
  await prisma.galleryItem.delete({
    where: { id },
  });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}
