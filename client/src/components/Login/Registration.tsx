import React, { useState } from "react"
import { Alert, Button, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import UserServer from "../../serverAPI/user"
import { useNavigate } from "react-router-dom"
import { setAuthToken } from "../../auth/auth"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { User } from "../../models/User"

interface RegistrationProps {
    handleToken: (token: string) => void
}

const Registration: React.FC<RegistrationProps> = ({ handleToken }) => {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState<User>({ firstName: "", lastName: "", mail: "", password: "" })
    const [displayAlert, setDisplayAlert] = useState(false)
    const [displayPassword, setDisplayPassword] = useState(false)

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
                localStorage.setItem("email", user.mail)
                setAuthToken(token)
                handleToken(token)

                navigate("/search")
            }
        } catch {

        }
    }

    const handleDisplayPassword = () => {
        setDisplayPassword(!displayPassword)
    }

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ marginTop: "5em" }}>
            <Grid item xs={4}>
                <Stack direction="column" spacing={3}>
                    <Typography variant="h4" align="center">Plan Me(al)</Typography>
                    <TextField
                        label="First name"
                        value={newUser.firstName}
                        onChange={handleValueChange("firstName")}
                    />
                    <TextField
                        label="Last name"
                        value={newUser.lastName}
                        onChange={handleValueChange("lastName")}
                    />
                    <TextField
                        label="email"
                        value={newUser.mail}
                        onChange={handleValueChange("mail")}
                    />
                    <TextField
                        label="password"
                        type={displayPassword ? "text" : "password"}
                        value={newUser.password}
                        onChange={handleValueChange("password")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleDisplayPassword}>
                                        {displayPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{ width: "100%" }}>
                        Sign up
                    </Button>
                    {displayAlert &&
                        <Alert severity="error">User already exists</Alert>
                    }
                </Stack>
            </Grid>
        </Grid>
    )
}

export default Registration