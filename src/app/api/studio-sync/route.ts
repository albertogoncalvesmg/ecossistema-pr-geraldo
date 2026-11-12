import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ContentType, ApprovalStatus } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, bibleVerse, content, category, publishedToBlog } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const pastorUser = await prisma.user.findFirst({
      where: { role: "PASTOR" },
    });

    if (!pastorUser) {
      return NextResponse.json({ synced: false, reason: "no_pastor_seed" });
    }

    const slug = `${title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString().slice(-4)}`;

    const record = await prisma.ministerialContent.create({
      data: {
        slug,
        title,
        type:
          category === "Esboço de Pregação"
            ? ContentType.SERMON
            : ContentType.ARTICLE,
        category: category || "Palavra Pastoral",
        biblicalReference: bibleVerse || null,
        summary: content.slice(0, 180) + "...",
        bodyText: content,
        status: publishedToBlog
          ? ApprovalStatus.PUBLISHED
          : ApprovalStatus.DRAFT,
        publishedAt: publishedToBlog ? new Date() : null,
        authorId: pastorUser.id,
      },
    });

    return NextResponse.json({ synced: true, id: record.id });
  } catch (error) {
    console.error("Erro ao sincronizar item do estúdio:", error);
    return NextResponse.json({ synced: false }, { status: 200 });
  }
}