"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { PizzaImage } from "@/components/shared/pizza-image";
import { Title } from "@/components/shared/title";
import { Button } from "@/components/ui";
import { GroupVariants } from "@/components/shared/group-variants";
import { PizzaSize, PizzaType, pizzaTypes } from "@/consts/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { IngredientItem } from "@/components/shared/ingredient-item";
import { getPizzaDetails } from "@/lib";
import { usePizzaOptions } from "@/hooks";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  name,
  ingredients,
  onClickAddCart,
  items,
  imageUrl,
}) => {
  const {
    selectedIngredients,
    availableSizes,
    size,
    setSize,
    addIngredient,
    setType,
    type,
  } = usePizzaOptions(items);

  const { totalPrice, textDetails } = getPizzaDetails(
    items,
    type,
    size,
    ingredients,
    selectedIngredients,
  );

  const handleClickAdd = () => {
    onClickAddCart?.();
  };

  return (
    <div className={cn("flex flex-1 ", className)}>
      <PizzaImage size={size} imageUrl={imageUrl} />
      <div className={"w-[490px] bg-[#f7f6f5] p-7"}>
        <Title text={name} size={"md"} className={"font-extrabold mb-1"} />
        <p className={"text-gray-400"}>{textDetails}</p>

        <div className={"flex flex-col gap-4 mt-5"}>
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div
          className={
            "bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5"
          }
        >
          <div className={"grid grid-cols-3 gap-3"}>
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
              ></IngredientItem>
            ))}
          </div>
        </div>

        <Button
          onClick={onClickAddCart}
          className={"h-[55px] px-10 text-base rounded-[18px] w-full mt-10"}
        >
          Добавить в корзину за ${totalPrice}
        </Button>
      </div>
    </div>
  );
};
