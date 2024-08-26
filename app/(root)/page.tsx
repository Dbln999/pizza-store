import { Container, Filters, Title, TopBar } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { Suspense } from "react";
import { findPizzas } from "@/lib";
import { GetSearchParams } from "@/lib/find-pizzas";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas(searchParams);

  return (
    <>
      <Container className={"mt-10"}>
        <Title
          text={"Все пиццы"}
          size={"lg"}
          className={"font-extrabold"}
        ></Title>
      </Container>

      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0,
        )}
      ></TopBar>

      <Container className={"mt-9 pb-14"}>
        <div className={"flex gap-[80px]"}>
          {/* filtration */}
          <div className={"w-[250px]"}>
            <Suspense>
              <Filters></Filters>
            </Suspense>
          </div>

          {/* product list */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    ></ProductsGroupList>
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
