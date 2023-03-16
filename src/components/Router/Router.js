import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Registration from "../Login/Registration";

// const ProtectedRoute = ({ isAdmin, children }) => {
//     if (!isAdmin) {
//         return <Navigate to="/" replace />
//     }

//     return children
// }

const ReactRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Registration />} />
            </Routes>
        </Router>
    );
}

export default ReactRouter