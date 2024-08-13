import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import crypto from "crypto";
import { findOrCreateCart } from "@/components/shared/find-or-create-cart";
import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/lib";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ items: [], totalAmount: 0 });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });
    return NextResponse.json(userCart);
  } catch (error) {
    console.log("CART_GET", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          every: {
            id: {
              in: data.ingredients,
            },
          },
        },
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
      const updatedUserCart = await updateCartTotalAmount(token);
      const nextResponse = NextResponse.json(updatedUserCart);
      nextResponse.cookies.set("cartToken", token);
      return nextResponse;
    }

    await prisma.cartItem.create({
      data: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        quantity: 1,
      },
    });
  } catch (e) {
    console.error("CART_POST");
    return NextResponse.json({ message: "Не удалось создать корзину" });
  }
}
