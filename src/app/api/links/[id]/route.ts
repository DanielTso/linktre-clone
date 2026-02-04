import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json();

  const link = await prisma.link.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(link);
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  await prisma.link.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
