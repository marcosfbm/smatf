import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../cart-store";

export function add(products: ProductCartProps[], newProduct: ProductProps, observacao?: string){
  const existingProduct = products.find(({id}) => newProduct.id === id)
  //console.log("Add" + observacao)
  if (existingProduct) {
    return products.map((product) => product.id === existingProduct.id
    ? {...product, quantity: product.quantity + 1, observation: observacao}
    : product
    )
  }
  return [...products, {...newProduct, quantity: 1, observation: observacao}]
}

export function remove(products: ProductCartProps[], productRemoveid: string){
  const updateProducts =  products.map((product) => 
    product.id === productRemoveid ? {
      ...product,
      quantity: product.quantity > 1 ? product.quantity -1 : 0
    } : product
  )
    return updateProducts.filter((product) => product.quantity > 0)
}