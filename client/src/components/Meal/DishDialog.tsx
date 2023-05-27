import React, { useEffect, useState } from "react"
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from "@mui/material"
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
    const [filteredDishes, setFilteredDishes] = useState<DishType[]>([])
    const [selectedDish, setSelectedDish] = useState<DishType>()
    const [searchInput, setSearchInput] = useState<string>()

    useEffect(() => {
        const getData = async () => {
            const dishes = await DishServer.getDishesByType(dish.isMain)

            const filtered = dishes.data?.filter((curr: DishType) => curr.id !== dish.id)

            dishes.data && setDishes(filtered)
            dishes.data && setFilteredDishes(filtered)
        }

        getData()
    }, [])

    const handleListItemClick = (value: DishType) => {
        setSelectedDish(value)
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const filtered = dishes.filter(dish => dish.name.toLowerCase().includes(value.toLowerCase()))

        setSearchInput(value)
        setFilteredDishes(filtered)
    }

    return (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
            <DialogTitle>Switch dish</DialogTitle>
            <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
                <TextField
                    fullWidth
                    label="search dish"
                    size="small"
                    value={searchInput}
                    onChange={handleSearch}
                    sx={{ marginTop: "0.3em" }}
                />
            </DialogContent>
            <List sx={{ pt: 0, maxHeight: "50vh", overflow: "auto" }}>
                {filteredDishes.map(dish => (
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