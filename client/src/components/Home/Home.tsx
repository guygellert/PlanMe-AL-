import React, { useEffect, useState } from "react"
import { Meal as MealType} from "../../models/Meal-type";
import mealServer from "../../serverAPI/meal"
import { Grid } from "@mui/material";
import Meal from "../Meal/Meal";
import Search from "../Search/Search";

const Home: React.FC = () => {
    const [topMeals, setTopMeals] = useState<MealType[]>([]);
    
    useEffect(() => {
      mealServer.getTopMeal().then((mealData) =>{
          setTopMeals(mealData);
     });
    },[])
  
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
        <Search/>
        <h2>Most loved</h2>
        <Grid container justifyContent="center" spacing={2} sx={{ overflow: "auto", height: "85vh" }}>
          {topMeals?.map(meal => {
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

export default Home