import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";
import {createJSONStorage, persist} from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

import * as cartInMemory from "./helpers/cart-in-memory"

export type ProductCartProps = ProductProps & {
  quantity: number
  observation?: string
}

type StateProps = {
  products: ProductCartProps[]
  add: (product: ProductProps, observacao?: string) => void
  remove: (productId: string) => void
  clear: () => void
}

export const useCartStore = create(
  persist<StateProps>((set) => ({
    products: [],
    add: (product: ProductProps, observacao?: string) => set((state) => ({
        products: cartInMemory.add(state.products, product, observacao) 
    })),
    remove: (productId: string) => set((state) => ({
      products: cartInMemory.remove(state.products, productId),
    })),
    clear: () => set(() => ({products:[]})),
  }), {
    name: "ismartf:cart",
    storage: createJSONStorage(() => AsyncStorage),
  })
)
