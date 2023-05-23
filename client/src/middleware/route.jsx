import { Navigate } from "react-router-dom";

export const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return children;
  }
  return (
    <Navigate
      to={"/login"}
      replace={true}
    ></Navigate>
  );
};

export const Public = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return children;
  }
  return (
    <Navigate
      to={"/"}
      replace={true}
    ></Navigate>
  );
};

export const Coordinator = ({ children }) => {
  const isAdmin =
    JSON.parse(localStorage.getItem("userDetails")).incharge ||
    JSON.parse(localStorage.getItem("userDetails")).coordinator;

  if (isAdmin) {
    return children;
  }
  return (
    <Navigate
      to={"/login"}
      replace={true}
    ></Navigate>
  );
};

export const Incharge = ({ children }) => {
  const isAdmin = JSON.parse(localStorage.getItem("userDetails")).incharge;

  if (isAdmin) {
    return children;
  }
  return (
    <Navigate
      to={"/login"}
      replace={true}
    ></Navigate>
  );
};
