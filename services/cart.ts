import { axiosInstance } from "@/services/instance";
import { CartDto } from "@/services/dto/cart.dto";

export const getCart = async (): Promise<CartDto> => {
  return (await axiosInstance.get<CartDto>("/cart")).data;
};

export const updateItemQuantity = async (
  itemId: number,
  quantity: number,
): Promise<CartDto> => {
  return (
    await axiosInstance.patch<CartDto>("/cart/" + itemId, {
      quantity,
    })
  ).data;
};

export const removeCartItem = async (itemId: number): Promise<CartDto> => {
  return (await axiosInstance.delete<CartDto>("/cart/" + itemId)).data;
};
