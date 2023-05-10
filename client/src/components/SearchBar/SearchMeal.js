import { useState,useEffect } from "react";
import SearchBar from "./SearchBar";
import Filter from "../../utils/filter"
import Meal from "../Meal/Meal";
import { Grid } from "@mui/material";
import mealServer from "../../serverAPI/meal"
// import { MealType } from "../../models/Meal";
// import MealServer from "../../serverAPI/meal";
const SearchMeal = () => {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    mealServer.getTopMeal().then((mealData) =>{
      if(Array.isArray(mealData)){
        setMeals(mealData);
      }
   });
  })
  const [searchQuery, setSearchQuery] = useState("");
  const dataFiltered = Filter.filterData(searchQuery, meals,["mainDish","sideDish"], ["name"]);
  // MealServer.getMealBySearch(searchQuery);

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