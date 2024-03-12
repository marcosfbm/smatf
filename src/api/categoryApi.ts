import {AxiosResponse} from 'axios';

import {getUserLocalStorage} from '../context/auth_provider/util';
import {axiosApi} from './axiosApi';

export interface ICategory {
  id: number,
  nome: string,
}

export interface ICategoryBackend {
  id: number,
  nome: string,
}

export const parseCategory = (category: ICategoryBackend): ICategory => ({
  id: category.id,
  nome: category.nome,
});

export const parseCategoryFrontToBack = (categoryFront: ICategory): ICategoryBackend => ({
  id: categoryFront.id,
  nome: categoryFront.nome,
});

export const categoryListApi = async (nome?: string): Promise<ICategory[]> => {
  const user = await getUserLocalStorage();
  const response: AxiosResponse<ICategoryBackend[]> = await axiosApi.get(
      'food/foodgrupo/recuperar',
      {params: {nome: nome}},
  );

  return response.data.map((item) => parseCategory(item));
};
