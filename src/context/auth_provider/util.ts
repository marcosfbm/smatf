import AsyncStorage from '@react-native-async-storage/async-storage';

import {IUser} from './types';

export const setUserLocalStorage = async (user: IUser | null): Promise<void> => {
  await AsyncStorage.setItem('session', JSON.stringify(user));
};

export const getUserLocalStorage = async (): Promise<IUser | null> => {
  const userJson = await AsyncStorage.getItem('session');

  if (!userJson) {
    return null;
  }

  return JSON.parse(userJson) ?? null;
};
