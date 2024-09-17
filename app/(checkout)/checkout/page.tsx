"use client";
import {
  CheckoutAddress,
  CheckoutCart,
  checkoutFormSchema,
  CheckoutFormValues,
  CheckoutPersonalInfo,
  CheckoutSidebar,
  Container,
  Title,
} from "@/components/shared";
import { useCart } from "@/hooks";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useState } from "react";

const VAT = 15;
const DELIVERY_COST = 300;

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);
  const { totalAmount, loading, loadingItemQuantity } = useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_COST + vatPrice;

  const onSubmitHandler: SubmitHandler<CheckoutFormValues> = async (data) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);

      toast.success("Заказ успешно создан! 📝 Переход на оплату...", {
        icon: "✅",
      });

      if (url) {
        location.href = url;
      }
    } catch (e) {
      console.error(e);
      setSubmitting(false);
      toast.error("Не удаось создать заказ", {
        icon: "❌",
      });
    }
  };

  return (
    <Container className={"mt-10"}>
      <Title
        text={"Оформление заказа"}
        className={"font-extrabold mb-8 text-[36px]"}
      ></Title>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <div className={"flex gap-10"}>
            <div className={"flex flex-col gap-10 flex-1 mb-20"}>
              <CheckoutCart />
              <CheckoutPersonalInfo
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
              <CheckoutAddress
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>
            <CheckoutSidebar
              totalPrice={totalPrice}
              totalAmount={totalAmount}
              vatPrice={vatPrice}
              deliveryPrice={DELIVERY_COST}
              loading={loading || loadingItemQuantity || submitting}
            />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
