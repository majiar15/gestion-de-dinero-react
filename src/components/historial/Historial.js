import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import {HistorialItem} from './HistorialItem';
export const Historial = () => {

    const { id } = useParams();
    const [historial, setHistorial] = useState([]);
    const getHistorial = async ()=>{
      try {
        const response = await axios.get('http://localhost:3000/api/historial/'+id);
        console.log(response.data);

        setHistorial(response.data.historial);
      } catch (error) {
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
               ? historial.map((transaccion)=> <HistorialItem  key={transaccion._id} transaccion={transaccion} />)
               : 'No hay historial D:'
           }
            
        </>
            
        
    )
}
