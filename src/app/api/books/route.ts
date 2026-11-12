import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(books);
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return NextResponse.json({ error: "Erro ao buscar livros" }, { status: 500 });
  }
}