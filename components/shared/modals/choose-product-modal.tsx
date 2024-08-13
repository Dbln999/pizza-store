"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui";
import { ChoosePizzaForm, ChooseProductForm } from "@/components/shared";
import { useRouter } from "next/navigation";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType);
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
          />
        ) : (
          <ChooseProductForm name={product.name} imageUrl={product.imageUrl} />
        )}
      </DialogContent>
    </Dialog>
  );
};
