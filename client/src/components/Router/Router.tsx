import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Registration from "../Login/Registration";
import Preffernce from "../Preffernce/Preffernce";
import SearchMeal from "../SearchBar/SearchMeal";
import Navbar from "./Navbar";
import Profile from "../Profile/Profile";

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
    const [token, setToken] = useState<string>()

    const handleToken = (token: string) => {
        setToken(token)
    }

    return (
        <Router>
            {token && <Navbar />}
            <Routes>
                <Route path="/" element={
                    <LoginRoute>
                        <Login handleToken={handleToken} />
                    </LoginRoute>
                } />
                <Route path="/register" element={<Registration handleToken={handleToken} />} />
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
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="/pref" element={
                    // <ProtectedRoute>
                        <Preffernce />
                    // </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default ReactRouter