import React, { Fragment, useEffect } from "react";
import Items from "./../../models/items";
import Row from "./Row";
import classes from './FoodItems.module.css'

function FoodItems() {
  const [mealItems, setMealItems] = React.useState<Items[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [httpError, setHttpError] = React.useState<string>();
  useEffect(()=>{
    const fetchMeals = async()=>{
      const response = await fetch('https://food-order-app-76e5f-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
      if(!response.ok){
        throw new Error('Something went wrong!')
      }
      const responseData = await response.json();
      const loadedMeals : Items[] = [];
      for (const key in responseData){
        loadedMeals.push({id:key, imgUrl:responseData[key].imgUrl, name:responseData[key].name,price:responseData[key].price,description:responseData[key].description });
      }
      setMealItems(loadedMeals);
      setIsLoading(false)
    }
   
      fetchMeals().catch(error=>{
        setIsLoading(false);
        setHttpError("Couldn't load data!");
      });
   
   
    
  },[])

  if(isLoading){
    return <section className={classes.mealsLoading}>
      <p>Loading...</p>
    </section>
  }
  if(httpError){
    return <section className={classes.mealsLoading}>
    <p>{httpError}</p>
  </section>
  }
  return (
    <Fragment>
      <Row title="Burgers" mealItems={mealItems}/>
      <Row title="Bevorages" mealItems={mealItems}/>
    </Fragment>
  );
}

export default FoodItems;
