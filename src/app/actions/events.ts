"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { EventType } from "@prisma/client";

export async function getEvents() {
  return await prisma.event.findMany({
    orderBy: {
      date: "desc",
    },
  });
}

export async function createEvent(data: {
  title: string;
  description?: string;
  date: Date;
  location?: string;
  imageUrl?: string;
  type: EventType;
}) {
  const event = await prisma.event.create({
    data,
  });
  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
  return event;
}

export async function updateEvent(
  id: string,
  data: {
    title?: string;
    description?: string;
    date?: Date;
    location?: string;
    imageUrl?: string;
    type?: EventType;
  },
) {
  const event = await prisma.event.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
  return event;
}

export async function deleteEvent(id: string) {
  await prisma.event.delete({
    where: { id },
  });
  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
}
