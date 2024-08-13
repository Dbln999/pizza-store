import { Container, Filters, Title, TopBar } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { prisma } from "@/prisma/prisma-client";
import { Suspense } from "react";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          items: true,
        },
      },
    },
  });

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
