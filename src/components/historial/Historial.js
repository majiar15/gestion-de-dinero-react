import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getToken } from '../../utils/helper';
import {HistorialItem} from './HistorialItem';
export const Historial = () => {

    const { id } = useParams();
    const [historial, setHistorial] = useState([]);
    const getHistorial = async ()=>{
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL_BASE}/historial/`+id,{
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+getToken(),
            'X-Requested-With' : 'XMLHttpRequest'
        }
        });
        console.log(response.data);

        setHistorial(response.data.historial);
      } catch (error) {
        console.log(error)
        if(error.response.status === 404){
          setHistorial([]);
        }else if(error.response.status === 500){
          setHistorial([]);
        }     
      }
    }

    useEffect(() => {
        getHistorial();
      }, []);
    return (
        <>
           {
               historial 
               ? historial.map((transaccion)=> <HistorialItem  key={transaccion.id} transaccion={transaccion} />)
               : 'No hay historial D:'
           }
            
        </>
            
        
    )
}
