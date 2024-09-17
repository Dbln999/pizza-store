"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui";
import {
  ChoosePizzaForm,
  ChooseProductForm,
  ProductForm,
} from "@/components/shared";
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

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className,
        )}
      >
        <ProductForm product={product} _onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
