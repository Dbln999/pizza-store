import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getUserSession();

    if (!user) {
      return NextResponse.json(
        { message: "Пользователь не авторизован" },
        { status: 401 },
      );
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.id),
      },
      select: {
        fullname: true,
        email: true,
        password: false,
      },
    });
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Не удалось получить данные пользователя" },
      { status: 500 },
    );
  }
}
