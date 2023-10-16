export const INITIAL_STATE = {
  token: null,
};

export const reducerCases = {
  setToken: "SET_TOKEN",
  deleteToken: "DELETE_TOKEN",
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case reducerCases.setToken:
      return {
        token: action.payload,
      };
    case reducerCases.deleteToken:
      return {
        token: null,
      };
    default:
      return state;
  }
};
