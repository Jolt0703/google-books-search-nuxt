import { Location } from 'vue-router/types';

export type QueryBase = Location['query'];

export type QueryParams = {
  search?: string;
  page?: string;
};
