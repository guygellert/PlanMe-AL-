import React, { useEffect, useState } from "react"
import { Avatar, Button, Dialog, DialogActions, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"
import { Dish as DishType } from "../../models/Dish"
import DishServer from "../../serverAPI/dish"
import { useTheme } from '@mui/material/styles'

interface DishDialogProps {
    openDialog: boolean,
    dish: DishType,
    handleCloseDialog: () => void,
    handleSwitchClick: (selectedDish: DishType) => void
}

const DishDialog: React.FC<DishDialogProps> = ({ openDialog, dish, handleCloseDialog, handleSwitchClick }) => {
    const theme = useTheme()
    const [dishes, setDishes] = useState<DishType[]>([])
    const [selectedDish, setSelectedDish] = useState<DishType>()

    useEffect(() => {
        const getData = async () => {
            const dishes = await DishServer.getDishesByType(dish.isMain)

            dishes.data && setDishes(dishes.data.filter((curr: DishType) => curr.id !== dish.id))
        }

        getData()
    }, [])

    const handleListItemClick = (value: DishType) => {
        setSelectedDish(value)
    }

    return (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
            <DialogTitle>Switch dish</DialogTitle>
            <List sx={{ pt: 0 }}>
                {dishes.map(dish => (
                    <ListItem key={dish.id} disableGutters
                        sx={{ backgroundColor: selectedDish?.id === dish.id ? theme.palette.primary.light : "white" }}>
                        <ListItemButton key={dish.id} onClick={() => handleListItemClick(dish)}>
                            <ListItemAvatar>
                                <Avatar src={dish.photo} />
                            </ListItemAvatar>
                            <ListItemText primary={dish.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {selectedDish &&
                <DialogActions>
                    <Button variant="contained" onClick={() => handleSwitchClick(selectedDish)}>Switch</Button>
                </DialogActions>
            }
        </Dialog>
    )
}

export default DishDialog