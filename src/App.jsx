const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
import './App.css'
import { useState, useEffect } from 'react'
import Dropdown from "./Components/dropdown"
import { Link } from "react-router-dom";
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {

  const [cuisineValue, setCuisineValue] = useState('American')
  const [recipes, setRecipes] = useState([''])
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [Veggie, setVeggie] = useState(false);
  const [popular, setPopular] = useState(false);
  const [price, setPrice] = useState(0)
  const [health, setHealth] = useState(0)
  const [time, setTime] = useState(0);
  let x = 0;
  let y = 0;
  let z = 0;

  useEffect(() => {
    const callAPI = async () => { 
      const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?${cuisineValue}&number=10&addRecipeNutrition=true&apiKey=${ACCESS_KEY}`
      );
      const data = await response.json();
      setRecipes(data.results)
      priceAvg()
      healthScoreAvg()
      timeAvg()
    };
    callAPI().catch(console.error);
  }, []);

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if(Veggie && popular)
    {      
      if (searchValue !== "") {
        const filteredData = recipes.filter(recipe => Object.values(recipe).some(val => typeof val === "string" && val.includes(searchValue.toLowerCase())))
        let veg = []
        filteredData.map(function(item){
          if(item.vegetarian && item.veryPopular)
            veg.push(item)
        })
        setFilteredResults(veg);
      } 
      else
      {
        const filteredData = recipes
        let veg = []
        filteredData.map(function(item){
          if(item.vegetarian && item.veryPopular)
            {veg.push(item)
              console.log(item)
            }
        })
        setFilteredResults(veg);
      }
    } 
    else if (popular)
    {
      if (searchValue !== "") {
        const filteredData = recipes.filter(recipe => Object.values(recipe).some(val => typeof val === "string" && val.includes(searchValue.toLowerCase())))
        let veg = []
        console.log(filteredData)
        filteredData.map(function(item){
          if(item.veryPopular)
          {
            veg.push(item)
            console.log(item)
          }
        })
        setFilteredResults(veg);
      } 
      else
      {
        const filteredData = recipes
        let veg = []
        filteredData.map(function(item){
          if(item.veryPopular)
            {
              veg.push(item)
              console.log(item)
            }
        })
        setFilteredResults(veg);
      }
    } 
    else if (Veggie)
    {
      if (searchValue !== "") {
        const filteredData = recipes.filter(recipe => Object.values(recipe).some(val => typeof val === "string" && val.includes(searchValue.toLowerCase())))
        let veg = []
        filteredData.map(function(item){
          if(item.vegetarian)
            veg.push(item)
        })
        setFilteredResults(veg);
      } 
      else
      {
        const filteredData = recipes
        let veg = []
        filteredData.map(function(item){
          if(item.vegetarian)
            {veg.push(item)
            }
        })
        setFilteredResults(veg);
      }
    }
    else {
      if (searchValue !== "") {
        const filteredData = recipes.filter(recipe => Object.values(recipe).some(val => typeof val === "string" && val.includes(searchValue.toLowerCase())))
        setFilteredResults(filteredData);
      } 
      else
        setFilteredResults(Object.keys(recipes));
    }
  };


  const Vegan = () => {
    setVeggie(!Veggie)
  };

  const Pop = () => {
    setPopular(!popular)
  };


  const priceAvg = () => {
    recipes.map(function(item) {
        x+= item.pricePerServing
    })
    setPrice(x/10)
}
const healthScoreAvg = () => {
    recipes.map(function(item) {
        y+= item.healthScore
    })
    setHealth(y/10)
}
const timeAvg = () => {
    recipes.map(function(item) {
        z+= item.readyInMinutes
    })
    setTime(z/10)
}

const cleanData = () => {
  let chartData = []
  recipes.map(function(item) {
    chartData.push({
      'name' : item.title,
      'score':  item.healthScore
    });
  })

  return chartData;
}
  return (
    <>
    <h1>Hello</h1>
    <div>
      <Dropdown state={cuisineValue} setState={setCuisineValue}/>
    </div>
    <div>
        <div>Average Price of all recipes: ${price}</div>
        <div>Average Health Score of all recipes: {health} / 100 </div>
        <div>Average Time of all recipes: {time} minutes </div>
    </div>
    <input
      type="text"
      placeholder="Search..."
     onChange={(inputString) => searchItems(inputString.target.value)}
    />
    <div>
      Click to toggle between vegetarian options only or mixed
      <button onClick={Vegan}>Click here!</button>
    </div>
    <div>
      Click to toggle between showing Popular options only or All options
      <button onClick={Pop}>Click here!</button>
    </div>
        <LineChart
          width={500}
          height={300}
          data={cleanData()}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" stroke="#82ca9d" />
        </LineChart>
{searchInput.length > 0 || Veggie == true || popular == true
  ? filteredResults.map(function(data) {
    return (
      <>
      <img src={data.image} />
      <Link
        to={`/RecipeDetail/${data.id}`}
        key= {data.id}>
          
        <div>{data.title}</div>
        {data.vegetarian? <div>This Dish is Vegentarian!</div> : <div>This Dish is not Vegentarian!</div>}
        {data.veryPopular? <div> This Dish is Popular!</div> : <div> This Dish is not Popular D:</div>}
      </Link>
      </>
    )
  }) :
    recipes.map(function(data) {
      return (
        <>
        <img src={data.image} />
        <Link
          to={`/RecipeDetail/${data.id}`}
          key= {data.id}>
            
          <div>{data.title}</div>
          {data.vegetarian? <div>This Dish is Vegentarian!</div> : <div>This Dish is not Vegentarian!</div>}
          {data.veryPopular? <div> This Dish is Popular!</div> : <div> This Dish is not Popular D:</div>}
        </Link>
        </>
      )
    })
  }
    </>
  )
}

export default App
