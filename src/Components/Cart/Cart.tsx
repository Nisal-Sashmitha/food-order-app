import React, { useContext } from "react";
import CartContext from "../../Store/CartContext";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItems from "./CartItems";

const Cart: React.FC<{onClose:()=>void}> = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`; // total value of cart
  let cartItems:any=[]; //cart items array initialization

  //create cart items array to cart to display
  for (const key in cartCtx.items) {
    cartItems.push(<CartItems key={key} item={cartCtx.items[key]}/>)
    }
  return (
    <Modal onClose={props.onClose}>
        {cartItems && <ul className={classes['cart-items']}>
           {cartItems}
        </ul>}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes['button-alt']}>Close</button>
        {cartCtx.totalQuantitiy && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
