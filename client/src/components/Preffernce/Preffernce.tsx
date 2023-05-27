// import React from "react"
import React, { useState,useEffect } from "react"
import { Button,CardHeader,Card,CardContent,CardActions,Autocomplete,TextField,RadioGroup,Radio,FormControlLabel,FormControl,FormLabel,Grid  } from '@mui/material'
import cuisineServer from "../../serverAPI/cuisine"
import mealCategoryServer from "../../serverAPI/mealCategory"
import dishCategoryServer from "../../serverAPI/dishCategory"
import UserPreferenceServer from "../../serverAPI/userPreference"
import { Cuisine } from "../../models/Cuisine"

import jwtDecode from "jwt-decode"
import { User } from "../../models/User"
import { MealCategory } from "../../models/MealCategory"
import { DishCategory } from "../../models/DishCategory"
import { UserPreferences } from "../../models/UserPreferences"


const Preffernce = () => {
  const currentUser = jwtDecode<User>(localStorage.getItem('token')|| "");
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [mealCategories, setMealCategories] = useState<MealCategory[]>([]);
  const [dishCategories, setDishCategories] = useState<DishCategory[]>([]);
  const [userPreffernce, setUserPreffernce] = useState<UserPreferences>({id: 0, user: currentUser, cuisines:[], dishCategories:[], mealCategories:[]});

  useEffect(() => 
  {
    cuisineServer.getCuisines().then((cuisinesData) =>
    {
      if(Array.isArray(cuisinesData))
      {
        setCuisines(cuisinesData);
      }
      mealCategoryServer.getMealCategory().then((mealCategoriesData) =>
      {
        if(Array.isArray(mealCategoriesData))
        {
          setMealCategories(mealCategoriesData);
        }
        
        dishCategoryServer.getDishCategory().then((dishCategoriesData) =>
        {
          if(Array.isArray(dishCategoriesData))
          {
            setDishCategories(dishCategoriesData)
          }
          UserPreferenceServer.getUserPreference().then((UserPreferenceData) => 
          {
              if(!UserPreferenceData)
              {
                return;
              }
              setUserPreffernce(UserPreferenceData)
          })
        });
      });
    })
  }, []);
const 
handleValueChange = (field: keyof(UserPreferences),ind:string = "I") => (event: React.SyntheticEvent<Element, Event>,value:any) => {
  event.preventDefault();
  if(!userPreffernce)
  return;
   

  setUserPreffernce(prev => ({
      ...prev,
      [field]: value
  }))
}       
const handleSave = async () => {
  UserPreferenceServer.updateUserPreference(userPreffernce);

}

const returnValue = (idFind:number) => 
{
  if(!userPreffernce)
  return;
  let mealCat;
    mealCat = userPreffernce?.mealCategories.find((PrefMealCat) =>{
      if(PrefMealCat.id == idFind)
      {
        return PrefMealCat.id
      }
    });
    if(mealCat){
      return mealCat.id;
    }
    return "";
  
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
        value={userPreffernce?.cuisines || []}
        onChange={handleValueChange("cuisines")}
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
        value={userPreffernce?.dishCategories || []}
        onChange={handleValueChange("dishCategories")}
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
        onChange={handleValueChange("mealCategories")}
        value={returnValue(mealCategory.id)}
        // userPreffernce.mealCategories[mealCategory.id]}
        // defaultValue={mealCategory.id}
      >
        <FormControlLabel value=""  control={<Radio />} label="No" />
        <FormControlLabel  value={mealCategory.id}  control={<Radio />} label="Yes" />
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

export default Preffernce;