import { GetterTree, ActionTree, MutationTree } from 'vuex';

import { QueryParams, ResponseData, State } from '@/types';

const API_KEY = process.env.NUXT_APP_GOOGLE_BOOKS_API_KEY;
const GOOGLE_BOOKS_ENDPOINT = 'https://www.googleapis.com/books/v1/volumes';

const initialState: State = {
  books: [],
  search: '',
  currentPage: 1,
  startIndex: 0,
  maxResults: 12,
  totalItems: 0,
  isLoading: false,
  isError: false,
};

export const state: () => State = () => ({ ...initialState });

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  books: (state) => state.books,
  search: (state) => state.search,
  currentPage: (state) => state.currentPage,
  maxResults: (state) => state.maxResults,
  totalItems: (state) => state.totalItems,
  isError: (state) => state.isError,
};

export const mutations: MutationTree<RootState> = {
  UPDATE_STATE: (state, payload: ResponseData) => {
    state.books = payload.items;
    state.search = payload.search;
    state.currentPage = payload.currentPage;
    state.startIndex = state.currentPage * state.maxResults;
    state.totalItems = payload.totalItems;
    state.isLoading = false;
    state.isError = false;
  },
  INITIALIZE_STATE: (state) => {
    state.books = initialState.books;
    state.search = initialState.search;
    state.currentPage = initialState.currentPage;
    state.startIndex = initialState.startIndex;
    state.maxResults = initialState.maxResults;
    state.totalItems = initialState.totalItems;
    state.isLoading = initialState.isLoading;
    state.isError = initialState.isError;
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async fetchBooksData({ commit }, payload: QueryParams) {
    const { search, page = initialState.currentPage, maxResults = initialState.maxResults } = payload;
    const startIndex = (page - 1) * maxResults;
    const params = {
      q: search,
      maxResults,
      startIndex,
      key: API_KEY,
    };
    const data = await this.$axios.$get<ResponseData>(GOOGLE_BOOKS_ENDPOINT, { params });
    if (!data.items) throw new Error('No items found');
    data.search = search ?? '';
    data.currentPage = page;
    commit('UPDATE_STATE', data);
  },
  initializeState({ commit }) {
    commit('INITIALIZE_STATE');
  },
};
