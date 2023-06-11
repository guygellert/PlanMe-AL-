import React, { useState, useEffect } from 'react';
import {Card,CardHeader,CardMedia,CardContent,CardActions,Accordion,AccordionSummary,AccordionDetails  } from '@mui/material';
import { Meal as MealType } from "../../models/Meal-type"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
interface MealPageProps {
    // meal: MealType,
}
const MealPage: React.FC<MealPageProps> = () => {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch('www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata')
          .then(response => response.json())
          .then(json => { 
            console.log(json)
            setData(json)})
          .catch(error => console.error(error));
      }, []);
    return (
        <>
            <Card sx={{ maxWidth: 345, marginTop:"1em"}}>
                <CardHeader title="Ayam-Percik"></CardHeader>
                <div>
                    <img src="Ayam-Percik.jpg"/>
                </div>
                {/* <CardMedia component="img" height="140" image="Ayam-Percik.jpg" title="green iguana"/> */}
            </Card>
            {/* <Accordion> */}
                    {/* <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">{data}</AccordionSummary> */}
                {/* </Accordion> */}
        </>
    )
}
export default MealPage;