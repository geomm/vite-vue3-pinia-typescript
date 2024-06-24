interface INamedUrl {
  name: string;
  url: string;
}

export type Origin = string | 'unknown';

export type Gender = 'Male' | 'Female' | 'unknown' | string;

export type Status = 'Alive' | 'Dead' | 'unknown';

export type Spieces = 'Alien' | 'Human' | 'unknown' | string;

export interface ICharacter {
  id: number;
  name: string;
  status: Status;
  species: Spieces;
  type: string;
  gender: Gender;
  origin: INamedUrl;
  location: INamedUrl;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export default class Character {
  id: number;
  name: string;
  status: Status;
  species: Spieces;
  type: string;
  gender: Gender;
  origin: INamedUrl;
  location: INamedUrl;
  image: string;
  episode: string[];
  url: string;
  created: string;
  constructor(
    // id: number,
    // name: string,
    // status: Status,
    // species: Spieces,
    // type: string,
    // gender: Gender,
    // origin: INamedUrl,
    // location: INamedUrl,
    // image: string,
    // episode: string[],
    // url: string,
    // created: string
  ) {
    this.id = -1;
    this.name = '-';
    this.status = 'unknown';
    this.species = 'unknown';
    this.type = '-';
    this.gender = 'unknown';
    this.origin = {} as INamedUrl;
    this.location = {} as INamedUrl;
    this.image = '-';
    this.episode = [];
    this.url = '-';
    this.created = '-';
  }
}
