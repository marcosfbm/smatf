import React from 'react';
import {createContext, useEffect, useState} from 'react';
import {loginRequest} from '../../api/loginApi';
import {IAuthProvider, IContext, IUser as IUserLS} from './types';
import {getUserLocalStorage, setUserLocalStorage} from './util';
import { IUser, userGetOneApi } from '../../api/userApi';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({children}: IAuthProvider) => {
  const [user, setUser] = useState<IUserLS | null>(null);
  const [userSeller, setUserSeller] = useState<IUser | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true)

  useEffect(() => {
    const getUser = async () => {
      const userLS = await getUserLocalStorage();
  
      if (userLS) {
        setUser(userLS);
      }

      setCarregando(false)
    }

    getUser()
  }, []);

  useEffect(() => {
    const getSeller = async () => {
      if (user && user.id) {
        const seller = await userGetOneApi(user.id);
        
        if (seller) {
          setUserSeller(seller);
        }
      }

      setCarregando(false)
    }

    getSeller()
  }, [user]);

  const authenticate = async (email: string, password: string) => {
    const response = await loginRequest(email, password);
    setUser(response);
    await setUserLocalStorage(response);
  };

  const logout = async () => {
    setUser(null);
    await setUserLocalStorage(null);
  };

  return (
    <AuthContext.Provider value={{...user, userSeller, authenticate, logout, carregando}}>
      {children}
    </AuthContext.Provider>
  );
};
