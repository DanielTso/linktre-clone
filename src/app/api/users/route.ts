import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      links: { orderBy: { order: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, name, bio } = body;

  if (!username || !name) {
    return NextResponse.json(
      { error: "Username and name are required" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    return NextResponse.json(
      { error: "Username already taken" },
      { status: 409 }
    );
  }

  const user = await prisma.user.create({
    data: { username, name, bio },
    include: { links: true },
  });

  return NextResponse.json(user, { status: 201 });
}
