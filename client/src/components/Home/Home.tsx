import axios from "axios"
import React, { useEffect } from "react"

const Home = () => {
    useEffect(() => {
        axios.get('/top-meal');
    },[]);
    return (
        <h1>Home</h1>
    )
}

export default Home