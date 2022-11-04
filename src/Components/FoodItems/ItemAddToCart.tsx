import React from "react";
import classes from './ItemAddToCart.module.css'

const ItemAddToCart: React.FC<{addItemHandler:(amount:number)=>void, amount?:number}> = (props) => {
  const addHandler = () =>{
    props.addItemHandler(1);
  }

  return (
    <div>
      <button className={classes.btn}>-</button>
      <button className={classes.btn} onClick={addHandler}>
        <span>{props.amount?props.amount+' ':''}</span>
        Add
      </button>
    </div>
  );
};

export default ItemAddToCart;
