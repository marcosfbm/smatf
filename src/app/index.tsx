import { useState, useRef, useEffect } from 'react';
import { View, FlatList, SectionList, Text } from 'react-native';
import { Link } from "expo-router"

import { CATEGORIES, MENU, ProductProps,  } from '@/utils/data/products';

import { Header } from '@/components/header';
import { CategoryButton } from '@/components/category-button';
import { Product } from '@/components/product';
import { useCartStore } from '@/stores/cart-store';
import { ICategory, categoryListApi } from '@/api/categoryApi';

interface ICategoryfilters {
  nome?: string
}


export default function Home() {
  const cartStore = useCartStore();
  //const [category, setCategory] = useState(CATEGORIES[0]);
  const selectionListRef = useRef<SectionList<ProductProps>>(null)
  const cartQuantityItems = cartStore.products.reduce((total, product) => total + product.quantity, 0)

  const [filtros, setFiltros] = useState<ICategoryfilters>({
    nome: ''
  })

  const [categorias, setCategorias] = useState<ICategory[]>([])
  const [category, setCategory] = useState(categorias[0]?.nome);
  const loadCategorias = () => {
    categoryListApi()
        .then((data) => {
          setCategorias(data)
        })
        .catch((err) => console.log(err))
  }

  useEffect(() => {
    loadCategorias()
  }, [filtros])

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory)

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
      <Header title="Faça seu pedido" cartQuantityItems={cartQuantityItems} />

      <FlatList
        data={categorias}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <CategoryButton
            title={item.nome}
            isSelected={item.nome === category}
            onPress={() => handleCategorySelect(item.nome)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />

      <SectionList 
        ref={selectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({item}) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link> 
        )}
        renderSectionHeader={({section: { title }}) => (
          <Text className='text-xl text-white font-heading mt-8 mb-3'>
            {title}
          </Text>
        )}
        className='flex-1 p-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      />
    </View>
  );
}
