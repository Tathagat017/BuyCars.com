import React from "react";

import { Route, Routes } from "react-router-dom";
import LoginAndSignUp from "./../Pages/LoginAndSignUp";
import Deals from "./../Pages/Deal";
import LandingPage from "./../Pages/LandingPage";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/signin" element={<LoginAndSignUp />}></Route>
      <Route
        path="/deals"
        element={
          <PrivateRoute>
            <Deals />
          </PrivateRoute>
        }
      ></Route>
      <Route path="*" element={<h1>Page not found</h1>}></Route>
    </Routes>
  );
};

export default AllRoutes;
