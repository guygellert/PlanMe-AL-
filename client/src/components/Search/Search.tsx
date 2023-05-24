import { useState } from "react";
import {Search as SearchIcon} from '@mui/icons-material';
import {TextField,IconButton, Grid} from "@mui/material";
import SpeechButton from './SpeechButton';
import "./SearchBar.css";
import MealServer from "../../serverAPI/meal";
import { Meal as MealType } from "../../models/Meal-type";
import { resourceLimits } from "worker_threads";
import Meal from "../Meal/Meal";

interface MealResult extends MealType {
    priorityRate: number;
}

const Search: React.FC = () => { 
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState<MealResult[]>([])

  const extentiveSearch = async () => {
    const meals = await MealServer.getMealBySearch(searchQuery);
    setResult(meals);
  }
    return (
    <><form className="centerForm">
        <div className="inputRounded">
          <TextField
            id="search-bar"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            } }
            label="Search For A Meal"
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={searchQuery} />
        </div>
        <IconButton onClick={(e) => {
            e.preventDefault();
            extentiveSearch()}} type="submit" aria-label="search">
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
        <SpeechButton setSearchQuery={setSearchQuery}></SpeechButton>
      </form>
      <Grid container>
        {result && result.length > 0 &&
        <h2>Search results:</h2>
        &&
        result.map((meal) => {
                const mealtype: MealType = {
                    id: meal.id,
                    mainDish:meal.mainDish,
                    sideDish:meal.sideDish, 
                    rating: meal.rating
                }
                return (
                    <Grid item xs={4}>
            <Meal meal={mealtype} />
        </Grid>)})}
    </Grid>
      </>
  )
    }
    export default Search;