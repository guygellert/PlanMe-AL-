import React, { useEffect, useState } from "react"
import { Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"
import { Dish as DishType } from "../../models/Dish"
import DishServer from "../../serverAPI/dish"

interface DishDialogProps {
    openDialog: boolean,
    dish: DishType,
    handleCloseDialog: () => void
}

const DishDialog: React.FC<DishDialogProps> = ({ openDialog, dish, handleCloseDialog }) => {
    const [dishes, setDishes] = useState<DishType[]>([])

    useEffect(() => {
        const getData = async () => {
            const dishes = await DishServer.getDishesByType(dish.isMain)

            dishes.data && setDishes(dishes.data.filter((curr: DishType) => curr.id !== dish.id))
        }

        getData()
    }, [])

    return (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
            <DialogTitle>Switch dish</DialogTitle>
            <List sx={{ pt: 0 }}>
                {dishes.map(dish => (
                    <ListItem key={dish.id} disableGutters>
                        <ListItemButton key={dish.id} onClick={() => { }}>
                            <ListItemAvatar>
                                <Avatar src={dish.photo} />
                            </ListItemAvatar>
                            <ListItemText primary={dish.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    )
}

export default DishDialog