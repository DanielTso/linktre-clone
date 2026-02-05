import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

const ALLOWED_FIELDS = new Set([
  "name",
  "bio",
  "title",
  "company",
  "email",
  "avatarUrl",
  "featured",
]);

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  try {
    const body = await request.json();

    const data: Record<string, unknown> = {};
    for (const key of Object.keys(body)) {
      if (ALLOWED_FIELDS.has(key)) {
        data[key] = body[key];
      }
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided" },
        { status: 400 }
      );
    }

    // Featured exclusivity: only one user can be featured at a time
    if (data.featured === true) {
      const user = await prisma.$transaction(async (tx) => {
        await tx.user.updateMany({
          where: { featured: true, id: { not: id } },
          data: { featured: false },
        });
        return tx.user.update({
          where: { id },
          data,
          include: { links: true, projects: true },
        });
      });
      return NextResponse.json(user);
    }

    const user = await prisma.user.update({
      where: { id },
      data,
      include: { links: true, projects: true },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2025"
    ) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
