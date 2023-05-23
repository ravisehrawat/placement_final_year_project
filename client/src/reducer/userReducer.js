const userReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "SET_API_DATA":
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        isError: false,
      };
    case "SINGLE_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "SINGLE_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "SET_SINGLE_DATA":
      return {
        ...state,
        isLoading: false,
        isError: false,
      };

    default:
      return state;
  }
};

export default userReducer;
