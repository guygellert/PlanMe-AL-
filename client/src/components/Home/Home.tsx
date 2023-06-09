import React, { useEffect, useState } from "react"
import { Meal as MealType } from "../../models/Meal-type";
import mealServer from "../../serverAPI/meal"
import "./Home.css";
import { Grid, IconButton, Stack, Button, Card, CardMedia } from "@mui/material";
import ForwardIcon from '@mui/icons-material/ArrowForwardRounded';
import BackIcon from '@mui/icons-material/ArrowBackRounded';
import Meal from "../Meal/Meal";
import Search from "../Search/Search";
import cuisineServer from "../../serverAPI/cuisine"
import { Cuisine } from "../../models/Cuisine"
import UserFavoriteServer from "../../serverAPI/userFavorite";
import jwtDecode from "jwt-decode";
import { User } from "../../models/User";
// import { url } from "inspector";
const Home: React.FC = () => {
  const currentUser = jwtDecode<User>(localStorage.getItem('token') || "").id
  const [topMeals, setTopMeals] = useState<MealType[]>([]);
  const [activeNumber, setActiveNumber] = useState<number>(0);
  const [shownMealList, setShownMealList] = useState<MealType[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [favoriteMeals, setFavoriteMeals] = useState<Set<number>>(new Set())
  const [render, setRender] = useState<boolean>(false)

  useEffect(() => {
    const getData = async () => {
      const favoriteMeals = await UserFavoriteServer.getMeals(currentUser!)

      const mealIds = favoriteMeals.data?.map((userFavorite: any) => userFavorite.meal.id)
      favoriteMeals.data && setFavoriteMeals(new Set(mealIds))
    }

    getData()
  }, [])

  useEffect(() => {
    cuisineServer.getCuisines().then((cuisinesData) => {
      if (Array.isArray(cuisinesData)) {
        setCuisines(cuisinesData);
      }
    });
    mealServer.getTopMeal().then((mealData) => {
      setTopMeals(mealData);
      shownMeals(mealData, activeNumber);
    });
  }, [])

  const moveFowared = () => {
    setActiveNumber(activeNumber + 3);
    shownMeals(topMeals, activeNumber + 3);
  }
  const moveBack = () => {
    setActiveNumber(activeNumber - 3);
    shownMeals(topMeals, activeNumber - 3);
  }

  const showAll = () => {
    setShownMealList(topMeals)
  }

  const updateAfterSaveFavorite = (mealId: number) => {
    setFavoriteMeals(prev => {
      prev.has(mealId) ? prev.delete(mealId) : prev.add(mealId)
      return prev
    })

    reRender()
  }

  const reRender = () => {
    setRender(true)
    setTimeout(() => {
      setRender(false)
    }, 2000)
  }

  const shownMeals = (topMealList: MealType[], activeIndex: number) => {
    let showItem: MealType[] = []
    if (!Array.isArray(topMealList)) {
      return [];
    }
    topMealList?.forEach((value, index) => {
      if (index >= activeIndex && index <= activeIndex + 2) {
        showItem.push(value);
      }
    });
    setShownMealList(showItem)
    return showItem;
  }

  const shownMealsByCuisine = (topMealList: MealType[], activeIndex: number, cuisineId: number) => {
    let showItem: MealType[] = []
    let CatItem: MealType[] = []
    topMealList?.forEach((value, index) => {
      if ((value.mainDish.cuisines.id == cuisineId || value.sideDish.cuisines.id == cuisineId)) {
        CatItem.push(value);
      }
    });
    CatItem.forEach((value, index) => {
      if (index >= activeIndex && index <= activeIndex + 2) {
        showItem.push(value);
      }
    });
    return showItem;
  }
  return (
    <div
      className="backgroundPage"
      style={{
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 20
      }}
    >
      <Search />
      <h2 className="titleCuisine">Most loved</h2>
      <Stack direction="row" spacing={2}>

        <IconButton color="primary" onClick={moveBack}><BackIcon /></IconButton >
        <IconButton color="primary" onClick={moveFowared}><ForwardIcon /></IconButton>
        <Button color="primary" variant="text" onClick={showAll}>More</Button>
      </Stack>
      <Grid className="mealCardCategory" container justifyContent="center" spacing={2} sx={{ overflow: "auto", height: "85vh" }}>

        {shownMealList?.map(meal => {
          return (
            <Grid item xs={4}>
              <Meal
                meal={meal}
                key={meal.id}
                isFavorite={favoriteMeals.has(meal.id!)}
                updateAfterSaveFavorite={updateAfterSaveFavorite} />
            </Grid>
          )
        }
        )}
      </Grid>
      {cuisines?.map((cuis) => {
        return (
          <div className="sizeCardClass">
            <h2 className="titleCuisine">{cuis.description}</h2>
            <Stack direction="row" spacing={2}>
              <IconButton color="primary" onClick={moveBack}><BackIcon /></IconButton >
              <IconButton color="primary" onClick={moveFowared}><ForwardIcon /></IconButton>
            </Stack>
            <Grid className="mealCardCategory" container justifyContent="center" spacing={2} sx={{ overflow: "auto", height: "85vh" }}>
              {shownMealsByCuisine(topMeals, activeNumber, cuis.id)?.map((mealCuisine) => {
                return (

                  <Grid item xs={4}>
                    <Meal
                      meal={mealCuisine}
                      key={mealCuisine.id + "-" + cuis.id}
                      isFavorite={favoriteMeals.has(mealCuisine.id!)}
                      updateAfterSaveFavorite={updateAfterSaveFavorite} />
                  </Grid>
                )
              })}
            </Grid>
          </div>
        )
      })}
    </div>
  )
}

export default Home