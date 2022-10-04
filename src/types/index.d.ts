import { Location } from 'vue-router/types';

export type QueryBase = Location['query'];

export type QueryParams = {
  search?: string;
  page?: number;
  maxResults?: number;
} | QueryBase;

type BookDetail = {
  title: string;
  authors?: string[];
  imageLinks?: {
    thumbnail: string;
  };
  infoLink: string;
};

export type Book = {
  id: string;
  volumeInfo: BookDetail;
};

export type State = {
  books: Book[];
  search: string;
  currentPage: number;
  startIndex: number;
  maxResults: number;
  totalItems: number;
  isLoading: boolean;
  isError: boolean;
};

export type ResponseData = Pick<State, 'search' | 'currentPage' | 'totalItems'> & { items: Book[] };
