import {AxiosResponse} from 'axios';
import {ISelectChoice} from './types';
import {getUserLocalStorage} from '../context/auth_provider/util';
import {axiosApi} from './axiosApi';
import {ICategory, ICategoryBackend, parseCategory, parseCategoryFrontToBack} from './categoryApi';

export interface IProduct {
  id: number,
  descricao: String,
  valor: number,
  estoque?: number | null,
  custo?: number | null,
  inativo: boolean,
  grupo?: ICategory
  url?: String | null
}

export interface IProductBackend {
  id: number,
  descricao: String,
  valor: number,
  estoque?: number | null,
  custo?: number | null,
  inativo: boolean,
  grupo?: ICategory
  url?: String | null
}

export const parseProductBackToFront = (dataBackend: IProductBackend): IProduct => ({
  id: dataBackend.id,
  descricao: dataBackend.descricao,
  valor: dataBackend.valor,
  estoque: dataBackend.estoque,
  custo: dataBackend.custo,
  inativo: dataBackend.inativo,
  grupo: dataBackend.grupo ? parseCategory(dataBackend.grupo) : undefined,
  url: dataBackend.url
});

export const parseProductFrontToBack = (dataFront: IProduct): IProductBackend => ({
  id: dataFront.id,
  descricao: dataFront.descricao,
  valor: dataFront.valor,
  estoque: dataFront.estoque,
  custo: dataFront.custo,
  inativo: dataFront.inativo,
  grupo: dataFront.grupo ? parseCategoryFrontToBack(dataFront.grupo) : undefined,
  url: dataFront.url
});

export const productListApi = async (
    productName?: string,
): Promise<IProduct[]> => {
  const user = await getUserLocalStorage();
  const result: AxiosResponse<IProductBackend[]> = await axiosApi.get(
      'food/foodproduto/recuperar',
      {params: {
        nome: productName,
      }},
  );

  return result.data.map((item) => parseProductBackToFront(item));
};
