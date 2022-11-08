import React from "react";
import classes from "./ItemAddToCart.module.css";

const ItemAddToCart: React.FC<{
  addItemHandler: (amount: number) => void;
  removeItemHandler: () => void;
  amount: number;
}> = (props) => {
  
  const addHandler = () => {
    props.addItemHandler(1);
  };

  return (
    <div>
      {props?.amount > 0 && (
        <button className={classes.btn} onClick={props.removeItemHandler}>
          -
        </button>
      )}
      <button className={classes.btn} onClick={addHandler}>
        {props?.amount > 0 ? props.amount + " " : ""}
        Add
      </button>
    </div>
  );
};

export default ItemAddToCart;
