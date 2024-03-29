import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Registration from "../Login/Registration";
import Preffernce from "../Preffernce/Preffernce";
import Navbar from "./Navbar";
import Profile from "../Profile/Profile";
import FavoriteMeals from "../Favorite/Favorite";
import MealPage from "../Meal/MealPage"

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
        return <Navigate to="/home" replace />
    }

    return children
}

const ReactRouter = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"))

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
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="/favoriteMeals" element={
                    <ProtectedRoute>
                        <FavoriteMeals />
                    </ProtectedRoute>
                } />
                <Route path="/pref" element={
                    <ProtectedRoute>
                        <Preffernce />
                    </ProtectedRoute>
                } />
                <Route path="/MealPage" element={
                    <ProtectedRoute>
                        <MealPage/>
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default ReactRouter