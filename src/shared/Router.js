import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPage from "../Pages/DetailPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
