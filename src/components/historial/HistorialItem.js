import Alert from '@material-ui/lab/Alert'
import React from 'react'

export const HistorialItem = ({transaccion}) => {
    let severity;
    if(transaccion.operacion === 'retiro'){
        severity = 'error'
    }else if(transaccion.operacion === 'deposito'){
        severity = 'success'

    }
    return (

        <Alert severity={severity}>
            {transaccion.mensaje}
        </Alert >
    )
}
