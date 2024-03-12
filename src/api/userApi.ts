import {AxiosResponse} from 'axios';

import {getUserLocalStorage} from '../context/auth_provider/util';
import {axiosApi} from './axiosApi';
import { ISelectChoice } from './types';

export interface IUserCreate {
  userName: string,
  email: string,
  password: string,
  urlAvatar: string,
  admin: boolean,
  active: boolean,
  sellerId: number | null,
  kickback: number | null,
  supervisorId: number | null,
  minimumOrderValue: number | null,
  goal: number | null,
  tradeName: string | null,
  CPFCNPJ: string | null,
  RGIE: string | null,
  street: string | null,
  number: string | null,
  ZIP: string | null,
  district: string | null,
  city: string | null,
  phone: string | null,
  allowEditing: boolean,
  allowLgpd: boolean,
}

export interface IUser {
  id: number,
  userName: string,
  email: string,
  password: string,
  urlAvatar: string,
  admin: boolean,
  active: boolean,
  modulos: string,
  sellerId: number | null,
  kickback: number | null,
  supervisorId: number | null,
  minimumOrderValue: number | null,
  goal: number | null,
  tradeName: string | null,
  CPFCNPJ: string | null,
  RGIE: string | null,
  street: string | null,
  number: string | null,
  ZIP: string | null,
  district: string | null,
  city: string | null,
  phone: string | null,
  allowEditing: boolean,
  allowLgpd: boolean,
  creditLimit: number | null,
  creditLimitBalance: number | null,
  discount: number | null,
  customerId: number | null,
}

export interface IUserBackend {
  id: number,
  nome: string,
  email: string,
  senha: string,
  urlAvatar: string,
  admin: boolean,
  ativo: boolean,
  modulos: string,
  id_vendedor: number | null,
  comissao: number | null,
  id_supervisor: number | null,
  valor_minimo_pedido: number | null,
  meta: number | null,
  fantasia: string | null,
  cpf_cnpj: string | null,
  rg_ie: string | null,
  logradouro: string | null,
  numero: string | null,
  cep: string | null,
  bairro: string | null,
  cidade: string | null,
  telefone: string | null,
  permite_edicao: boolean,
  autorizou_lgpd: boolean,
  limite_credito: number | null,
  saldo_limite_credito: number | null,
  desconto_maximo: number | null,
  id_cliente: number | null,
}

export const parseUserBackToFront = (item: IUserBackend): IUser => {
  return {
    id: item.id,
    userName: item.nome,
    email: item.email,
    password: item.senha,
    urlAvatar: item.urlAvatar,
    admin: item.admin,
    active: item.ativo,
    modulos: item.modulos,
    sellerId: item.id_vendedor,
    kickback: item.comissao,
    supervisorId: item.id_supervisor,
    minimumOrderValue: item.valor_minimo_pedido,
    goal: item.meta,
    tradeName: item.fantasia,
    CPFCNPJ: item.cpf_cnpj,
    RGIE: item.rg_ie,
    street: item.logradouro,
    number: item.numero,
    ZIP: item.cep,
    district: item.bairro,
    city: item.cidade,
    phone: item.telefone,
    allowEditing: item.permite_edicao,
    allowLgpd: item.autorizou_lgpd,
    creditLimit: item.limite_credito,
    creditLimitBalance: item.saldo_limite_credito,
    discount: item.desconto_maximo,
    customerId: item.id_cliente,
  };
};

export const parseUserFrontToBack = (dadoFront: IUser): IUserBackend => ({
  id: dadoFront.id,
  nome: dadoFront.userName,
  email: dadoFront.email,
  senha: dadoFront.password,
  urlAvatar: dadoFront.urlAvatar,
  admin: dadoFront.admin,
  ativo: dadoFront.active,
  id_supervisor: dadoFront.supervisorId,
  valor_minimo_pedido: dadoFront.minimumOrderValue,
  meta: dadoFront.goal,
  fantasia: dadoFront.tradeName,
  cpf_cnpj: dadoFront.CPFCNPJ,
  rg_ie: dadoFront.RGIE,
  logradouro: dadoFront.street,
  numero: dadoFront.number,
  cep: dadoFront.ZIP,
  bairro: dadoFront.district,
  cidade: dadoFront.city,
  telefone: dadoFront.phone,
  permite_edicao: dadoFront.allowEditing,
  id_vendedor: dadoFront.sellerId,
  comissao: dadoFront.kickback,
  modulos: dadoFront.modulos,
  autorizou_lgpd: dadoFront.allowLgpd,
  limite_credito: dadoFront.creditLimit,
  saldo_limite_credito: dadoFront.creditLimitBalance,
  desconto_maximo: dadoFront.discount,
  id_cliente: dadoFront.customerId,
});

export const userListApi = async (
    onlyActive: boolean, onlyAdmin: boolean, name?: string): Promise<IUser[]> => {
  const user = await getUserLocalStorage();
  const response: AxiosResponse<IUserBackend[]> = await axiosApi.get(
      'usuario/listar',
      {params:
        {
          apenas_ativo: onlyActive,
          apenas_admin: onlyAdmin,
          nome: name,
          id_empresa: user?.id_empresa ? user?.id_empresa : 0,
        },
      },
  );

  return response.data.map((item) => parseUserBackToFront(item));
};

export const getAllToSelectUser = async (): Promise<ISelectChoice[]> => {
  const user = await getUserLocalStorage();

  const response: AxiosResponse<IUserBackend[]> = await axiosApi.get(
      'usuario/listar', {params: {
        ativo: true,
        id_empresa: user?.id_empresa ? user.id_empresa : 0,
        id_supervisor: user?.id_supervisor ? user?.id : undefined,
        id_vendedor: user?.id_vendedor ? user?.id : undefined,
      }});

  if (response.data) {
    return response.data.map((item) => {
      return {label: item.nome, value: item.id};
    });
  }

  return response.data;
};

export const userCreateApi = async (values: IUserCreate): Promise<IUser> => {
  const user = await getUserLocalStorage();
  const response: AxiosResponse<IUserBackend> = await axiosApi.post(
      'usuarios',
      {
        id_empresa: user?.id_empresa ? user.id_empresa : 0,
        nome: values.userName,
        email: values.email,
        senha: values.password,
        urlAvatar: values.urlAvatar,
        admin: values.admin,
        ativo: values.active,
        id_vendedor: values.sellerId,
        comissao: values.kickback,
        id_supervisor: values.supervisorId,
        valor_minimo_pedido: values.minimumOrderValue,
        meta: values.goal,
        fantasia: values.tradeName,
        cpf_cnpj: values.CPFCNPJ,
        rg_ie: values.RGIE,
        logradouro: values.street,
        numero: values.number,
        cep: values.ZIP,
        bairro: values.district,
        cidade: values.city,
        telefone: values.phone,
        permite_edicao: values.allowEditing,
        autorizou_lgpd: values.allowLgpd,
        id_vincular_supervisor_vendedor: user?.id_supervisor && user?.id ? user.id : undefined,
      },
  );

  return parseUserBackToFront(response.data);
};

export const userUpdateApi = async (id: number, values: IUserCreate): Promise<IUser> => {
  const response: AxiosResponse<IUserBackend> = await axiosApi.put(
      'usuario/editar',
      {
        id,
        nome: values.userName,
        email: values.email,
        senha: values.password,
        urlAvatar: values.urlAvatar,
        admin: values.admin,
        ativo: values.active,
        id_vendedor: values.sellerId,
        comissao: values.kickback,
        id_supervisor: values.supervisorId,
        valor_minimo_pedido: values.minimumOrderValue,
        meta: values.goal,
        fantasia: values.tradeName,
        cpf_cnpj: values.CPFCNPJ,
        rg_ie: values.RGIE,
        logradouro: values.street,
        numero: values.number,
        cep: values.ZIP,
        bairro: values.district,
        cidade: values.city,
        telefone: values.phone,
        permite_edicao: values.allowEditing,
        autorizou_lgpd: values.allowLgpd,
      },
  );

  return parseUserBackToFront(response.data);
};

export const userGetOneApi = async (id: number): Promise<IUser> => {
  const response: AxiosResponse<IUserBackend> = await axiosApi.get(
      'usuarioinfo',
      {params: {id}},
  );

  return parseUserBackToFront(response.data);
};
