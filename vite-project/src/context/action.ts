export type AppState = {
  listRole?: Array<any>;
  isDrawerProfile?: boolean;
  isModalPassword?: boolean;
  homeLogin?: string;
};
type PayloadType = {
  listRole?: Array<any>;
  isDrawerProfile?: boolean;
  isModalPassword?: boolean;
  homeLogin?: string;
};

export type ActionType = {
  type: string;
  payload?: PayloadType;
};

export const setListRole = (state: AppState, action: ActionType) => {
  return {
    ...state,
    listRole: action.payload?.listRole,
  };
};

export const setIsDrawerProfile = (state: AppState, action: ActionType) => {
  return {
    ...state,
    isDrawerProfile: action.payload?.isDrawerProfile,
  };
};

export const setIsModalPassword = (state: AppState, action: ActionType) => {
  return {
    ...state,
    isModalPassword: action.payload?.isModalPassword,
  };
};

export const setIsHomeLogin = (state: AppState, action: ActionType) => {
  return {
    ...state,
    homeLogin: action.payload?.homeLogin,
  };
};
