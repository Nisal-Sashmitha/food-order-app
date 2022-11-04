import React, { useContext } from 'react'
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from "../../Store/CartContext";

const HeaderCartButton: React.FC<{onClick:()=>void}>=(props:any)=> {
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.totalQuantitiy;
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon/>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
