import { ReactNode, createContext, useReducer } from "react";
import { setListRole } from "./action";

type PayloadType = {
  listRole?: Array<any>;
};

export type AppState = {
  listRole?: Array<any>;
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
};

export const AppContext = createContext<AppContextProps>({
  state: initialState,
  dispatch: () => null,
});

function reducer(state: AppState, action: ActionType) {
  switch (action?.type) {
    case "setListRole":
      return setListRole(state, action);

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
