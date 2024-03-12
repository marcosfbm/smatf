import { current } from "tailwindcss/colors";

export function formatCurrency(value: number){
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
}