import React, { useState, useEffect } from "react"
import { Grid } from "@mui/material"
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

    }

    return (
        <Grid container>
            {meals.map(meal => (
                <Grid item xs={4}>
                    <Meal
                        key={meal.id}
                        meal={meal}
                        isFavorite
                        favoritesPage
                        updateAfterSaveFavorite={updateAfterSave} />
                </Grid>
            ))
            }
        </Grid>
    )
}

export default FavoriteMeals