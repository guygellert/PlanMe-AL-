import React, { useState, Suspense } from "react"
import { Card, CardHeader, CardMedia, IconButton } from "@mui/material"
import { MoreVert } from "@mui/icons-material"
import { Dish as DishType } from "../../models/Dish"
const DishDialog = React.lazy(() => import("./DishDialog"))

interface DishProps {
    dish: DishType,
    handleSwitch: (selectedDish: DishType) => Promise<void>
}

const Dish: React.FC<DishProps> = ({ dish, handleSwitch }) => {
    const [openDialog, setOpenDialog] = useState(false)

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleSwitchClick = (selectedDish: DishType) => {
        handleSwitch(selectedDish)
        handleCloseDialog()
    }

    return (
        <>
            <Card>
                <CardHeader
                    action={
                        <IconButton onClick={handleOpenDialog}>
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
            {openDialog &&
                <Suspense fallback={<div>Loading</div>}>
                    <DishDialog
                        openDialog={openDialog}
                        dish={dish}
                        handleCloseDialog={handleCloseDialog}
                        handleSwitchClick={handleSwitchClick}
                    />
                </Suspense>
            }
        </>
    )
}

export default Dish