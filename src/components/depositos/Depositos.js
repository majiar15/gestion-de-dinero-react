import { Button, Snackbar, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { getToken } from '../../utils/helper';

export const Depositos = () => {
    const { id } = useParams();
    const [cartera, setCartera] = useState(null);
    const [formValue, handleInputChange]=useForm({deposito: '',mensaje :''});
    const [open, setOpen] = useState({open: false, message : '', severity: ''});
    let {deposito, mensaje} = formValue;
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
        setOpen({open: false, message : '', severity: ''});
    };
    const getFecha = () =>{
        const date = new Date();
        let dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        return dateString;
    };
    const depositofn = async ()=>{
        try {
            let data;
            if(mensaje == ""){
                data = {
                    id: cartera.id,
                    cantidad: parseInt(deposito),
                }
            }else{
                data = {
                    id: cartera.id,
                    cantidad: parseInt(deposito),
                    mensaje: mensaje,
                }
            }
            const  response = await axios.put(`${process.env.REACT_APP_URL_BASE}/cartera/deposit`,data,{
                headers : {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization': 'Bearer '+getToken(),
                    'X-Requested-With' : 'XMLHttpRequest'
                },
            }
            );
            console.log(response.data)
            cartera.cantidad = response.data.cartera.cantidad;
            formValue.deposito = '';
            formValue.mensaje = '';
            setOpen({open:true, message: "Deposito exitoso",severity:"success"});
        } catch (error) {
            console.log(error);
            setOpen({open: true, message : 'fallo en la actualizacion del valor', severity: 'error'});
        }
    };

    const handleFormSubmit = (e)=>{
        e.preventDefault();   
        console.log(deposito)  
        const depositoString = parseInt(deposito).toString();
        if(deposito === ''){
            
            setOpen({open: true, message : 'el campo deposito es obligatorio', severity: 'error'});
        }else if(deposito.length !== depositoString.length){
            setOpen({open: true, message : 'el campo deposito debe tener solo numeros', severity: 'error'});
        }else{
            depositofn(); 
        }
    };

    useEffect(() => {
        getCartera();
    }, []);
    const handleInputBlur =(e)=>{
        e.target.value = Intl.NumberFormat().format(e.target.value);
    }

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
                deposito !== ''
                ? <h2>valor a depositar: ${Intl.NumberFormat('es-CO').format(deposito)}</h2>
                : ''
            }
            <form onSubmit={handleFormSubmit}>
            <TextField 
                id="outlined-basic" 
                type="number"
                variant="outlined" 
                name="deposito"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                value={deposito}
            />
            <TextField 
                id="outlined-basic" 
                variant="outlined" 
                name="mensaje"
                onChange={handleInputChange}
                value={mensaje}
            />
            <Button variant="outlined" type="submit">Depositar</Button>
            </form>
            <Snackbar open={open.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={open.severity}>
                {open.message}
                </Alert>
            </Snackbar>
        </>
    )
}
export default Depositos;
