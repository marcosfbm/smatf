import React, { useState } from 'react';
import { Image, ScrollView, Text, View} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router"
import { Redirect } from "expo-router"
import { useCartStore } from "@/stores/cart-store";

import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/formar-currency";
import { Button } from "@/components/button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/link-button";
import { Input } from '@/components/input';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"


export default function Product(){
    const { id } = useLocalSearchParams()
    const cartStore = useCartStore()
    const navegation = useNavigation()
    const [observacao, setObservacao] = useState("")
    //console.log(cartStore.products)
    const product = PRODUCTS.find((item) => item.id === id)

    function handleAddToCart(){
      if (product){     
        cartStore.add(product, observacao)
        //showMessage({ message: 'Sucesso', description: 'Operação realizada com sucesso!', type: 'success' })
        navegation.goBack()
      }
    }

    if (!product){
      return <Redirect href="/"/>
    }

  return (
    <View className="flex-1">
      <KeyboardAwareScrollView>
          <Image source={product.cover} 
            className="w-full h-52" 
            resizeMode="cover"/>   
          <View className="p-5 mt-8 flex-1">
              <Text className='text-white text-xl font-heading'>
                  {product.title}
              </Text>
              <Text className="text-lime-400 text-2xl font-heading my-2">
                {formatCurrency(product.price)}
              </Text>
              <Text className="text-slate-400 font-body text-base leading-6 mb-6">
                {product.description}
              </Text>
              <Input multLines={false} placeholder="Observação do item..." 
               onChangeText={setObservacao}/>
              {
                product.ingredients.map((ingredient) =>(
                  <Text key={ingredient} className="text-slate-400 font-body text-base leading-6">
                    {"\u2022"} {ingredient}
                  </Text>
                ))
              }        
          </View>              
      </KeyboardAwareScrollView>     
      <View className="p-5 pb-8 gap-5">
        
        <Button onPress={handleAddToCart}>
          <Button.Icon><Feather name="plus-circle" size={20} /></Button.Icon>
          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>
        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>

    </View>
  )
}
