import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description, techStack, userId, projectUrl, githubUrl } = body;

  if (!title || !description || !techStack || !userId) {
    return NextResponse.json(
      { error: "title, description, techStack, and userId are required" },
      { status: 400 }
    );
  }

  const maxOrder = await prisma.project.aggregate({
    where: { userId },
    _max: { order: true },
  });

  const project = await prisma.project.create({
    data: {
      title,
      description,
      techStack,
      userId,
      projectUrl: projectUrl || null,
      githubUrl: githubUrl || null,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });

  return NextResponse.json(project, { status: 201 });
}
