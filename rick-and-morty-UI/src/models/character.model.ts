export type Gender = 'a' | 'b' | 'c';

export type Spieces = 'a' | 'b' | 'c';

export interface Character {
    origin_image: string;
    avatar_image: string;
    name: string;
    spieces: Spieces;
    gender: Gender;
    location: string;
}