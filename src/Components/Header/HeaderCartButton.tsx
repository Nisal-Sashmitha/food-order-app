import React from 'react';
import { useSelector } from 'react-redux';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton: React.FC<{onClick:()=>void}>=(props:any)=> {
  const numberOfCartItems = useSelector((state:any)=> state.cart.totalQuantitiy)
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
