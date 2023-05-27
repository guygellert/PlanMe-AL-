import React, { useState } from "react"
import { Button, Card, CardActions, CardHeader, Collapse, Grid, IconButton, Typography } from "@mui/material"
import { ExpandMore, StarOutline } from "@mui/icons-material"
import Dish from "./Dish"
import MealServer from "../../serverAPI/meal"
import { Meal as MealType } from "../../models/Meal-type"
import { Dish as DishType } from "../../models/Dish"

interface MealProps {
    meal: MealType
}

const Meal: React.FC<MealProps> = ({ meal }) => {
    const [expanded, setExpanded] = useState(false)
    const [currMeal, setCurrMeal] = useState(meal)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const handleClickIWant = () => {
        MealServer.updateMealRating(currMeal.id!)
    }

    const handleSwitch = async (selectedDish: DishType) => {
        const newMeal: MealType = {
            mainDish: selectedDish.isMain ? selectedDish : currMeal.mainDish,
            sideDish: selectedDish.isMain ? currMeal.sideDish : selectedDish,
            rating: 0
        }

        const createdMeal = await MealServer.createMeal(newMeal)

        createdMeal.data && setCurrMeal(createdMeal.data)
    }

    return (
        <>
            <Card sx={{ marginTop: "1em" }}>
                <CardHeader
                    action={
                        <IconButton>
                            <StarOutline />
                        </IconButton>
                    }
                    title={
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Dish dish={currMeal.mainDish} handleSwitch={handleSwitch} />
                            </Grid>
                            <Grid item xs={6}>
                                <Dish dish={currMeal.sideDish} handleSwitch={handleSwitch} />
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
        </>
    )
}

export default Meal