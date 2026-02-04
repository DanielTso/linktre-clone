import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, url, userId, category } = body;

  if (!title || !url || !userId) {
    return NextResponse.json(
      { error: "title, url, and userId are required" },
      { status: 400 }
    );
  }

  const maxOrder = await prisma.link.aggregate({
    where: { userId },
    _max: { order: true },
  });

  const link = await prisma.link.create({
    data: {
      title,
      url,
      userId,
      category: category || "general",
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });

  return NextResponse.json(link, { status: 201 });
}
