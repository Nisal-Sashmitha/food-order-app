import React  from 'react';
import Header from './Components/Header';
import classes from './App.module.css'
import Row from './Components/Row';

function App() {
  return (
    <div className={classes.body}>
      {/* this header includes nav bar, header image, and access to cart components */}
      <Header/>
      {/* this Row components are for display each food types differently! */}
      <Row title='Burgers'/>
      <Row title='Bevorages'/> 
      <Row title='Rice'/> 

     
    </div>
  );
}

export default App;
