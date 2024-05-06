import { ReactNode, createContext, useReducer } from "react";
import { setIsDrawerProfile, setIsModalPassword, setListRole } from "./action";

type PayloadType = {
  listRole?: Array<any>;
  isDrawerProfile?: boolean;
  isModalPassword?: boolean;
};

export type AppState = {
  listRole?: Array<any>;
  isDrawerProfile?: boolean;
  isModalPassword?: boolean;
};

export type ActionType = {
  type: string;
  payload?: PayloadType;
};

type AppProviderProps = {
  children: ReactNode;
};

type AppContextProps = {
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
};

const initialState = {
  listRole: [],
  isDrawerProfile: false,
  isModalPassword: false,
};

export const AppContext = createContext<AppContextProps>({
  state: initialState,
  dispatch: () => null,
});

function reducer(state: AppState, action: ActionType) {
  switch (action?.type) {
    case "setListRole":
      return setListRole(state, action);
    case "setIsDrawerProfile":
      return setIsDrawerProfile(state, action);
    case "setIsModalPassword":
      return setIsModalPassword(state, action);
    default:
      throw new Error();
  }
}

function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
