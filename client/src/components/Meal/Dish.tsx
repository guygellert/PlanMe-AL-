import React from "react"
import { Card, CardHeader, CardMedia, IconButton } from "@mui/material"
import { MoreVert } from "@mui/icons-material"
import { Dish as DishType} from "../../models/Dish"


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