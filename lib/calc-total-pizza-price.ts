import { PizzaSize, PizzaType } from "@/consts/pizza";
import { Ingredient, ProductItem } from "@prisma/client";

/**
 * Функция для вычисления общей стоимости пиццы
 * @param items - список выриаций
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 *
 * @returns number общая стоимость
 */
export const calcTotalPizzaPrice = (
  items: ProductItem[],
  type: PizzaType,
  size: PizzaSize,
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0;

  return pizzaPrice + totalIngredientsPrice;
};
