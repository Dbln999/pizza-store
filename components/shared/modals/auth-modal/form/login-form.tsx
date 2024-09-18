import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormInput,
  formLoginSchema,
  FormLoginValues,
  Title,
} from "@/components/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface Props {
  onClose: VoidFunction;
  className?: string;
}

export const LoginForm: React.FC<Props> = ({ onClose, className }) => {
  const form = useForm<FormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw new Error();
      }

      toast.success("Вы вошли в аккаунт", {
        icon: "✅",
      });

      onClose?.();
    } catch (e) {
      console.error(e);
      toast.error("Не удалось войти в аккаунт", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        action=""
        className={"flex flex-col gap-5"}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className={"flex justify-between items-center"}>
          <div className={"mr-2"}>
            <Title
              text={"Вход в аккаунт"}
              size={"md"}
              className={"font-bold"}
            ></Title>
            <p className={"text-gray-400"}>
              Введите свою почту, чтобы войти в аккаунт
            </p>
          </div>
          <img
            src="/assets/images/phone-icon.png"
            alt=""
            width={60}
            height={60}
          />
        </div>
        <FormInput name={"email"} type={"email"} label={"Email"} required />
        <FormInput
          name={"password"}
          label={"Пароль"}
          type={"password"}
          required
        />
        <Button
          loading={form.formState.isSubmitting}
          className={"h-12 text-base"}
          type={"submit"}
        >
          Вход
        </Button>
      </form>
    </FormProvider>
  );
};
