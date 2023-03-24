import React, { useState } from "react"
import { Alert, Button, Grid, Stack, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import UserServer from "../../serverAPI/user"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    const [login, setLogin] = useState({ mail: "", password: "" })
    const [displayAlert, setDisplayAlert] = useState(false)

    const handleValueChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(prev => ({
            ...prev,
            [field]: event.target.value
        }))
    }

    const handleLogin = async () => {
        try {
            const user = await UserServer.checkUser(login)
            console.log(user)

            if (user.data.message === "Wrong email or password") {
                setDisplayAlert(true)
            }
            else if (user.data) {
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
                        label="מייל"
                        value={login.mail}
                        onChange={handleValueChange("mail")}
                    />
                    <TextField
                        label="סיסמה"
                        value={login.password}
                        onChange={handleValueChange("password")}
                    />
                    <Button
                        variant="contained"
                        onClick={handleLogin}
                        sx={{ width: "100%" }}>
                        התחבר
                    </Button>
                    <Typography align="center">
                        {'אין לך משתמש? '}
                        <Link to="/register" style={{ color: "blue" }}>הירשם כאן</Link>
                    </Typography>
                    {displayAlert &&
                        <Alert severity="error">משתמש או סיסמה אינם נכונים</Alert>
                    }
                </Stack>
            </Grid>
        </Grid>
    )
}

export default Login