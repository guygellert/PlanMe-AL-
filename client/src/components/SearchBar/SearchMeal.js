import { useState } from "react";
import SearchBar from "./SearchBar";
import Filter from "../../utils/filter"
import Meal from "../Meal/Meal";
import { Grid } from "@mui/material";

const SearchMeal = () => {
  const meals = [
    {
      id: 1,
      mainDish: { id: 1, name: "Hamburger", description: "Beef burger with vegetables", photo: "/hamburger.jpg" },
      sideDish: { id: 2, name: "Chips", description: "crispy chips", photo: "/chips.jpg" }
    },
    {
      id: 2,
      mainDish: { id: 3, name: "Schnitzel", description: "Best schnitzel", photo: "/schnitzel.jpg" },
      sideDish: { id: 4, name: "Pasta", description: "pasta with tomato sauce", photo: "/pasta.jpg" }
    },
    {
      id: 3,
      mainDish: { id: 5, name: "Meat balls", description: "Meat balls with tomato sauce", photo: "/meatBalls.jpg" },
      sideDish: { id: 6, name: "Rice", description: "white rice", photo: "/rice.jpg" }
    }
  ]

  const [searchQuery, setSearchQuery] = useState("");
  const dataFiltered = Filter.filterData(searchQuery, meals, ["name"]);
  return (
    <div
      style={{
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 20
      }}
    >
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Grid container justifyContent="center" spacing={2} sx={{ overflow: "auto", height: "85vh" }}>
        {dataFiltered.map(meal => {
          return (
            <Grid item xs={4}>
              <Meal meal={meal} />
            </Grid>
          )
        }
        )}
      </Grid>
    </div>
  )
}

export default SearchMeal