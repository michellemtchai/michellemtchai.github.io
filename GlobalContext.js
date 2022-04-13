import React, { createContext } from 'react';

const initialState = {
  title: null,
  description: null,
  category: null,
  searchFilters: {
    term: null,
    range: null,
    sortBy: 'relevance',
    sortDir: 'ASC',
    stacks: [],
    stackOptions: [],
  },
  categoryFilters: {
    range: null,
    sortBy: 'name',
    sortDir: 'DESC',
    stacks: [],
    stackOptions: [],
  },
};

const actions = {
  SET_TITLE: 'SET_TITLE',
  SET_DESCRIPTION: 'SET_DESCRIPTION',
  SET_CATEGORY: 'SET_CATEGORY',
  SET_CATEGORY_FILTERS_RANGE: 'SET_CATEGORY_FILTERS_RANGE',
  SET_CATEGORY_FILTERS_SORT_BY: 'SET_CATEGORY_FILTERS_SORT_BY',
  SET_CATEGORY_FILTERS_SORT_DIR: 'SET_CATEGORY_FILTERS_SORT_DIR',
  SET_CATEGORY_FILTERS_STACKS: 'SET_CATEGORY_FILTERS_STACKS',
  SET_CATEGORY_FILTERS_STACK_OPTIONS: 'SET_CATEGORY_FILTERS_STACK_OPTIONS',
  SET_SEARCH_FILTERS_TERM: 'SET_SEARCH_FILTERS_TERM',
  SET_SEARCH_FILTERS_RANGE: 'SET_SEARCH_FILTERS_RANGE',
  SET_SEARCH_FILTERS_SORT_BY: 'SET_SEARCH_FILTERS_SORT_BY',
  SET_SEARCH_FILTERS_SORT_DIR: 'SET_SEARCH_FILTERS_SORT_DIR',
  SET_SEARCH_FILTERS_STACKS: 'SET_SEARCH_FILTERS_STACKS',
  SET_SEARCH_FILTERS_STACK_OPTIONS: 'SET_SEARCH_FILTERS_STACK_OPTIONS',
};

const reducer = (state, action) => {
  const updateState = (key) => ({ ...state, [key]: action.value });
  const updateFilterState = (filter, key) => ({
    ...state,
    [filter]: {
      ...state[filter],
      [key]: action.value,
    },
  });
  switch (action.type) {
    case actions.SET_TITLE:
      return updateState('title');
    case actions.SET_DESCRIPTION:
      return updateState('description');
    case actions.SET_CATEGORY:
      return state.category === action.value
        ? updateState('category')
        : {
            ...state,
            category: action.value,
            searchFilters: {
              term: null,
              range: null,
              sortBy: 'relevance',
              sortDir: 'ASC',
              stacks: [],
              stackOptions: [],
            },
            categoryFilters: {
              range: null,
              sortBy: 'name',
              sortDir: 'DESC',
              stacks: [],
              stackOptions: [],
            },
          };
    case actions.SET_CATEGORY_FILTERS_RANGE:
      return updateFilterState('categoryFilters', 'range');
    case actions.SET_CATEGORY_FILTERS_SORT_BY:
      return updateFilterState('categoryFilters', 'sortBy');
    case actions.SET_CATEGORY_FILTERS_SORT_DIR:
      return updateFilterState('categoryFilters', 'sortDir');
    case actions.SET_CATEGORY_FILTERS_STACKS:
      return updateFilterState('categoryFilters', 'stacks');
    case actions.SET_CATEGORY_FILTERS_STACK_OPTIONS:
      return updateFilterState('categoryFilters', 'stackOptions');
    case actions.SET_SEARCH_FILTERS_TERM:
      return updateFilterState('searchFilters', 'term');
    case actions.SET_SEARCH_FILTERS_RANGE:
      return updateFilterState('searchFilters', 'range');
    case actions.SET_SEARCH_FILTERS_SORT_BY:
      return updateFilterState('searchFilters', 'sortBy');
    case actions.SET_SEARCH_FILTERS_SORT_DIR:
      return updateFilterState('searchFilters', 'sortDir');
    case actions.SET_SEARCH_FILTERS_STACKS:
      return updateFilterState('searchFilters', 'stacks');
    case actions.SET_SEARCH_FILTERS_STACK_OPTIONS:
      return updateFilterState('searchFilters', 'stackOptions');
    default:
      return state;
  }
};

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const dispatchFn = (key, value) => {
    dispatch({ type: key, value });
  };

  const value = {
    pageTitle: state.title,
    setTitle: (value) => {
      dispatchFn(actions.SET_TITLE, value);
    },
    pageDescription: state.description,
    setDescription: (value) => {
      dispatchFn(actions.SET_DESCRIPTION, value);
    },
    selectedCategory: state.category,
    setSelectedCategory: (value) => {
      dispatchFn(actions.SET_CATEGORY, value);
    },
    categoryFiltersInitialized: state.category === state.categoryFilters.range,
    setCategoryFiltersRange: (value) => {
      dispatchFn(actions.SET_CATEGORY_FILTERS_RANGE, value);
    },
    categoryFiltersSortBy: state.categoryFilters.sortBy,
    setCategoryFiltersSortBy: (value) => {
      dispatchFn(actions.SET_CATEGORY_FILTERS_SORT_BY, value);
    },
    categoryFiltersSortDir: state.categoryFilters.sortDir,
    setCategoryFiltersSortDir: (value) => {
      dispatchFn(actions.SET_CATEGORY_FILTERS_SORT_DIR, value);
    },
    categoryFiltersStacks: state.categoryFilters.stacks,
    setCategoryFiltersStacks: (value) => {
      dispatchFn(actions.SET_CATEGORY_FILTERS_STACKS, value);
    },
    categoryFiltersStackOptions: state.categoryFilters.stackOptions,
    setCategoryFiltersStackOptions: (value) => {
      dispatchFn(actions.SET_CATEGORY_FILTERS_STACK_OPTIONS, value);
    },
    searchFiltersTerm: state.searchFilters.term,
    setSearchFiltersTerm: (value) => {
      dispatchFn(actions.SET_SEARCH_FILTERS_TERM, value);
    },
    searchFiltersRange: state.searchFilters.range,
    setSearchFiltersRange: (value) => {
      dispatchFn(actions.SET_SEARCH_FILTERS_RANGE, value);
    },
    searchFiltersSortBy: state.searchFilters.sortBy,
    setSearchFiltersSortBy: (value) => {
      dispatchFn(actions.SET_SEARCH_FILTERS_SORT_BY, value);
    },
    searchFiltersSortDir: state.searchFilters.sortDir,
    setSearchFiltersSortDir: (value) => {
      dispatchFn(actions.SET_SEARCH_FILTERS_SORT_DIR, value);
    },
    searchFiltersStacks: state.searchFilters.stacks,
    setSearchFiltersStacks: (value) => {
      dispatchFn(actions.SET_SEARCH_FILTERS_STACKS, value);
    },
    searchFiltersStackOptions: state.searchFilters.stackOptions,
    setSearchFiltersStackOptions: (value) => {
      dispatchFn(actions.SET_SEARCH_FILTERS_STACK_OPTIONS, value);
    },
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export { GlobalContextProvider as default, GlobalContext };
