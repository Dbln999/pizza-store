import { pizzaSizes, PizzaType } from "@/consts/pizza";
import { ProductItem } from "@prisma/client";
import { Variant } from "@/components/shared/group-variants";

/**
 *
 * @param items - список вариаций
 * @param type - тип теста выбранной пиццы
 *
 * @returns массив доступных размеров
 */
export const getAvailablePizzaSizes = (
  items: ProductItem[],
  type: PizzaType,
): Variant[] => {
  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);
  return pizzaSizes.map((item) => ({
    name: item.value,
    value: String(item.value),
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) === Number(item.value),
    ),
  }));
};
