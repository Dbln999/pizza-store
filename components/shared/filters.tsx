"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Title, CheckboxFilterGroup } from "@/components/shared";
import { Input } from "@/components/ui";
import { RangeSlider } from "./range-slider";
import { useIngredients, useFilters, useQueryFilters } from "@/hooks/";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: ingredient.id.toString(),
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  return (
    <div className={cn("", className)}>
      <Title
        text={"Фильтрация"}
        size={"sm"}
        className={"mb-5 font-bold"}
      ></Title>

      <CheckboxFilterGroup
        name={"pizzaTypes"}
        className={"mb-5"}
        title={"Тип теста"}
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      <CheckboxFilterGroup
        name={"sizes"}
        className={"mb-5"}
        title={"Размеры"}
        onClickCheckbox={filters.setPizzaSizes}
        selected={filters.sizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className={"font-bold mb-3"}>Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type={"number"}
            placeholder={"0"}
            min={0}
            max={1000}
            onChange={(e) =>
              filters.setPrices("priceFrom", Number(e.target.value))
            }
            value={String(filters.prices.priceFrom)}
          ></Input>
          <Input
            type={"number"}
            min={100}
            max={1000}
            placeholder={"1000"}
            onChange={(e) =>
              filters.setPrices("priceTo", Number(e.target.value))
            }
            value={String(filters.prices.priceTo)}
          ></Input>
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          onValueChange={updatePrices}
        ></RangeSlider>
      </div>

      <CheckboxFilterGroup
        title="Ингредиенты"
        name={"ingredients "}
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        onClickCheckbox={filters.setSelectedIngredients}
        loading={loading}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
