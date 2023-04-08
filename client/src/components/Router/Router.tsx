import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Registration from "../Login/Registration";
import SearchMeal from "../Meals/SearchMeal";

interface RouteProps {
    children: JSX.Element
}

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
    const token = localStorage.getItem("token")

    if (!token) {
        return <Navigate to="/" replace />
    }

    return children
}

const LoginRoute: React.FC<RouteProps> = ({ children }) => {
    const token = localStorage.getItem("token")

    if (token) {
        return <Navigate to="/search" replace />
    }

    return children
}

const ReactRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <LoginRoute>
                        <Login />
                    </LoginRoute>
                } />
                <Route path="/register" element={<Registration />} />
                <Route path="/home" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/search" element={
                    <ProtectedRoute>
                        <SearchMeal />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default ReactRouter