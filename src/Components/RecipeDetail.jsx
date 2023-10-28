import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const RecipeDetail = () => {

    let params = useParams();
    const [fullDetails, setFullDetails] = useState(['']);

    useEffect(() => {
        const callAPI = async () => { 
        const response = await fetch(
            `https://api.spoonacular.com/recipes/${params.id}/information?includeNutrition=false&apiKey=${ACCESS_KEY}`
        );
        const data = await response.json();
        setFullDetails(data)
        console.log(data)
        console.log(fullDetails.vegan)
        };
        callAPI().catch(console.error);
    }, []);    
    
    return (
        <>
        <h1>{fullDetails.title}</h1>
        <img src={fullDetails.image}/>
        {fullDetails.veryPopular ? <div> This Dish is Popular!</div> : <div> This Dish is not Popular D:</div>}
        {fullDetails.glutenFree ? <div> This Dish is not gluten Free!</div> : <div> This Dish is gluten Free :D</div>}
        <div>Health Score: {fullDetails.healthScore}</div>
        <div>{fullDetails.summary}</div>
        </>
    );
  };
  
  export default RecipeDetail;