import React from "react";
import { WhiteBlock } from "@/components/shared/white-block";
import { CheckoutItemDetails } from "@/components/shared/checkout-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  totalAmount: number;
  vatPrice: number;
  deliveryPrice: number;
  totalPrice: number;
  loading?: boolean;
}

export const CheckoutSidebar: React.FC<Props> = ({
  className,
  vatPrice,
  deliveryPrice,
  totalAmount,
  loading,
  totalPrice,
}) => {
  return (
    <div className={"w-[450px]"}>
      <WhiteBlock className={"p-6 sticky top-4"}>
        <div className={"flex flex-col gap-1"}>
          <span className={"text-xl"}>Итого:</span>
          {loading ? (
            <Skeleton className={"w-40 h-11"} />
          ) : (
            <span className={"text-3xl h-11 font-extrabold"}>
              ${totalPrice}
            </span>
          )}
        </div>
        <CheckoutItemDetails
          title={
            <div className={"flex items-center"}>
              <Package className={"mr-2 text-gray-400"} size={20} />
              Стоимость товаров:
            </div>
          }
          value={
            loading ? (
              <Skeleton className={"h-6 w-12"}></Skeleton>
            ) : (
              `$${totalAmount}`
            )
          }
        ></CheckoutItemDetails>
        <CheckoutItemDetails
          title={
            <div className={"flex items-cen ter"}>
              <Percent className={"mr-2 text-gray-400"} size={20} />
              Налоги:
            </div>
          }
          value={
            loading ? (
              <Skeleton className={"h-6 w-12"}></Skeleton>
            ) : (
              `$${vatPrice}`
            )
          }
        />
        <CheckoutItemDetails
          title={
            <div className={"flex items-center"}>
              <Truck className={"mr-2 text-gray-400"} size={20} />
              Доставка:
            </div>
          }
          value={
            loading ? (
              <Skeleton className={"h-6 w-12"}></Skeleton>
            ) : (
              `$${deliveryPrice}`
            )
          }
        />
        <Button
          loading={loading}
          type={"submit"}
          className={cn("w-full h-14 rounded-2xl mt-6 text-base font-bold")}
        >
          Перейти к оплате
          <ArrowRight className={"w-5 ml-2"} />
        </Button>
      </WhiteBlock>
    </div>
  );
};
