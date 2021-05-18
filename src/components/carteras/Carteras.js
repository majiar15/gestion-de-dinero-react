import React, { useEffect, useState } from "react";
import {CardCartera} from '../card/Card';

import { Grid } from "@material-ui/core";
import axios from "axios";

export const Carteras = () => {
  const [carteras, setCarteras] = useState([]);
  const getCarteras = async ()=>{
    try {
      const response = await axios.get('http://localhost:3000/api/cartera');
      setCarteras(response.data.carteras);
    } catch (error) {
      if(error.response.status === 404){
        setCarteras([]);
      }else if(error.response.status === 500){
        setCarteras([]);
      }     
    }
  }
  useEffect(() => {
    getCarteras();
    console.log(carteras);
  }, []);
  return (
    <Grid
    container
    wrap="wrap"
    direction="row"
    
    spacing={0}
  >
    {
      carteras.length !== 0 
      ? carteras.map( cartera => <CardCartera key={cartera._id} cartera={cartera}/>)
      : 'No hay carteras, cree una'
    }
    
    </Grid>
  );
};

export default Carteras;
