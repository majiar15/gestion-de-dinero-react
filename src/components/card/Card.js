import React, { useState } from 'react'
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/DeleteForever';
import HistoryIcon from '@material-ui/icons/History';
import Typography from "@material-ui/core/Typography";
import './card.css';
import { useHistory } from 'react-router';
import { createMuiTheme, Fab, Grid, Grow, ThemeProvider,  } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';




export const CardCartera = ({cartera}) => {
  const theme = createMuiTheme({
    palette: {
      secondary: yellow,
    },
  })
  const history = useHistory();
    const handleButtonRetiro = ()=>{
     history.push(`/retiro/${cartera.id}`);
    };
    const handleButtonDeposito = ()=>{
      history.push(`/deposito/${cartera.id}`);
     };
    const handleButtonHistory = ()=>{
      history.push(`/historial/${cartera.id}`);
    };
     const [open, setOpen] = useState(false);
    return (
      <div className="PR" onMouseEnter={()=>{setOpen(true)}}  onMouseLeave={()=>{setOpen(false)}}>
        
        <Card className={"card "}>
        <CardContent >
          <Typography variant="h5" component="h2">
            {cartera.nombre}
          </Typography>
  
          <Typography variant="h5" component="h3">
            {Intl.NumberFormat().format(cartera.cantidad)}
          </Typography>
        </CardContent>
  
        <CardActions>
        <ThemeProvider theme={theme}>
            <Button variant="contained" color="secondary" onClick={handleButtonRetiro}>
              Retirar
            </Button>

        </ThemeProvider>
  
          <Button variant="contained" color="primary" onClick={handleButtonDeposito}>
            Depositar
          </Button>
        </CardActions>
      </Card>
      <Grid
       className="PA possition" 
       container
       direction="row"
       justify="space-evenly"
      >
          <Grow in={open} >
            <Fab color="secondary"  size="small"  aria-label="edit">
              <DeleteIcon />
            </Fab>
          </Grow >
          <Grow in={open} >
            <Fab color="primary"  size="small" onClick={handleButtonHistory} aria-label="edit">
              
                <HistoryIcon/>
             
            </Fab>
          </Grow >
        </Grid>
      </div>
    )
}
export default CardCartera;
