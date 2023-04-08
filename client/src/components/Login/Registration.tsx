import React, { useState } from "react"
import { Alert, Button, Grid, Stack, TextField, Typography } from "@mui/material"
import UserServer from "../../serverAPI/user"
import { useNavigate } from "react-router-dom"
import { setAuthToken } from "../../auth/auth"

const Registration = () => {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState({ firstName: "", lastName: "", mail: "", password: "" })
    const [displayAlert, setDisplayAlert] = useState(false)

    const handleValueChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser(prev => ({
            ...prev,
            [field]: event.target.value
        }))
    }

    const handleSave = async () => {
        try {
            const user = await UserServer.addUser(newUser)

            if (user.data.message === "User already exists") {
                setDisplayAlert(true)
            }
            else if (user.data) {
                const token = user.data.token
                localStorage.setItem("token", token)
                setAuthToken(token)

                navigate("/search")
            }
        } catch {

        }
    }

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ marginTop: "5em" }}>
            <Grid item xs={4}>
                <Stack direction="column" spacing={3}>
                    <Typography variant="h4" align="center">Plan Me(al)</Typography>
                    <TextField
                        label="שם פרטי"
                        value={newUser.firstName}
                        onChange={handleValueChange("firstName")}
                    />
                    <TextField
                        label="שם משפחה"
                        value={newUser.lastName}
                        onChange={handleValueChange("lastName")}
                    />
                    <TextField
                        label="מייל"
                        value={newUser.mail}
                        onChange={handleValueChange("mail")}
                    />
                    <TextField
                        label="סיסמה"
                        value={newUser.password}
                        onChange={handleValueChange("password")}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{ width: "100%" }}>
                        הרשמה
                    </Button>
                    {displayAlert &&
                        <Alert severity="error">משתמש זה קיים כבר</Alert>
                    }
                </Stack>
            </Grid>
        </Grid>
    )
}

export default Registration