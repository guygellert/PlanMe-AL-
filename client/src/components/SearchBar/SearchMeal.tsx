import { useState,useEffect } from "react";
import SearchBar from "./SearchBar";
import Filter from "../../utils/filter"
import { Meal as MealType } from "../../models/Meal-type";
import { Grid } from "@mui/material";
import mealServer from "../../serverAPI/meal"
import MealServer from "../../serverAPI/meal";
import Meal from "../Meal/Meal";

const SearchMeal = () => {
  const [meals, setMeals] = useState<MealType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dataFiltered = Filter.filterData(searchQuery, meals,["mainDish","sideDish"], ["name"]);

  useEffect(() => {
    mealServer.getTopMeal().then((mealData:MealType[]) =>{
        setMeals(mealData);
   });
  }, [])

  const extentiveSearch = async () => {
    const meals = await MealServer.getMealBySearch(searchQuery);
    console.log(meals)
  }

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
      <SearchBar  />
      <Grid container justifyContent="center" spacing={2} sx={{ overflow: "auto", height: "85vh" }}>
        {dataFiltered.map((meal:MealType) => {
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