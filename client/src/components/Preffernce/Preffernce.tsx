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
  const [mealCategoriesSign, setMealCategoriesSign] = useState<MealCategory[]>([]);
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

const extractValue = (value:string) => 
{
  let valueSub
  if(value.indexOf('N') >= 0){
    valueSub = value.substring(0,value.length - 1);
    return valueSub
  }
  return value;
}
const 
handleValueChange = (field: keyof(UserPreferences),idSelect:number = -1) => (event: React.SyntheticEvent<Element, Event>,value:any) => {
  event.preventDefault();
  let booleanValue = value;
  
  if(field == 'mealCategories' && userPreffernce.mealCategories)
  {
    let mealCatPref:MealCategory = {id:-1,description:""};
    mealCatPref.id = idSelect;
    value = userPreffernce.mealCategories;
    if(booleanValue == "true")
    {
      value.push(mealCatPref);
    }
    else if(value.findIndex((v:any) => { return v.id != idSelect } ) >= 0)
    {
       value = value.filter((val:any) => { return val.id != idSelect})
    }
  }

  setUserPreffernce(prev => ({
      ...prev,
      [field]: value
  }))
}       
const handleSave = async () => {
  UserPreferenceServer.updateUserPreference(userPreffernce);

}
const noValue = (idValue:number) =>
{
    return idValue * -1;
}

const returnValue = (idFind:number) => 
{
  console.log(userPreffernce.mealCategories)
  let booleanValue =  userPreffernce.mealCategories.findIndex((prefMealCat) => {return prefMealCat.id == idFind}) >= 0;
  return booleanValue;
}
const getOptionsListCuisines = () => {
  let currentCuisinesList = cuisines;
  userPreffernce?.cuisines.forEach((prefCuis) =>
  {
    currentCuisinesList = currentCuisinesList.filter((cuis) => {return cuis.id != prefCuis.id});
  })
  return currentCuisinesList;
}

const getOptionsListDishes = () => {
  let currentCuisinesList = dishCategories;
  userPreffernce?.dishCategories.forEach((prefCuis) =>
  {
    currentCuisinesList = currentCuisinesList.filter((cuis) => {return cuis.id != prefCuis.id});
  })
  return currentCuisinesList;
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
        options={getOptionsListCuisines()}
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
        options={getOptionsListDishes()}
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
        onChange={handleValueChange("mealCategories",mealCategory.id)}
        value={returnValue(mealCategory.id)}
        // userPreffernce.mealCategories[mealCategory.id]}
        // defaultValue={mealCategory.id}
      >
        <FormControlLabel value="false"  control={<Radio />} label="No" />
        <FormControlLabel  value="true"  control={<Radio />} label="Yes" />
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