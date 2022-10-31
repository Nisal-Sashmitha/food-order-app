import React from 'react';
import classes from './Items.module.css';
import headerBackgroundImage from './../assests/headerBackgroundImage.jpg';

const Items:React.FC<{item:{}}>=(props)=> {
  return (
    <div className={classes.item}>
        <div className={classes.item_img} style={{backgroundImage: `url(${headerBackgroundImage})`}}>
            <div className={classes.item_img_fade}>

            </div>
        </div>
        {/* price */}
        {/* title and add to cart functionality */}
        {/* decrption */}
    </div>
  )
}

export default Items
