interface INamedUrl {
  name: string;
  url: string;
}

export type Origin = string | 'unknown' ;

export type Gender = 'Male' | 'Female' | 'unknown' | string;

export type Status = 'Alive' | 'Dead' | 'unknown';

export type Spieces = 'Alien' | 'Human' | string;

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
