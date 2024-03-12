
import { View, Text, ScrollView, Alert, Linking, FlatList, SectionList } from "react-native" 
import { Header } from "@/components/header"
import { Product } from "@/components/product"
import { ProductCartProps, useCartStore } from "@/stores/cart-store"
import React, { useRef, useState } from "react"
import { formatCurrency } from "@/utils/functions/formar-currency"
import { Input } from "@/components/input"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "expo-router"

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Button } from "@/components/button"
import { LinkButton } from "@/components/link-button"
import { MESA, MESAS, TableProps } from "@/utils/data/mesas"
import { TableButton } from "@/components/table-button"

export default function Cart() {

  const cartStore = useCartStore()
  const [endereco, setEndereco] = useState("")
  const navegation = useNavigation()
  const PHONE_NUMBER = "5584996580807"
  const [table, setTable] = useState(MESAS[0]);
  const selectionListRef = useRef<SectionList<TableProps>>(null)

  const totalizar = formatCurrency(cartStore.products.reduce((total, product) => 
                                total + product.price * product.quantity, 0))

  function handleProductRemove(product: ProductCartProps){
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
      },
      {
        text: "Remover",
        onPress: () => cartStore.remove(product.id),
      },
    ])
  }

  function handleOrder(){
    if (endereco.trim().length === 0){
      return Alert.alert("Pedido", "Informe os dados da entrega.")
    }

    const products = cartStore.products.map((product) =>
      `\n ${product.quantity} ${product.title} ${product.observation ? product.observation : ""}` 
    ).join("")


    const message = `
    🍟 NOVO PEDIDO 🍔
    \n Entregar em: ${endereco}

    ${products}

    \n Valor Total: ${totalizar} 
    `

    //console.log(message)
    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
    cartStore.clear()
    Alert.alert("Sucesso", "Dados enviados com sucesso!");
    navegation.goBack()
  }

  function handleTableSelect(selectedTable: string) {
    setTable(selectedTable);

    const sectionIndex = MESAS.findIndex((table) => table === selectedTable)

    if (selectionListRef.current){
      selectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      })
    }
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Finalizando o pedido" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={100}>

          <FlatList
            data={MESA}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <TableButton
                title={item.title}
                total={item.total}
                isSelected={item.title === table}
                onPress={() => handleTableSelect(item.title)}
              />
            )}
            horizontal
            className="max-h-10 mt-5 "
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
          />

          <ScrollView>
            <View className="p-5 flex-1">

              {cartStore.products.length > 0 ? (
                <View className="border-b border-slate-700">
                  {cartStore.products.map((product) => (
                    <Product key={product.id} data={product} onPress={() => handleProductRemove(product)}/>
                  ))}
                </View>
              ) : (
                <Text className="font-body text-slate-400 text-center my-8">
                  Seu carrinho está vazio.
                </Text>
              )}
            
              <View className="flex-row gap-2 items-center mt-5 mb-4">
                <Text className="text-white text-xl font-subtitle">Total</Text>
                <Text className="text-lime-400 text-2xl font-heading">{totalizar}</Text>
              </View>
              <Input multLines={true} placeholder="Informe o endereço de entrega como rua, numero, bairro e complemento..." 
                onChangeText={setEndereco}/>
            </View>          
          </ScrollView>

      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        {cartStore.products.length > 0 &&
          <Button onPress={handleOrder}>
            <Button.Text>Enviar pedido</Button.Text>
        
          <Button.Icon><Feather name="arrow-right-circle" size={20}/></Button.Icon>
          </Button>
        }
          <LinkButton title="Voltar ao cardápio" href="/"/>
      </View>
    </View>
  )}