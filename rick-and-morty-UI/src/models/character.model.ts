interface INamedUrl {
  name: string;
  url: string;
}

export type Gender = 'Male' | 'Female';

export type Status = 'Alive' | 'Dead' | 'unknown' | '';

export type Spieces = 'Alien' | 'Human' | '';

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: Gender;
  origin: INamedUrl;
  location: INamedUrl;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
