import React from "react";
import ItemModel from "../../models/items";
import ItemAddToCart from "../FoodItems/ItemAddToCart";
import classes from "./CartItems.module.css";

const CartItems: React.FC<{ item: { Item: ItemModel, amount: number } }> = (
  props
) => {
  const addItemHandler = () => {};

  return (
    <div className={classes.item}>
      <div
        className={classes.item_img}
        style={{ backgroundImage: `url(${props.item.Item.imgUrl})` }}
      >
        {/* faded overlay on image */}
        <div className={classes.item_img_fade}></div>
      </div>
      <div className={classes.details}>
        {/* price and add to cart functionality */}
        <div className={classes.priceAndAddToCart}>
          <h2>${props.item.Item.price}</h2>
          <ItemAddToCart addItemHandler={addItemHandler} amount={props.item.amount} />
        </div>
        {/* name */}
        <h2 className={classes.name}>{props.item.Item.name}</h2>
        {/* decrption */}
        <p className={classes.description}>{props.item.Item.description}</p>
      </div>
    </div>
  );
};

export default CartItems;
