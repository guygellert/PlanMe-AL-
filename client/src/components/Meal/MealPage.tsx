import React, { useState, useEffect } from 'react';
import {Card,Checkbox,CardHeader,CardMedia,CardContent,Divider,Grid,Typography,Accordion,AccordionSummary,AccordionDetails,FormGroup,FormControlLabel  } from '@mui/material';
import { Meal as MealType } from "../../models/Meal-type"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MealServer from '../../serverAPI/meal';
import {useLocation} from 'react-router-dom';
import "./MealPage.css"
interface MealRecepie {
dateModified: string
idMeal: 
string
strArea
: 
string
strCategory
: 
string
strCreativeCommonsConfirmed
: 
string
strDrinkAlternate
: 
string
strImageSource
: 
string
strIngredient1
: 
string
strIngredient2
: 
string
strIngredient3
: 
string
strIngredient4
: 
string
strIngredient5
: 
string
strIngredient6
: 
string
strIngredient7
: 
string
strIngredient8
: 
string
strIngredient9
: 
string
strIngredient10
: 
string
strIngredient11
: 
string
strIngredient12
: 
string
strIngredient13
: 
string
strIngredient14
: 
string
strIngredient15
: 
string
strIngredient16
: 
string
strIngredient17
: 
string
strIngredient18
: 
string
strIngredient19
: 
string
strIngredient20
: 
string
strInstructions
: 
string
strMeal
: 
string
strMealThumb
: 
string
strMeasure1
: 
string
strMeasure2
: 
string
strMeasure3
: 
string
strMeasure4
: 
string
strMeasure5
: 
string
strMeasure6
: 
string
strMeasure7
: 
string
strMeasure8
: 
string
strMeasure9
: 
string
strMeasure10
: 
string
strMeasure11
: 
string
strMeasure12
: 
string
strMeasure13
: 
string
strMeasure14
: 
string
strMeasure15
: 
string
strMeasure16
: 
string
strMeasure17:string
strMeasure18:string
strMeasure19:string
strMeasure20:string
strSource:string
strTags:string
strYoutube:string 
}
// interface MealPageProps {
    // meal:MealType;
// }
const MealPage: React.FC = () => {
    const [data, setData] = useState<MealRecepie[]>([]);
    const [dataSide, setDataSide] = useState<MealRecepie[]>([]);
    const location = useLocation();
    const mainDish = location.state.meal.mainDish;
    const sideDish = location.state.meal.sideDish;
    useEffect(() => {
        console.log(location.state)
        let mealNameMainDish = mainDish.name.split("-").join(" ");
        let mealNameSideDish = sideDish.name.split("-").join(" ");
        MealServer.getRecepies(mealNameMainDish).then((recepiesData)=>{
            
            if(Array.isArray(recepiesData)){
            recepiesData.map((rec:MealRecepie) => {rec.strYoutube = rec.strYoutube.replace("https://www.youtube.com/watch?v=","https://www.youtube.com/embed/")
            return rec});
                setData(recepiesData)
            }
        })
        MealServer.getRecepies(mealNameSideDish).then((recepiesDataSide)=>{
            
            if(Array.isArray(recepiesDataSide)){
            recepiesDataSide.map((rec:MealRecepie) => {rec.strYoutube = rec.strYoutube.replace("https://www.youtube.com/watch?v=","https://www.youtube.com/embed/")
            return rec});
                setDataSide(recepiesDataSide)
            }
        })
      }, []);
    return (
        <div className="backgroundPage">
        <Grid container spacing={1}>
            {/* <div className="centerizeItem"> */}
            <Grid item xs={6}>
                <Card >
                    <CardHeader title={mainDish.name}></CardHeader>
                    <div>
                    <CardMedia component="img" height="150vh" image={mainDish.photo}/>
                    </div>
                </Card>
                
            {Array.isArray(data) && data.length > 0 && data.map((recepieInfo) => 
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">{recepieInfo.strMeal}</AccordionSummary>
                <AccordionDetails>
                <div className="centerizeItem">
                <h1>Tutorial Video</h1>
                    <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope;picture-in-picture" title={recepieInfo.strArea} allowFullScreen src={recepieInfo.strYoutube}></iframe>
                </div>
                <Divider></Divider>
                <div className="centerizeItem">
                    <h1>Ingredient</h1>
                </div>
                    <FormGroup>
                        {recepieInfo.strIngredient1 != null && recepieInfo.strIngredient1.length > 0 && <FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient1 + ' - ' + recepieInfo.strMeasure1}></FormControlLabel>}
                        {recepieInfo.strIngredient2 != null && recepieInfo.strIngredient2.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient2 + ' - ' + recepieInfo.strMeasure2}></FormControlLabel>}
                        {recepieInfo.strIngredient3 != null && recepieInfo.strIngredient3.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient3 + ' - ' + recepieInfo.strMeasure3}></FormControlLabel>}
                        {recepieInfo.strIngredient4 != null && recepieInfo.strIngredient4.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient4 + ' - ' + recepieInfo.strMeasure4}></FormControlLabel>}
                        {recepieInfo.strIngredient5 != null && recepieInfo.strIngredient5.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient5 + ' - ' + recepieInfo.strMeasure5}></FormControlLabel>}
                        {recepieInfo.strIngredient6 != null && recepieInfo.strIngredient6.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient6 + ' - ' + recepieInfo.strMeasure6}></FormControlLabel>}
                        {recepieInfo.strIngredient7 != null && recepieInfo.strIngredient7.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient7 + ' - ' + recepieInfo.strMeasure7}></FormControlLabel>}
                        {recepieInfo.strIngredient8 != null && recepieInfo.strIngredient8.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient8 + ' - ' + recepieInfo.strMeasure8}></FormControlLabel>}
                        {recepieInfo.strIngredient9 != null && recepieInfo.strIngredient9.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient9 + ' - ' + recepieInfo.strMeasure9}></FormControlLabel>}
                        {recepieInfo.strIngredient10 != null && recepieInfo.strIngredient10.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient10 + ' - ' + recepieInfo.strMeasure10}></FormControlLabel>}
                        {recepieInfo.strIngredient11 != null && recepieInfo.strIngredient11.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient11 + ' - ' + recepieInfo.strMeasure11}></FormControlLabel>}
                        {recepieInfo.strIngredient12 != null && recepieInfo.strIngredient12.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient12 + ' - ' + recepieInfo.strMeasure12}></FormControlLabel>}
                        {recepieInfo.strIngredient13 != null && recepieInfo.strIngredient13.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient13 + ' - ' + recepieInfo.strMeasure13}></FormControlLabel>}
                        {recepieInfo.strIngredient14 != null && recepieInfo.strIngredient14.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient14 + ' - ' + recepieInfo.strMeasure14}></FormControlLabel>}
                        {recepieInfo.strIngredient15 != null && recepieInfo.strIngredient15.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient15 + ' - ' + recepieInfo.strMeasure15}></FormControlLabel>}
                        {recepieInfo.strIngredient16 != null && recepieInfo.strIngredient16.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient16 + ' - ' + recepieInfo.strMeasure16}></FormControlLabel>}
                        {recepieInfo.strIngredient17 != null && recepieInfo.strIngredient17.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient17 + ' - ' + recepieInfo.strMeasure17}></FormControlLabel>}
                        {recepieInfo.strIngredient18 != null && recepieInfo.strIngredient18.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient18 + ' - ' + recepieInfo.strMeasure18}></FormControlLabel>}
                        {recepieInfo.strIngredient19 != null && recepieInfo.strIngredient19.length > 0 && <FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient19 + ' - ' + recepieInfo.strMeasure19}></FormControlLabel>}
                        {recepieInfo.strIngredient20 != null && recepieInfo.strIngredient20.length > 0 && <FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient20 + ' - ' + recepieInfo.strMeasure20}></FormControlLabel>}
                    
                    </FormGroup>
                    <Divider></Divider>
                    <div className="centerizeItem">
                    <h1>Making Order</h1>
                    </div>
                    {recepieInfo.strInstructions.split(".").map((instruct) =>{if(instruct.length > 0) return(
                    <div>
                    <FormControlLabel control={<Checkbox/>} label={instruct}></FormControlLabel>
                    </div>
                    // <Typography></Typography>
            )})    
                }
               </AccordionDetails>
            </Accordion>
            )
            }
            </Grid>
            <Grid item xs={6}>
            <Card >
                    <CardHeader title={sideDish.name}></CardHeader>
                    <div>
                    <CardMedia component="img" height="150vh" image={sideDish.photo}/>
                        {/* <img src={mainDish.photo}/> */}
                    </div>
                    {/* <CardMedia component="img" height="140" image="Ayam-Percik.jpg" title="green iguana"/> */}
                </Card>
                
            {Array.isArray(dataSide) && dataSide.length > 0 && dataSide.map((recepieInfo) => 
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">{recepieInfo.strMeal}</AccordionSummary>
                <AccordionDetails>
                    <div className="centerizeItem">
                <h1>Tutorial Video</h1>
                    <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope;picture-in-picture" title={recepieInfo.strArea} allowFullScreen src={recepieInfo.strYoutube}></iframe>
                    </div>
                    <Divider></Divider>
                    <div className="centerizeItem">
                    <h1>Ingredient</h1>
                    </div>
                    <FormGroup>
                        {recepieInfo.strIngredient1 != null && recepieInfo.strIngredient1.length > 0 && <FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient1 + ' - ' + recepieInfo.strMeasure1}></FormControlLabel>}
                        {recepieInfo.strIngredient2 != null && recepieInfo.strIngredient2.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient2 + ' - ' + recepieInfo.strMeasure2}></FormControlLabel>}
                        {recepieInfo.strIngredient3 != null && recepieInfo.strIngredient3.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient3 + ' - ' + recepieInfo.strMeasure3}></FormControlLabel>}
                        {recepieInfo.strIngredient4 != null &&recepieInfo.strIngredient4.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient4 + ' - ' + recepieInfo.strMeasure4}></FormControlLabel>}
                        {recepieInfo.strIngredient5 != null && recepieInfo.strIngredient5.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient5 + ' - ' + recepieInfo.strMeasure5}></FormControlLabel>}
                        {recepieInfo.strIngredient6 != null && recepieInfo.strIngredient6.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient6 + ' - ' + recepieInfo.strMeasure6}></FormControlLabel>}
                        {recepieInfo.strIngredient7 != null && recepieInfo.strIngredient7.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient7 + ' - ' + recepieInfo.strMeasure7}></FormControlLabel>}
                        {recepieInfo.strIngredient8 != null && recepieInfo.strIngredient8.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient8 + ' - ' + recepieInfo.strMeasure8}></FormControlLabel>}
                        {recepieInfo.strIngredient9 != null && recepieInfo.strIngredient9.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient9 + ' - ' + recepieInfo.strMeasure9}></FormControlLabel>}
                        {recepieInfo.strIngredient10 != null && recepieInfo.strIngredient10.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient10 + ' - ' + recepieInfo.strMeasure10}></FormControlLabel>}
                        {recepieInfo.strIngredient11 != null && recepieInfo.strIngredient11.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient11 + ' - ' + recepieInfo.strMeasure11}></FormControlLabel>}
                        {recepieInfo.strIngredient12 != null && recepieInfo.strIngredient12.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient12 + ' - ' + recepieInfo.strMeasure12}></FormControlLabel>}
                        {recepieInfo.strIngredient13 != null && recepieInfo.strIngredient13.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient13 + ' - ' + recepieInfo.strMeasure13}></FormControlLabel>}
                        {recepieInfo.strIngredient14 != null && recepieInfo.strIngredient14.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient14 + ' - ' + recepieInfo.strMeasure14}></FormControlLabel>}
                        {recepieInfo.strIngredient15 != null && recepieInfo.strIngredient15.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient15 + ' - ' + recepieInfo.strMeasure15}></FormControlLabel>}
                        {recepieInfo.strIngredient16 != null && recepieInfo.strIngredient16.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient16 + ' - ' + recepieInfo.strMeasure16}></FormControlLabel>}
                        {recepieInfo.strIngredient17 != null && recepieInfo.strIngredient17.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient17 + ' - ' + recepieInfo.strMeasure17}></FormControlLabel>}
                        {recepieInfo.strIngredient18 != null && recepieInfo.strIngredient18.length > 0 &&<FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient18 + ' - ' + recepieInfo.strMeasure18}></FormControlLabel>}
                        {recepieInfo.strIngredient19 != null && recepieInfo.strIngredient19.length > 0 && <FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient19 + ' - ' + recepieInfo.strMeasure19}></FormControlLabel>}
                        {recepieInfo.strIngredient20 != null && recepieInfo.strIngredient20.length > 0 && <FormControlLabel control={<Checkbox/>} label={recepieInfo.strIngredient20 + ' - ' + recepieInfo.strMeasure20}></FormControlLabel>}
                    
                    </FormGroup>
                    <Divider></Divider>
                    <div className="centerizeItem">
                    <h1>Making Order</h1>
                    </div>
                    {recepieInfo.strInstructions.split(".").map((instruct) =>{return(
                    <div>
                    <FormControlLabel control={<Checkbox/>} label={instruct}></FormControlLabel>
                    </div>
                    // <Typography></Typography>
            )})    
                }
                    {/* <Typography>{recepieInfo.strInstructions}</Typography> */}
               </AccordionDetails>
            </Accordion>
            )
            }   
            </Grid>
            {/* </div> */}
        </Grid>
        </div>
    )
}
export default MealPage;