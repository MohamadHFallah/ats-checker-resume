import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireApiAuth } from "@/lib/auth/getApiSession";

export async function GET() {
  const session = await requireApiAuth();
  if (!session) {
    return NextResponse.json({ error: "Sign in to view your saved resumes." }, { status: 401 });
  }

  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, createdAt: true, updatedAt: true, analysis: true },
  });

  return NextResponse.json({ resumes });
}
