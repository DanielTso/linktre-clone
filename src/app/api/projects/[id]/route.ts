import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json();

  const project = await prisma.project.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(project);
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  await prisma.project.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
