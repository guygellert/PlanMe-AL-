import React from "react"
import Swal from 'sweetalert2'
import { Button,CardHeader,Card,CardContent,CardActions,Autocomplete,TextField,RadioGroup,Radio,FormControlLabel,FormControl,FormLabel,Grid, CircularProgress  } from '@mui/material'
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
import { useQuery, useQueryClient } from "react-query"
import { Updater } from "react-query/types/core/utils"


const Preffernce = () => {
  const queryClient = useQueryClient();

  const currentUser = jwtDecode<User>(localStorage.getItem('token')|| "");

  const { 
    isLoading: isLoadingCuisines,
    data: cuisines
  } = useQuery<Cuisine[]>('cuisines-preferencePage', cuisineServer.getCuisines);

  const { 
    isLoading: isLoadingMealCategories,
    data: mealCategories
  } = useQuery<MealCategory[]>('mealCategories-preferencePage', mealCategoryServer.getMealCategory);

  const { 
    isLoading: isLoadingDishCategories,
    data: dishCategories
  } = useQuery<DishCategory[]>('dishCategories-preferencePage', dishCategoryServer.getDishCategory);

  const { 
    isLoading: isLoadingUserPreffernce,
    data: userPreffernce
  } = useQuery<UserPreferences>('userPreffernce-preferencePage', () => UserPreferenceServer.getUserPreference(currentUser.id!));

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
  if(field == 'mealCategories')
  {
    let mealCatPref:MealCategory = {id:-1,description:""};
    mealCatPref.id = idSelect;
    value = [];
    if(Array.isArray(userPreffernce.mealCategories)){
      value = userPreffernce.mealCategories;
    }
    console.log(value)
    if(booleanValue == "true")
    {
      value.push(mealCatPref);
    }
    else 
    // if(value.findIndex((v:any) => { return v.id !== idSelect } ) >= 0)
    {
       value = value.filter((val:any) => { return val.id !== idSelect})
    }
  }

  console.log(userPreffernce)
  queryClient.setQueryData<Updater<UserPreferences, UserPreferences>>('userPreffernce-preferencePage', (prev: UserPreferences) => {
    return ({ ...prev, [field]: value})
  });
  
}       
const handleSave = async () => {
  UserPreferenceServer.updateUserPreference(userPreffernce!).then(() => Swal.fire(
    'Preferences has been updated successfuly!',
    'Thanks for the update!',
    'success'
  ));

}
const noValue = (idValue:number) =>
{
    return idValue * -1;
}

const returnValue = (idFind:number) => 
{
  if(userPreffernce && Array.isArray(userPreffernce.mealCategories)){
  let booleanValue = userPreffernce.mealCategories.findIndex((prefMealCat) => {return prefMealCat.id == idFind}) >= 0;
  return booleanValue;
  }
  return false;
}
const getOptionsListCuisines = () => {
  let currentCuisinesList = cuisines;
  // if(userPreffernce instanceof Object == false){
  //   return []
  // }
  userPreffernce?.cuisines?.forEach((prefCuis) =>
  {
    currentCuisinesList = currentCuisinesList?.filter((cuis) => {return cuis.id !== prefCuis.id});
  })
  return currentCuisinesList;
}

const getOptionsListDishes = () => {
  let currentCuisinesList = dishCategories;
  userPreffernce?.dishCategories?.forEach((prefCuis) =>
  {
    currentCuisinesList = currentCuisinesList.filter((cuis) => {return cuis.id !== prefCuis.id});
  })
  return currentCuisinesList;
}

  return (
      <Grid container justifyContent="center" spacing={2} sx={{ marginTop: "7em" }}>
          <Grid item xs={4}>
      <Card>
        <CardHeader style={{ textAlign: 'center' }} title="Preference Page"></CardHeader>
        <CardContent>
          { 
          isLoadingCuisines || isLoadingDishCategories || isLoadingMealCategories || isLoadingUserPreffernce ?
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <CircularProgress />
            </div> 
          :
            <>
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
                  placeholder="Favorite cuisines"
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
                  placeholder="Dishes types"
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
            </>
}
      </CardContent>
      <CardActions>
        <Button onClick={handleSave} variant="contained" color="secondary" sx={{ width: "100%" }} >Save</Button>
      </CardActions>
    </Card>
  </Grid>
  </Grid>
  )
}

export default Preffernce;