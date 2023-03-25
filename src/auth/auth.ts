import axios from 'axios'
import jwt_decode, { JwtPayload } from "jwt-decode"

export const isTokenValid = (token: string) => {
    const { exp } = jwt_decode<JwtPayload>(token)
    if (exp)
        return exp * 1000 > new Date().getTime()
    return false
}

export const setAuthToken = async (token: string) => {
    if (!isTokenValid(token)) {
        try {
            // token not valid, we need to get a new one
            const refresh = await axios.post("/refresh_token")

            if (refresh.data) {
                const newtoken = refresh.data.newToken
                localStorage.setItem("token", newtoken)
                setAuthToken(newtoken)
            }
        } catch (err) {
            // refresh token has expired, we need to login again
            localStorage.removeItem("token")
            window.location.replace("/")
        }

    }
    else if (token && isTokenValid(token))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    else
        delete axios.defaults.headers.common["Authorization"]
}