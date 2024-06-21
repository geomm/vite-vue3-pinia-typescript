import type { InputValue } from '@/models/input-types.model';

interface ICharsMap {
  [key: string]: string;
}

export const map: ICharsMap = {
  '&': '',
  '<': '',
  '>': '',
  '"': '',
  "'": ''
};

export function sanitizeInput(input: InputValue) {
  if (typeof input === 'string') return input!.toString().replace(/[&<>"']/g, (m) => map[m]);
  return input;
}
