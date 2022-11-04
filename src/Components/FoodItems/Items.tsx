import React,{useContext} from 'react';
import classes from './Items.module.css';
import ItemAddToCart from './ItemAddToCart';
import Item from '../../models/items';
import CartContext from '../../Store/CartContext';

const Items:React.FC<{item:Item}>=(props)=> {
    const cartCtx = useContext(CartContext);
    const addItemHandler = (amount:number)=> cartCtx.addItem({
      Item:props.item,
      amount:amount

    });
    const removeItemHandler = (amount:number)=> cartCtx.removeItem({
      Item:props.item,
      amount:amount

    });
   
  return (
    // this is a item
    <div className={classes.item}>
        {/* this is the image in item it is a background image with faded overlay */}
        <div className={classes.item_img} style={{backgroundImage: `url(${props.item.imgUrl })`}}>
            {/* faded overlay on image */}
            <div className={classes.item_img_fade}>

            </div>
        </div>
        <div></div>
        {/* price and add to cart functionality */}
        <div className={classes.priceAndAddToCart}>
            <h2>${props.item.price}</h2>
            <ItemAddToCart addItemHandler={addItemHandler}/>
        </div>
        {/* name */}
        <h2 className={classes.name}>{props.item.name}</h2>
        {/* decrption */}
        <p className={classes.description}>{props.item.description}</p>
    </div>
  )
}

export default Items
