import { MouseEventHandler } from 'react';
import CustomButton from '../components/CustomButton';
export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?:
  MouseEventHandler<HTMLButtonElement>;
  btnType: "button" | "sumbit";
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean
}
export interface SearchGenreProps {
  genre: string;
  setGenre: (genre: string) => void;
}
export interface CarProps {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

export interface MovieProps {
  title: string;
  overview: string;
  releaseYear: number;
  genres: [{id:string, name: string}];
  directors: Array<string>;
  cast: Array<string>;
  rating: number;
  runtime: number;
  imageSet: {verticalPoster: {
    w240: string;
    w360: string;
    w480: string;
    w600: string;
    w720: string;
    w1440: string;
  }, horizontalPoster: {
    w240: string;
    w360: string;
    w480: string;
    w600: string;
    w720: string;
    w1440: string;
  }, horizontalBackdrop: {
    w240: string;
    w360: string;
    w480: string;
    w600: string;
    w720: string;
    w1440: string;
  }, verticalBackdrop: {
    w240: string;
    w360: string;
    w480: string;
    w600: string;
    w720: string;
    w1440: string;
  }};
  // streamingOptions: Array<string>;
}

export interface FilterProps{
  manufacturer: string;
  model: string;
  year: number;
  fuel: string;
  limit: number;
}

export interface MoviesFilterProps{ 
  genres: string;
  keyword: string;
  year_max: number;
  year_min: number;
  cursor: string;
}

export interface CustomFilterProps{
  title: string;
  options: OptionProps[];
}

export interface OptionProps{
  title: string;
  value: string;
}

export interface ShowMoreProps{
  pageNumber: number;
  isNext: boolean;
  nextCursor : string;
}

export interface PreviousProps{
  cursor: string;
}