import { formatCurrency } from "@/utils/functions/formar-currency";
import {forwardRef} from "react"
import { Image, ImageProps, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type ProductDataProps = {
  title: string
  description: string
  thumbnail: ImageProps
  quantity?: number
  observation?: string
  price?: number
}

type ProductProps = TouchableOpacityProps & {
  data: ProductDataProps
}

export const Product = forwardRef<TouchableOpacity, ProductProps>(({ data, ...rest }, 
  ref)  => {
  return (
    <TouchableOpacity className="w-full flex-row items-center pb-4" 
    ref={ref}
    {...rest}>
      <View className="flex-1 justify-center">
        <View className="flex-row items-center">
          <Image source={data.thumbnail} className="w-20 h-20 rounded-md" />
          <View className="flex-1 ml-3">
            <View className="flex-row items-center">
              <Text className="text-slate-100 font-subtitle text-base flex-1">{data.title}</Text>
              <Text className="text-slate-400 font-subtitle text-sm">{formatCurrency(data.price ? data.price: 0)} </Text>
              { data.quantity && 
                <Text className="text-slate-400 font-subtitle text-sm">x {data.quantity}</Text>
              }
            </View>
            <Text className="text-slate-400 text-xs leading-5 mt-0">{data.description}</Text>
          </View>
        </View>
        <View className="mt-2">
          {data.quantity &&
            <Text className="text-slate-100 font-subtitle text-base flex-1">{data.observation}</Text>
          }
        </View>
      </View>
      {/*(data.observation && data.quantity) ?
          <Text className="text-slate-100 font-subtitle text-base flex-1">{data.observation}</Text>
        : <Text className="text-slate-100 font-subtitle text-base flex-1">Criar um edit text</Text>
        */}
    </TouchableOpacity>
  )
})