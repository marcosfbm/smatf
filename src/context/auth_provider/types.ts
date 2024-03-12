import { IUser as IUserSeller } from "../../api/userApi";

export interface IUser {
  email?: string,
  token?: string,
  admin?: boolean,
  modulos?: string,
  id?: number,
  id_empresa?: number,
  nome?: string,
  urlAvatar?: string,
  id_supervisor?: number,
  id_vendedor?: number,
  id_cliente?: number,
}

export interface IContext extends IUser {
  authenticate: (email: string, password: string) => Promise<void>;
  logout: () => void,
  carregando: boolean,
  userSeller: IUserSeller | null
}

export interface IAuthProvider {
  children: JSX.Element,
}

export interface IToken {
  id: number,
  name: string,
  email: string,
  admin: boolean,
  modulos: string,
}
