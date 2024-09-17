"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { CartItemProps } from "@/components/shared/cart-item-details/cart-item-details.types";
import { CountButtonProps } from "@/components/shared/count-button";
import { CartItemDetailsImage } from "@/components/shared/cart-item-details/cart-item-details-image";
import { CartItemInfo } from "@/components/shared/cart-item-details/cart-item-info";
import { CartItemDetailsPrice } from "@/components/shared/cart-item-details/cart-item-details-price";
import { CartItemDetailsCountButton } from "@/components/shared/cart-item-details/cart-item-details-count-button";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui";

interface Props extends CartItemProps {
  onClickRemove?: () => void;
  onClickCountButton?: CountButtonProps["onClick"];
  className?: string;
  loading?: boolean;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  className,
  onClickCountButton,
  onClickRemove,
  disabled,
  details,
  loading,
}) => {
  return (
    <div
      className={cn("flex items-center justify-between", className, {
        "opacity-50 pointer-events-none": disabled,
      })}
    >
      <div className={"flex items-center gap-5 flex-1"}>
        <CartItemDetailsImage src={imageUrl} />
        <CartItemInfo name={name} details={details} />
      </div>

      {loading ? (
        <Skeleton className={"h-7 w-12 rounded-[10px]"}></Skeleton>
      ) : (
        <CartItemDetailsPrice value={price} />
      )}
      {loading ? (
        <Skeleton className={"w-32 h-8 ml-20 rounded-[10px]"} />
      ) : (
        <div className={"flex items-center gap-5 ml-20"}>
          <CartItemDetailsCountButton
            onClick={onClickCountButton}
            value={quantity}
          />
          <button type={"button"} onClick={onClickRemove}>
            <X
              className={"text-gray-400 cursor-pointer hover:text-gray-600"}
              size={20}
            ></X>
          </button>
        </div>
      )}
    </div>
  );
};
