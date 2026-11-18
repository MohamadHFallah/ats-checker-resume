import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireApiAuth } from "@/lib/auth/getApiSession";

export async function GET() {
  const session = await requireApiAuth();
  if (!session) {
    return NextResponse.json({ error: "Sign in to view your saved resumes." }, { status: 401 });
  }
console.log('sddddddddddddddddddddddddddddddddddddd');

  try {
    const resumes = await prisma.resume.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        analysis: true,
        comparisons: {
          orderBy: { createdAt: "desc" },
          select: { id: true, title: true, createdAt: true, analysis: true },
        },
      },
    });
console.log('resumes ',resumes);

    return NextResponse.json({ resumes });
  } catch(e) {
    console.log('error ',e);
    
    return NextResponse.json({ error: "Saved resumes could not be loaded." }, { status: 500 });
  }
}
