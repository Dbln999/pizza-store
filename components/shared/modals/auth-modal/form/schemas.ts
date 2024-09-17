import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(4, { message: "Введите корректный пароль" });

export const formLoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Введите корректный адрес электронной почты" }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullname: z
        .string()
        .min(2, { message: "Имя должено содержать не менее 2-х символов" }),
      confirmPassword: passwordSchema,
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"], // trigger
  });

export type FormLoginValues = z.infer<typeof formLoginSchema>;
export type FormRegisterValues = z.infer<typeof formRegisterSchema>;
