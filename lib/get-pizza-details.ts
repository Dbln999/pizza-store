import { calcTotalPizzaPrice } from "@/lib/calc-total-pizza-price";
import { mapPizzaType, PizzaSize, PizzaType } from "@/consts/pizza";
import { Ingredient, ProductItem } from "@prisma/client";

/**
 * Функция для вычисления общей стоимости пиццы
 * @param items - список выриаций
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 *
 * @returns number общая стоимость, string текстовое описание
 */
export const getPizzaDetails = (
  items: ProductItem[],
  type: PizzaType,
  size: PizzaSize,
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const totalPrice = calcTotalPizzaPrice(
    items,
    type,
    size,
    ingredients,
    selectedIngredients,
  );

  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;
  return { totalPrice, textDetails };
};
