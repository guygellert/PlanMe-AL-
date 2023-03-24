import React, { useEffect } from "react"
import UserServer from "../../serverAPI/user"

const Home = () => {
    useEffect(() => {
        const getData = async () => {
            const users = await UserServer.getData()

            console.log(users)
        }

        getData()
    }, [])

    return (
        <h1>Home</h1>
    )
}

export default Home