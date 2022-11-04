import React from 'react'
import LoginForm from './LoginForm';
import classes from './AuthPage.module.css'
import headerBackgroundImage from "./../../assests/pexels-rajesh-tp-1624487.jpg";

function AuthPage() {
  return (
    <div className={classes.authpage}>
        <div className={classes.authcoverImage} style={{ backgroundImage: `url(${headerBackgroundImage})` }}>

        </div>
        <LoginForm />
      
    </div>
  )
}

export default AuthPage
