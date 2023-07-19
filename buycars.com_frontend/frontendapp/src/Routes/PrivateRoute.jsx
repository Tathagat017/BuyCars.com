import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const { isAuth } = useSelector((store) => store.auth);
  console.log(isAuth);
  let auth = JSON.parse(sessionStorage.getItem("auth")) || null;
  if (!isAuth) {
    return <Navigate to={"/signin"} />;
  } else {
    return children;
  }
};

export default PrivateRoute;
