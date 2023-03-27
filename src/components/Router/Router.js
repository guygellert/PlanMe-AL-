import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Registration from "../Login/Registration";
import SearchMeal from "../Meals/SearchMeal";
const ReactRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/search" element={<SearchMeal />} />
            </Routes>
        </Router>
    );
}
export default ReactRouter;
