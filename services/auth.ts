import { axiosInstance } from "@/services/instance";
import { User } from "@prisma/client";

export const getMe = async () => {
  return (await axiosInstance.get<User>("/auth/me")).data;
};
