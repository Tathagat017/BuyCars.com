import React from "react";

import { Route, Routes } from "react-router-dom";
import LoginAndSignUp from "./../Pages/LoginAndSignUp";
import Deals from "./../Pages/Deal";

import PrivateRoute from "./PrivateRoute";
import Inventory from "./../Pages/InventoryPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginAndSignUp />}></Route>
      <Route path="/signin" element={<LoginAndSignUp />}></Route>
      <Route
        path="/deals"
        element={
          <PrivateRoute>
            <Deals />
          </PrivateRoute>
        }
      ></Route>

      <Route
        path="/inventory"
        element={
          <PrivateRoute>
            <Inventory />
          </PrivateRoute>
        }
      ></Route>
      <Route path="*" element={<h1>Page not found</h1>}></Route>
    </Routes>
  );
};

export default AllRoutes;
