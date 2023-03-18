import React, { useState } from "react"
import { Button, Grid, Stack, TextField, Typography } from "@mui/material"

const Registration = () => {
    const [newUser, setNewUser] = useState({ firstName: "", lastName: "", mail: "", password: "" })
    const [loadingSave, setLoadingSave] = useState(false)
    const [saveButton, setSaveButton] = useState({ text: "שמור", color: "primary" })

    const handleValueChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser(prev => ({
            ...prev,
            [field]: event.target.value
        }))
    }

    const handleLogin = () => {

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
                        onClick={handleLogin}
                        sx={{ width: "100%" }}>
                        הרשמה
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default Registration