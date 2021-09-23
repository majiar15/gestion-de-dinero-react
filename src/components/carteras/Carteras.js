import React, { useEffect, useState } from "react";
import {CardCartera} from '../card/Card';

import { Grid } from "@material-ui/core";
import axios from "axios";
import { getToken } from "../../utils/helper";

export const Carteras = () => {
  const [carteras, setCarteras] = useState([]);
  const {id} = JSON.parse(sessionStorage.getItem("user"));
  console.log(id)


  const getCarteras = async ()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL_BASE}/cartera/get/${id}`,{
        headers : {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
          'Authorization': 'Bearer '+getToken(),
        },
      });
      setCarteras(response.data);
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
  }, []);
  return (
    // <h1>jejje</h1>
    <Grid
    container
    wrap="wrap"
    direction="row"
    
    spacing={0}
  >
    {
      carteras.length !== 0 
      ? carteras.map( cartera => <CardCartera key={cartera.id} cartera={cartera}/>)
      : 'No hay carteras, cree una'
    }
    
    </Grid>
  );
};

export default Carteras;
