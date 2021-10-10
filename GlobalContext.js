import React, { createContext } from 'react';

const initialState = {
  title: null,
  description: null,
  selected: null,
};

const actions = {
  SET_TITLE: 'SET_TITLE',
  SET_DESCRIPTION: 'SET_DESCRIPTION',
  SET_SELECTED: 'SET_SELECTED',
};

const reducer = (state, action) => {
  const updateState = (key) => ({ ...state, [key]: action.value });
  switch (action.type) {
    case actions.SET_TITLE:
      return updateState('title');
    case actions.SET_DESCRIPTION:
      return updateState('description');
    case actions.SET_SELECTED:
      return updateState('selected');
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
    selected: state.selected,
    setSelected: (value) => {
      dispatchFn(actions.SET_SELECTED, value);
    },
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export { GlobalContextProvider as default, GlobalContext };
