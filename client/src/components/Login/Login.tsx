import React, { useState } from "react"
import { Alert, Button, Grid, Stack, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import UserServer from "../../serverAPI/user"
import { useNavigate } from "react-router-dom"
import { setAuthToken } from "../../auth/auth"

interface LoginProps {
    handleToken: (token: string) => void
}

const Login: React.FC<LoginProps> = ({ handleToken }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState({ mail: "", password: "" })
    const [displayAlert, setDisplayAlert] = useState(false)

    const handleValueChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prev => ({
            ...prev,
            [field]: event.target.value
        }))
    }

    const handleLogin = async () => {
        try {
            const login = await UserServer.login(user.mail, user.password)

            if (login.data.message === "Wrong email or password") {
                setDisplayAlert(true)
            }
            else if (login.data) {
                const token = login.data.token
                localStorage.setItem("token", token)
                localStorage.setItem("email", user.mail)
                setAuthToken(token)
                handleToken(token)

                navigate("/home")
            }
        } catch {

        }
    }

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ marginTop: "7em" }}>
            <Grid item xs={4}>
                <Stack direction="column" justifyContent="center" spacing={3}>
                    <Typography variant="h4" align="center">Plan Me(al)</Typography>
                    <TextField
                        label="email"
                        value={user.mail}
                        onChange={handleValueChange("mail")}
                    />
                    <TextField
                        label="password"
                        type="password"
                        value={user.password}
                        onChange={handleValueChange("password")}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLogin}
                        sx={{ width: "100%" }}>
                        Login
                    </Button>
                    <Typography align="center">
                        {"Don't have an account? "}
                        <Link to="/register" style={{ color: "blue" }}>Sign up</Link>
                    </Typography>
                    {displayAlert &&
                        <Alert severity="error">Wrong email or password</Alert>
                    }
                </Stack>
            </Grid>
        </Grid>
    )
}

export default Login