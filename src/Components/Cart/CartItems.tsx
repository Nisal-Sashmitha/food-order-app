import React,{ useContext } from "react";
import ItemModel from "../../models/items";
import CartContext from "../../Store/CartContext";
import ItemAddToCart from "../FoodItems/ItemAddToCart";
import classes from "./CartItems.module.css";

const CartItems: React.FC<{ item: { item: ItemModel, amount: number } }> = (
  props
) => {
    const cartCtx = useContext(CartContext);
    const addItemHandler = (amount:number)=> cartCtx.addItem({
      item:props.item.item,
      amount:amount

    });
    const removeItemHandler = ()=> cartCtx.removeItem(props.item.item.id);
  return (
    <div className={classes.item}>
      <div
        className={classes.item_img}
        style={{ backgroundImage: `url(${props.item.item.imgUrl})` }}
      >
        {/* faded overlay on image */}
        <div className={classes.item_img_fade}></div>
      </div>
      <div className={classes.details}>
        {/* price and add to cart functionality */}
        <div className={classes.priceAndAddToCart}>
          <h2>${props.item.item.price}</h2>
          <ItemAddToCart addItemHandler={addItemHandler} removeItemHandler={removeItemHandler} amount={props.item.amount} />
        </div>
        {/* name */}
        <h2 className={classes.name}>{props.item.item.name}</h2>
        {/* decrption */}
        <p className={classes.description}>{props.item.item.description}</p>
      </div>
    </div>
  );
};

export default CartItems;
