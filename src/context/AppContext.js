import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const useApp = () => useContext(AppContext);

const usePage = () => useApp()?.state?.page;

const useUser = () => useApp()?.state?.user;

const useDispatch = () => useApp()?.dispatch;

const useAppReducer = (state, action) => {
  console.log("useAppReducer", state, action);
  switch (action?.type) {
    case "user":
      return { ...state, user: action?.cb?.(state.user) };
    case "page":
      return { ...state, page: action?.cb?.(state.page) };
    default:
      return state;
  }
};

const AppProvider = ({ children, value = {} }) => {
  const [state, dispatch] = useReducer(useAppReducer, { ...value });
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useApp, useUser, usePage, useDispatch };
