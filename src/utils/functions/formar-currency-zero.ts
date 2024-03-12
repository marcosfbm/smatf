import { current } from "tailwindcss/colors";

export function formatCurrencyZero(value: number){
  if (value === 0){
    return "";
  }
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
}