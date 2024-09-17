"use client";
import React from "react";
import { useCartStore } from "@/store";
import toast from "react-hot-toast";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "@/components/shared/choose-pizza-form";
import { ChooseProductForm } from "@/components/shared/choose-product-form";

interface Props {
  product: ProductWithRelations;
  _onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, _onSubmit }: Props) => {
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
      _onSubmit?.();
    } catch (e) {
      toast.error("Не удалось добавить продукт в корзину");
      console.error(e);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        name={product.name}
        ingredients={product.ingredients}
        imageUrl={product.imageUrl}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      name={product.name}
      imageUrl={product.imageUrl}
      onSubmit={() => onSubmit?.()}
      price={firstItem.price}
      loading={loading}
    />
  );
};
