import React, { useEffect, useState } from "react";
import { Box, Chip, CircularProgress, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import MealCategoryServer from "../../serverAPI/mealCategory";
import { MealCategory } from "../../models/MealCategory";
import jwtDecode from "jwt-decode";
import { User } from "../../models/User";
import { useQuery } from 'react-query'

const Profile: React.FC = (): JSX.Element => {
    const currentUserId = jwtDecode<User>(localStorage.getItem('token')|| "")?.id;
    const [categories, setCategories] = useState<string[]>(['Asian', 'Italian']);
    // const [isLoading, setIsLoading] = useState<boolean>(true);

    const { isLoading, isError, data: mealCategories, error } = useQuery('mealCategories', MealCategoryServer.getMealCategory)


    return (
        <Container sx={{ bgcolor: '#cfe8fc', height: '95vh', display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
            <Box
                component="img"
                sx={{
                height: 200,
                width: 350,
                margin: 5
                // maxHeight: { xs: 233, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
                }}
                alt="The house from the offer."
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            />
            <Typography sx={{ fontSize: 30 }}>David Bowie</Typography>
            {
                isLoading ? 
                <CircularProgress /> :
                <>
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
                        {mealCategories && mealCategories.map((mealCategory: MealCategory) => 
                        <div key={mealCategory.id}>
                            <FormLabel  id="demo-row-radio-buttons-group-label">{mealCategory.description}</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                defaultValue="no"
                            >
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            </RadioGroup>
                        </div>
                            )}
                    </FormControl>
            </>
            }
        </Container>
    )
}

export default Profile;