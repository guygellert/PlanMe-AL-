import React, { useState } from "react"
import { Button, Card, CardActions, CardHeader, Collapse, Grid, IconButton, Typography, Snackbar, Alert } from "@mui/material"
import { ExpandMore, StarOutline, Star } from "@mui/icons-material"
import Dish from "./Dish"
import MealServer from "../../serverAPI/meal"
import { Meal as MealType } from "../../models/Meal-type"
import { Dish as DishType } from "../../models/Dish"
import { User } from "../../models/User"
import jwtDecode from "jwt-decode"
import { UserFavorite as UserFavoriteType } from "../../models/UserFavorite"
import UserFavoriteServer from "../../serverAPI/userFavorite"
import { useNavigate } from "react-router-dom"
interface MealProps {
    meal: MealType,
    isFavorite?: boolean,
    favoritesPage?: boolean,
    updateAfterSaveFavorite: (mealId: number) => void
}

const Meal: React.FC<MealProps> = ({ meal, isFavorite, favoritesPage, updateAfterSaveFavorite }) => {
    const currentUser = jwtDecode<User>(localStorage.getItem('token') || "").id
    const [expanded, setExpanded] = useState(false)
    const [currMeal, setCurrMeal] = useState(meal)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [favorite, setFavorite] = useState(isFavorite)
    const navigate = useNavigate();
    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const handleClickIWant = () => {
        MealServer.updateMealRating(currMeal.id!)
        navigate('/MealPage', { state: { meal: currMeal } });
    }

    const handleSwitch = async (selectedDish: DishType) => {
        const newMeal: MealType = {
            mainDish: selectedDish.isMain ? selectedDish : currMeal.mainDish,
            sideDish: selectedDish.isMain ? currMeal.sideDish : selectedDish,
            rating: 0
        }

        const createdMeal = await MealServer.createMeal(newMeal)

        if (createdMeal.data) {
            setCurrMeal(createdMeal.data)
            setFavorite(false)
        } else {
            setOpenSnackbar(true)
        }
    }

    const handleFavorite = async () => {
        // if already in favorites remove meal
        if (favorite) {
            UserFavoriteServer.deleteUserFavorite(currentUser!, currMeal.id!)
        } else {
            const newUserFavorite: UserFavoriteType = {
                userId: currentUser!,
                mealId: currMeal.id!
            }

            UserFavoriteServer.createUserFavorite(newUserFavorite)
        }

        updateAfterSaveFavorite(currMeal.id!)
        setFavorite(!favorite)
    }

    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        setOpenSnackbar(false)
    }

    return (
        <>
            <Card sx={{ marginTop: "1em" }}>
                <CardHeader
                    action={
                        <IconButton onClick={handleFavorite}>
                            {favorite ? <Star style={{ color: "#faaf00" }} /> : <StarOutline />}
                        </IconButton>
                    }
                    title={
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Dish dish={currMeal.mainDish} favoritesPage={favoritesPage} handleSwitch={handleSwitch} />
                            </Grid>
                            <Grid item xs={6}>
                                <Dish dish={currMeal.sideDish} favoritesPage={favoritesPage} handleSwitch={handleSwitch} />
                            </Grid>
                        </Grid>
                    }
                />
                <CardActions>
                    <IconButton
                        onClick={handleExpandClick}
                        sx={{ marginLeft: "auto", transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)' }}
                    >
                        <ExpandMore />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardHeader
                        action={
                            <Button onClick={handleClickIWant} variant="contained" sx={{ marginTop: "1em" }}>
                                I want this meal
                            </Button>
                        }
                        title={
                            <>
                                <Typography>{currMeal.mainDish.description}</Typography>
                                <Typography>{currMeal.sideDish.description}</Typography>
                            </>
                        }
                    />
                </Collapse>
            </Card>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    Meal already exists
                </Alert>
            </Snackbar>
        </>
    )
}

export default Meal