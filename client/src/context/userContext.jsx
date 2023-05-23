import { createContext, useContext, useReducer } from "react";
import reducer from "../reducer/userReducer";
import fetchData from "../utils/apiCall";

const UserContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  users: [],
  singleUser: {},
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUsers = async (url) => {
    try {
      dispatch({ type: "LOADING", payload: true });
      const data = await fetchData(url);
      dispatch({ type: "SET_API_DATA", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR" });
      console.log(error);
    }
  };

  const setLoading = (value) => {
    dispatch({ type: "LOADING", payload: value });
  };

  const fetchSingleUser = async (url) => {
    try {
      dispatch({ type: "LOADING" });
      const data = await fetchData(url);
      localStorage.setItem("userDetails", JSON.stringify(data));
    } catch (error) {
      dispatch({ type: "SINGLE_ERROR" });
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{ ...state, fetchSingleUser, setLoading, fetchUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, UserProvider, useUserContext };
