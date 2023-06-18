import React from "react";
import { Button, Chip, CircularProgress, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography, makeStyles } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
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
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
const backgroungImage = require("./fastFoodBackground.jpg");

const Content = styled('div')({
    display: 'flex',
    marginTop: '11vh',
    height: '87vh',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundImage: `url(${backgroungImage})`,
    backgroundSize: 'cover'
});

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
        <Content>
            <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: 40, marginBottom: 5 }}>{`${userData.firstName} ${userData.lastName}`}</Typography>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 10}}>
                    <Typography sx={{ fontSize: 17, fontFamily: "sans-serif", marginRight: 2}}> Favorite Cuisines: </Typography>
                    {
                        userPreferences?.cuisines && userPreferences?.cuisines.length > 0 ? 
                        <Stack direction="row" spacing={1}>
                            {
                                userPreferences?.cuisines?.map((cuisine: Cuisine) => 
                                    <Chip label={cuisine.description} color="primary" variant="outlined" />
                                )
                            }
                        </Stack>
                        : 
                        <Typography sx={{ fontSize: 17, fontFamily: "sans-serif"}}>None </Typography>
                    }
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 10}}>
                    <Typography sx={{ fontSize: 17, fontFamily: "sans-serif", marginRight: 2, marginBottom: 5, marginTop: 5}}>Allergies: </Typography>
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
                        <Typography sx={{ fontSize: 17, fontFamily: "sans-serif"}}>None </Typography>
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
                                aria-disabled="true"
                                value={userPreferences?.mealCategories?.find((userMealCategory: MealCategory) => 
                                    userMealCategory.id === mealCategory.id) ? "yes" : "no"}
                            >
                                <FormControlLabel disabled={true} value="no" control={<Radio />} label="No" />
                                <FormControlLabel disabled={true} value="yes" control={<Radio />} label="Yes" />
                            </RadioGroup>
                        </div>
                        )
                    }
                </FormControl>
                <Link to='/pref'>
                    <Button variant="contained" style={{width: '20%', marginTop: '30px'}} color='secondary' endIcon={<SendIcon />}>
                        Upadte Preferences
                    </Button>
                </Link>
            </Container>
        </Content>
    )
}

export default Profile;