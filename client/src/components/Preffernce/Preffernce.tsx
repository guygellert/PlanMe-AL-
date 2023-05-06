// import React from "react"
import React, { useState,useEffect } from "react"
import { Button,CardHeader,Card,CardContent,CardActions,Autocomplete,Chip,TextField,RadioGroup,Radio,FormControlLabel,FormControl,FormLabel,Grid  } from '@mui/material'
import cuisineServer from "../../serverAPI/cuisine"
import mealCategoryServer from "../../serverAPI/mealCategory"
import dishCategoryServer from "../../serverAPI/dishCategory"
import UserPreferenceServer from "../../serverAPI/userPreference"
const Preffernce = () => {
  
  const [cuisines, setCuisines] = useState([]);
  const [mealCategories, setMealCategories] = useState([]);
  const [dishCategories, setDishCategories] = useState([]);
  useEffect(() => {
    cuisineServer.getCuisines().then((cuisinesData) =>{
      if(Array.isArray(cuisinesData)){
        setCuisines(cuisinesData);
      }
   });

   mealCategoryServer.getMealCategory().then((mealCategoriesData) =>{
    if(Array.isArray(mealCategoriesData)){
      setMealCategories(mealCategoriesData);
    }
  });
  dishCategoryServer.getDishCategory().then((dishCategoriesData) =>{
    if(Array.isArray(dishCategoriesData)){
      setDishCategories(dishCategoriesData)
    }
    
  })

  UserPreferenceServer.getUserPreference().then((UserPreferenceData) => {
    console.log(UserPreferenceData)
  })
   
}, []);       
const handleSave = async () => {

}
    return (
        <Grid container justifyContent="center" spacing={2} sx={{ marginTop: "7em" }}>
            <Grid item xs={4}>
        <Card>
            <CardHeader style={{ textAlign: 'center' }} title="Preffernce Page"></CardHeader>
            <CardContent>
            <Autocomplete
        multiple
        id="tags-outlined"
        options={cuisines}
        getOptionLabel={(option) => option.description}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Favorites Dishes"
          />
        )}
      />
          <Autocomplete
        multiple
        id="tags-outlined"
        options={dishCategories}
        getOptionLabel={(option) => option.description}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Allergnic"
          />
        )}
      />
      
    <FormControl>
      {mealCategories && mealCategories.map((mealCategory) => 
          <div key={mealCategory.id}>
      <FormLabel  id="demo-row-radio-buttons-group-label">{mealCategory.description}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="no"
      >
        <FormControlLabel value="no" control={<Radio />} label="No" />
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
      </RadioGroup>
      </div>
          )}
    </FormControl>
            </CardContent>
        <CardActions >
        <Button onClick={handleSave} variant="contained" color="secondary" sx={{ width: "100%" }} >Save</Button>
        </CardActions>
        </Card>
        </Grid>
        </Grid>
    )
}

export default Preffernce