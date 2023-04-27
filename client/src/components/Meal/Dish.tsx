import React from "react"
import { Card, CardHeader, CardMedia, IconButton } from "@mui/material"
import { MoreVert } from "@mui/icons-material"
import { DishType } from "../../types/dish"

interface DishProps {
    dish: DishType
}

const Dish: React.FC<DishProps> = ({ dish }) => {

    return (
        <Card>
            <CardHeader
                action={
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                }
                title={dish.name}
            />
            <CardMedia
                component="img"
                height="150vh"
                image={dish.photo}
            />
        </Card>
    )
}

export default Dish