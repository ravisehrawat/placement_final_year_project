import { createContext, useContext, useReducer } from "react";
import reducer from "../reducer/driveReducer";
import fetchData from "../utils/apiCall";

const DriveContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  drives: [],
  isSingleLoading: false,
  singleDrive: {},
};

const DriveProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchDrives = async (url) => {
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

  const fetchSingleDrive = async (url) => {
    try {
      dispatch({ type: "SINGLE_LOADING" });
      const data = await fetchData(url);
      dispatch({ type: "SET_SINGLE_DATA", payload: data });
    } catch (error) {
      dispatch({ type: "SINGLE_ERROR" });
      console.log(error);
    }
  };

  return (
    <DriveContext.Provider
      value={{ ...state, fetchSingleDrive, setLoading, fetchDrives }}
    >
      {children}
    </DriveContext.Provider>
  );
};

const useDriveContext = () => {
  return useContext(DriveContext);
};

export { DriveContext, DriveProvider, useDriveContext };
