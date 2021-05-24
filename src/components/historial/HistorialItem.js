import Alert from '@material-ui/lab/Alert'
import React from 'react'

export const HistorialItem = ({transaccion}) => {
    let severity;
    if(transaccion.operacion === 'Retiro'){
        severity = 'error'
    }else if(transaccion.operacion === 'Deposito'){
        severity = 'info'

    }
    return (

        <Alert severity={severity}>
            {transaccion.mensaje}
        </Alert >
    )
}
