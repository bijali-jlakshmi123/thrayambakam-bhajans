"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getVideos() {
  return await prisma.video.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createVideo(data: { title: string; youtubeId: string }) {
  const video = await prisma.video.create({
    data,
  });
  revalidatePath("/admin/videos");
  revalidatePath("/videos");
  return video;
}

export async function updateVideo(
  id: string,
  data: {
    title?: string;
    youtubeId?: string;
  },
) {
  const video = await prisma.video.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/videos");
  revalidatePath("/videos");
  return video;
}

export async function deleteVideo(id: string) {
  await prisma.video.delete({
    where: { id },
  });
  revalidatePath("/admin/videos");
  revalidatePath("/videos");
}
