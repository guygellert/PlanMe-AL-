import React, { useState } from "react"
import { Button, Card, CardActions, CardHeader, Collapse, Grid, IconButton, Typography } from "@mui/material"
import { ExpandMore, StarOutline } from "@mui/icons-material"
import Dish from "./Dish"
import { MealType } from "../../types/meal"

interface MealProps {
    meal: MealType
}

const Meal: React.FC<MealProps> = ({ meal }) => {
    const [expanded, setExpanded] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    return (
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
                            <Dish dish={meal.mainDish} />
                        </Grid>
                        <Grid item xs={6}>
                            <Dish dish={meal.sideDish} />
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
                        <Button variant="contained" sx={{ marginTop: "1em" }}>
                            I want this meal
                        </Button>
                    }
                    title={
                        <>
                            <Typography>{meal.mainDish.description}</Typography>
                            <Typography>{meal.sideDish.description}</Typography>
                        </>
                    }
                />
            </Collapse>
        </Card>
    )
}

export default Meal