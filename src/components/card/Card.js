import React from 'react'
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import './card.css';
import { useHistory } from 'react-router';
export const CardCartera = ({cartera}) => {
  const history = useHistory();
    const handleButtonRetiro = ()=>{
     history.push(`/retiro/${cartera._id}`);
    };
    const handleButtonDeposito = ()=>{
      history.push(`/deposito/${cartera._id}`);
     };
    return (
      <>
        
        <Card className="card">
        <CardContent >
          <Typography variant="h5" component="h2">
            {cartera.nombre}
          </Typography>
  
          <Typography variant="h5" component="h3">
            {Intl.NumberFormat().format(cartera.cantidad)}
          </Typography>
        </CardContent>
  
        <CardActions>
          <Button variant="contained" color="secondary" onClick={handleButtonRetiro}>
            Retirar
          </Button>
  
          <Button variant="contained" color="primary" onClick={handleButtonDeposito}>
            Depositar
          </Button>
        </CardActions>
  
      </Card>
      </>
    )
}
export default CardCartera;
