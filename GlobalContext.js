import React, { createContext } from 'react';

const initialState = {
  title: null,
  description: null,
  category: null,
  searchTerm: null,
  searchResults: [],
};

const actions = {
  SET_TITLE: 'SET_TITLE',
  SET_DESCRIPTION: 'SET_DESCRIPTION',
  SET_CATEGORY: 'SET_CATEGORY',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
};

const reducer = (state, action) => {
  const updateState = (key) => ({ ...state, [key]: action.value });
  switch (action.type) {
    case actions.SET_TITLE:
      return updateState('title');
    case actions.SET_DESCRIPTION:
      return updateState('description');
    case actions.SET_CATEGORY:
      return updateState('category');
    case actions.SET_SEARCH_TERM:
      return updateState('searchTerm');
    case actions.SET_SEARCH_RESULTS:
      return updateState('searchResults');
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
    searchTerm: state.searchTerm,
    setSearchTerm: (value) => {
      dispatchFn(actions.SET_SEARCH_TERM, value);
    },
    searchResults: state.searchResults,
    setSearchResults: (value) => {
      dispatchFn(actions.SET_SEARCH_RESULTS, value);
    },
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export { GlobalContextProvider as default, GlobalContext };
