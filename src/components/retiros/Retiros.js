import { Button, Snackbar, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { getToken } from '../../utils/helper';

export const Retiros = () => {
    const { id } = useParams();
    const [cartera, setCartera] = useState(null);
    const [formValue, handleInputChange]=useForm({retirar: '',mensaje :''});
    const [open, setOpen] = useState({open: false, message : '', severity: ''});
    let {retirar, mensaje} = formValue;
    const getCartera = async ()=>{
        try {
          const response = await axios.get(`${process.env.REACT_APP_URL_BASE}/cartera/${id}`,{
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization': 'Bearer '+getToken(),
            },
          });
          setCartera(response.data);
        } catch (error) {
          console.log(error);
          if(error.response.status === 404){
            setCartera(null);
          }else if(error.response.status === 500){
            setCartera(null);
          }     
        }
    };

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen({error: false, message : '', severity: 'success'});
    };
    const getFecha = () =>{
        const date = new Date();
        let dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        return dateString;
    };
    const retirarfn = async ()=>{
        try {
            let data;
                if(mensaje == ""){
                    data = {
                        id: cartera.id,
                        cantidad: parseInt(retirar),
                    }
                }else{
                    data = {
                        id: cartera.id,
                        cantidad: parseInt(retirar),
                        mensaje: mensaje,
                    }
                }
            const  response = await axios.put(`${process.env.REACT_APP_URL_BASE}/cartera/withdrawal`,data,{
                headers : {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization': 'Bearer '+getToken(),
                    'X-Requested-With' : 'XMLHttpRequest'
                },
            });
            cartera.cantidad = response.data.cartera.cantidad;
            formValue.retirar = '';
            formValue.mensaje = '';
            setOpen({open:true, message: "Retiro exitoso",severity:"success"});


        } catch (error) {
            setOpen({error: true, message : 'fallo en la actualizacion del valor', severity: 'error'});
        }
    };

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        if(parseInt(retirar) > parseInt(cartera.cantidad)){
            console.log("no se puede pa ");
            return setOpen({open:true, message: "la cantidad ingresada es mayor a la guardada",severity:"error"}); 
        }else{
            retirarfn();
            
        }
    };

    useEffect(() => {
        getCartera();
    }, []);

    return (
        <>
            {
                cartera != null 
                ? <>
                    <h1>Cartera : {cartera.name}</h1>
                    <h2>Saldo : {Intl.NumberFormat().format(cartera.cantidad)}</h2>
                </>
                : 'no hay carteras '
            }
            {
                retirar !== ''
                ? <h2>valor a depositar: ${Intl.NumberFormat('es-CO').format(retirar)}</h2>
                : ''
            }
            <form onSubmit={handleFormSubmit}>
            <TextField 
                id="outlined-basic" 
                label="Valor a retirar" 
                variant="outlined" 
                name="retirar"
                onChange={handleInputChange}
                value={retirar}
                
            />
            <TextField 
                id="outlined-basic" 
                label="mensaje" 
                variant="outlined" 
                name="mensaje"
                onChange={handleInputChange}
                value={mensaje}
            />
            <Button variant="outlined" type="submit">Rtirar</Button>
            </form>
            <Snackbar open={open.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={open.severity}>
                {open.message}
                </Alert>
            </Snackbar>
        </>
    )
}
export default Retiros;
