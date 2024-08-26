"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui";
import { ChoosePizzaForm, ChooseProductForm } from "@/components/shared";
import { useRouter } from "next/navigation";
import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/store";
import toast from "react-hot-toast";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({ productItemId: itemId, ingredients });
      toast.success(`${product.name} успешно добавлена в корзину`);
      router.back();
    } catch (e) {
      toast.error("Не удалось добавить продукт в корзину");
      console.error(e);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className,
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            name={product.name}
            ingredients={product.ingredients}
            imageUrl={product.imageUrl}
            items={product.items}
            onSubmit={onSubmit}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            name={product.name}
            imageUrl={product.imageUrl}
            onSubmit={() => onSubmit?.()}
            price={firstItem.price}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
