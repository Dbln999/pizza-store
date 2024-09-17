"use client";
import React from "react";
import {
  CheckoutItem,
  CheckoutItemSkeleton,
  WhiteBlock,
} from "@/components/shared";
import { getCartItemDetails } from "@/lib";
import { PizzaSize, PizzaType } from "@/consts/pizza";
import { useCart } from "@/hooks";

interface Props {
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({ className }) => {
  const {
    updateItemQuantity,
    items,
    removeCartItem,
    loadingItemQuantity,
    loading,
  } = useCart();

  const onClickCountButton = async (
    id: number,
    quantity: number,
    type: "plus" | "minus",
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    await updateItemQuantity(id, newQuantity);
  };
  return (
    <WhiteBlock title={"1. Корзина"} className={className}>
      <div className={"flex flex-col gap-5"}>
        {loading &&
          [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)}
        {items.map((item) => (
          <CheckoutItem
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            loading={loadingItemQuantity}
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
          ></CheckoutItem>
        ))}
      </div>
    </WhiteBlock>
  );
};
