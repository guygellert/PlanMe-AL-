import React from "react";
import { Box, Chip, CircularProgress, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import MealCategoryServer from "../../serverAPI/mealCategory";
import { MealCategory } from "../../models/MealCategory";
import jwtDecode from "jwt-decode";
import { User } from "../../models/User";
import { useQuery } from 'react-query'
import UserServer from "../../serverAPI/user";
import UserPreferenceServer from "../../serverAPI/userPreference";
import { UserPreferences } from "../../models/UserPreferences";
import { Cuisine } from "../../models/Cuisine";
import { DishCategory } from "../../models/DishCategory";

const Profile: React.FC = (): JSX.Element => {
    const currentUserId = jwtDecode<User>(localStorage.getItem('token')|| "").id;

    const { 
        isLoading: isLoadingMealCategories,
        isError: isErrorMealCategories, 
        data: mealCategoriesData, 
        error: errorMealCategories 
    } = useQuery('mealCategories', MealCategoryServer.getMealCategory);

    const { 
        isLoading: isLoadingUser,
        isError: isErrorUser, 
        data: userData, 
        error: errorUser 
    } = useQuery('user', () => UserServer.getUserById(currentUserId!));

    const { 
        isLoading: isLoadingUserPreferences,
        isError: isErrorUserPreferences, 
        data: userPreferences, 
        error: errorUserPreference 
    } = useQuery<UserPreferences>('userPreferences', () => UserPreferenceServer.getUserPreference(currentUserId!));

    if(isLoadingMealCategories || isLoadingUser || isLoadingUserPreferences) {
        return <CircularProgress/>
    } else {

        console.log(userPreferences);
    }


    return (
        <Container sx={{ bgcolor: 'antiquewhite', height: '95vh', width: '1000vw', display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
            <Box
                component="img"
                sx={{
                height: 200,
                width: 350,
                margin: 5
                }}
                alt="The house from the offer."
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            />
            <Typography sx={{ fontSize: 30 }}>{`${userData.firstName} ${userData.lastName}`}</Typography>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 10}}>
                <Typography sx={{ fontSize: 15, fontFamily: "sans-serif", marginRight: 2}}> Favorite Cuisines </Typography>
                <Stack direction="row" spacing={1}>
                    {
                        userPreferences?.cuisines?.map((cuisine: Cuisine) => 
                            <Chip label={cuisine.description} color="primary" variant="outlined" />
                        )
                    }
                </Stack>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 10}}>
                <Typography sx={{ fontSize: 15, fontFamily: "sans-serif", margin: 2}}>Allergies: </Typography>
                {
                    userPreferences?.dishCategories && userPreferences?.dishCategories.length > 0 ? 
                    <Stack direction="row" spacing={1}>
                        {
                            userPreferences?.dishCategories.map((dishCategory:DishCategory) => 
                                <Chip label={dishCategory.description} color="secondary" variant="outlined" />
                        ) 
                        }
                    </Stack>
                    : 
                    <Typography sx={{ fontSize: 15, fontFamily: "sans-serif"}}>None </Typography>
                }
            </div>
            
            <FormControl>
                {
                    mealCategoriesData &&
                    mealCategoriesData.map((mealCategory: MealCategory) => 
                    <div key={mealCategory.id}>
                        <FormLabel id="demo-row-radio-buttons-group-label">{mealCategory.description}</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            defaultValue="no"
                            value={userPreferences?.mealCategories.find((userMealCategory: MealCategory) => 
                                userMealCategory.id === mealCategory.id) ? "yes" : "no"}
                        >
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        </RadioGroup>
                    </div>
                    )
                }
            </FormControl>
        </Container>
    )
}

export default Profile;