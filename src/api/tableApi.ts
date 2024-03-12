import {AxiosResponse} from 'axios';

import {getUserLocalStorage} from '../context/auth_provider/util';
import {axiosApi} from './axiosApi';

export interface ITable {
  id: number,
  nome: string,
  aberta?: number,
  parcial?: number,
  qtdPedidos?: number,
  qtdItens?: number,
  total?: number,
  ocupado?: boolean 
}

export interface ITableBackend {
  id: number,
  nome: string,
  aberta?: number,
  parcial?: number,
  qtdPedidos?: number,
  qtdItens?: number,
  total?: number,
  ocupado?: boolean 
}

export const parseTable = (table: ITableBackend): ITable => ({
  id: table.id,
  nome: table.nome,
  aberta: table.aberta,
  parcial: table.parcial,
  qtdPedidos: table.qtdPedidos,
  qtdItens: table.qtdItens,
  total: table.total,
  ocupado: table.ocupado,
});

export const parseTableFrontToBack = (tableFront: ITable): ITableBackend => ({
  id: tableFront.id,
  nome: tableFront.nome,
  aberta: tableFront.aberta,
  parcial: tableFront.parcial,
  qtdPedidos: tableFront.qtdPedidos,
  qtdItens: tableFront.qtdItens,
  total: tableFront.total,
  ocupado: tableFront.ocupado,
});

export const tableListApi = async (nome?: string): Promise<ITable[]> => {
  const user = await getUserLocalStorage();
  const response: AxiosResponse<ITableBackend[]> = await axiosApi.get(
      'food/foodmesa/recuperar',
      {params: {nome: nome}},
  );

  return response.data.map((item) => parseTable(item));
};
