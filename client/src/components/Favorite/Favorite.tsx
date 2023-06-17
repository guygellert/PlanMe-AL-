import React, { useState, useEffect } from "react"
import { Grid, Typography } from "@mui/material"
import Meal from "../Meal/Meal"
import UserFavoriteServer from "../../serverAPI/userFavorite"
import { User } from "../../models/User"
import jwtDecode from "jwt-decode"
import { Meal as MealType } from "../../models/Meal-type"

const FavoriteMeals = () => {
    const currentUser = jwtDecode<User>(localStorage.getItem('token') || "").id
    const [meals, setMeals] = useState<MealType[]>([])

    useEffect(() => {
        const getData = async () => {
            const favoriteMeals = await UserFavoriteServer.getMeals(currentUser!)

            favoriteMeals.data && setMeals(favoriteMeals.data.map((userFavorite: any) => userFavorite.meal))
        }

        getData()
    }, [])

    const updateAfterSave = (mealId: number) => {
        setMeals(prev => prev.filter(meal => meal.id !== mealId))
    }

    return (
        <Grid container justifyContent="center" sx={{ marginTop: "5em" }}>
            <Grid item>
                <Typography variant="h4">My favorite meals</Typography>
            </Grid>
            <Grid container>
                {meals.length ?
                    meals.map(meal => (
                        <Grid item xs={4}>
                            <Meal
                                key={meal.id}
                                meal={meal}
                                isFavorite
                                favoritesPage
                                updateAfterSaveFavorite={updateAfterSave} />
                        </Grid>
                    ))
                    :
                    <Typography variant="h6">Looks like you didn't add anything yet...</Typography>
                }
            </Grid>
        </Grid>
    )
}

export default FavoriteMeals