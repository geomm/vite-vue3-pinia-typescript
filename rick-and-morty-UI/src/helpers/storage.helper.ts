import { toastifyConfiguration } from '@/configs/toastify.config';
import type { ICharacter } from '@/models/character.model';
import { toast } from 'vue3-toastify';

export const storage = sessionStorage; // localStorage;

export function fetchFromStorage(key: string): ICharacter | number | string | null {
  const item = storage.getItem(key);
  if (item) {
    let storageData: ICharacter | number | string;
    try {
      storageData = JSON.parse(item);
      return storageData;
    } catch (error) {
      toast.error(`Error parsing storage: ${error}`, toastifyConfiguration);
      console.error(`Error parsing storage: ${error}`, toastifyConfiguration);
      return null;
    }
  }
  return null;
}
export function storeIntoStorage(key: string, object: any): void {
  storage.setItem(key, JSON.stringify(object));
}
