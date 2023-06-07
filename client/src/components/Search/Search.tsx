import { useState } from "react";
import {Search as SearchIcon} from '@mui/icons-material';
import {TextField,IconButton, Grid, Card, CardMedia} from "@mui/material";
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
    <>
      <Card>
        <div style={{ position: "relative" }}> 
          <CardMedia  style={{ height: "250px", paddingTop: "2%" }} component="img" image="https://westcoastfood.ca/wp-content/uploads/2023/01/pexels-alberta-studios-10480246-scaled.jpg" title="Pancakes" alt="Pancakes"/> 
        <div style={{position: "absolute", color: "white",top: "50%",left: "50%",transform: "translateX(-50%)",}}>
          <form className="centerForm">
              <div className="inputRounded">
                <TextField
                  className="textFieldClass"
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
                <SearchIcon style={{ fill: "white" }} />
              </IconButton>
              <SpeechButton setSearchQuery={setSearchQuery}></SpeechButton>
            </form>
      </div>
      </div>
      </Card>
      <Grid container>
        {result && 
        result.length > 0
         &&
         <>
        {result.map((meal) => {
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
        </>}
    </Grid>
      </>
  )
    }
    export default Search;