"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store";
import { CartDrawerItem } from "@/components/shared/cart-drawer-item";
import { getCartItemDetails } from "@/lib";
import { PizzaSize, PizzaType } from "@/consts/pizza";
import Image from "next/image";
import { Title } from "@/components/shared/title";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  const { updateItemQuantity, totalAmount, items, removeCartItem } = useCart();
  const [redirecting, setRedirecting] = useState(false);
  const onClickCountButton = async (
    id: number,
    quantity: number,
    type: "plus" | "minus",
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    await updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className={"flex flex-col justify-between pb-0 bg-[#f4f1ee]"}
      >
        <div
          className={cn(
            "flex flex-col h-full",
            !totalAmount && "justify-center",
          )}
        >
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                В корзине{" "}
                <span className={"font-bold"}>{items.length} товара</span>
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div
              className={
                "flex flex-col items-center justify-center w-72 mx-auto"
              }
            >
              <Image
                src={"/assets/images/empty-box.png"}
                alt={"Empty cart"}
                width={120}
                height={120}
              />
              <Title
                size={"sm"}
                text={"Корзина пуста"}
                className={"text-center font-bold my-2"}
              />
              <p className={"text-center text-neutral-500 mb-5"}>
                Добавьте пиццы в корзину, чтобы они отображались здесь
              </p>

              <SheetClose>
                <Button className={"w-56 h-12 text-base"} size={"lg"}>
                  <ArrowLeft className={"w-5 mr-2"} />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className={"-mx-6 mt-5 overflow-auto flex-1"}>
                {items.map((item) => (
                  <div className={"mb-2"} key={item.id}>
                    <CartDrawerItem
                      id={item.id}
                      imageUrl={item.imageUrl}
                      details={
                        item.pizzaSize && item.pizzaType
                          ? getCartItemDetails(
                              item.ingredients,
                              item.pizzaType as PizzaType,
                              item.pizzaSize as PizzaSize,
                            )
                          : ""
                      }
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      disabled={item.disabled}
                      onClickCountButton={(type) =>
                        onClickCountButton(item.id, item.quantity, type)
                      }
                      onClickRemove={() => removeCartItem(item.id)}
                    />
                  </div>
                ))}
              </div>
              <SheetFooter className={"-mx-6 bg-white p-8"}>
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Итого
                      <div className="flex border-b border-dashed  border-b-neutral-200 relative -top-1 mx-2"></div>
                    </span>
                    <span className={"font-bold text-lg"}>${totalAmount}</span>
                  </div>
                  <Link href={"/checkout"}>
                    <Button
                      loading={redirecting}
                      onClick={() => setRedirecting(true)}
                      type={"submit"}
                      className={"w-full h-12 text-base"}
                    >
                      Оформить заказ
                      <ArrowRight className={"w-5 ml-2"} />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
