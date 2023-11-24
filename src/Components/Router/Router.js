import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Employee from "../Employee/Employee";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Employee />} />
      </Routes>
    </div>
  );
};
export default AllRoutes;
