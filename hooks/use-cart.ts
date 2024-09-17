import { useEffect } from "react";
import { useCartStore } from "@/store";
import { CartStateItem } from "@/lib/get-cart-details";
import { CreateCartItemValues } from "@/services/dto/cart.dto";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => void;
  loading: boolean;
  loadingItemQuantity: boolean;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);
  useEffect(() => {
    cartState.fetchCartItems();
  }, []);
  return cartState;
};
