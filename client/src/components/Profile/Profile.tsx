import React, { useState } from "react";
import { Box, Chip, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";

const Profile: React.FC = (): JSX.Element => {
    const [categories, setCategories] = useState<string[]>(['Asian', 'Italian']);
    return (
        <Container sx={{ bgcolor: '#cfe8fc', height: '100vh', display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
            <Box
                component="img"
                sx={{
                height: 233,
                width: 350,
                margin: 5
                // maxHeight: { xs: 233, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
                }}
                alt="The house from the offer."
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            />
            <Typography sx={{ fontSize: 30, fontFamily: "sans-serif"}}>David Bowie</Typography>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 10}}>
                <Typography sx={{ fontSize: 15, fontFamily: "sans-serif", marginRight: 2}}> Categories </Typography>
                <Stack direction="row" spacing={1}>
                    {
                        categories?.map((category: string) => 
                            <Chip label={category} color="primary" variant="outlined" />
                        )
                    }
                </Stack>
            </div>
            <Typography sx={{ fontSize: 15, fontFamily: "sans-serif", margin: 5}}>Allergies: None</Typography>
            <FormControl>
                <FormLabel>Preferences</FormLabel>
                <RadioGroup
                    row
                    value={'Yes'}
                >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
        </Container>
    )
}

export default Profile;