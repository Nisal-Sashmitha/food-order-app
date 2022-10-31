import React from 'react';
import classes from './Header.module.css';
import headerBackgroundImage from './../assests/headerBackgroundImage.jpg';

function Header() {
  return (
    <header className={classes.header_background} style={{ backgroundImage: `url(${headerBackgroundImage})`}}>
        <div className={classes.header_fade} />
    </header>
  )
}

export default Header
