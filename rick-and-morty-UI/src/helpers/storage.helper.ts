import { toastifyConfiguration } from '@/configs/toastify.config';
import type { ICharacter } from '@/models/character.model';
import { toast } from 'vue3-toastify';

const storage = localStorage;

export function fetchFromStorage(key: string): ICharacter | null {
  const item = storage.getItem(key);
  if (item) {
    let storageCharacter: ICharacter;
    try {
      storageCharacter = JSON.parse(item);
      return storageCharacter;
    } catch (error) {
      toast.error(`Error parsing storage: ${error}`, toastifyConfiguration);
      return null;
    }
  }
  return null;
}
export function storeIntoStorage(key: string, object: any): void {
  storage.setItem(key, JSON.stringify(object));
}
