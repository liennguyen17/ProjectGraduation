export type AppState = {
  listRole?: Array<any>;
};
type PayloadType = {
  listRole?: Array<any>;
  isDrawerProfile?: boolean;
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
