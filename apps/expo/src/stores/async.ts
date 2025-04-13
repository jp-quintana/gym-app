import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateStorage } from 'zustand/middleware/persist';

export const asyncStorage: StateStorage = {
  getItem: async (name) => {
    try {
      const value = await AsyncStorage.getItem(name);
      return value !== null ? value : null;
    } catch (e) {
      console.error('Error reading from AsyncStorage:', e);
      return null;
    }
  },
  setItem: async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (e) {
      console.error('Error writing to AsyncStorage:', e);
    }
  },
  removeItem: async (name) => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (e) {
      console.error('Error removing from AsyncStorage:', e);
    }
  },
};
