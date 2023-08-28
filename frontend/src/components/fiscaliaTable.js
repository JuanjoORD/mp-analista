import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom"

function App(props) {
  const { fiscalias, deleteFiscalia } = props;

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={6} >
      {fiscalias.map((fiscalia) => {
        return (
          <Grid item xs={4} key={fiscalia.id}>
            <Card sx={{ maxWidth: 345 }}>
              <div style={{ position: "relative", paddingLeft: 30, paddingRight: 30, paddingBottom: 30, paddingTop: 30 }}>
              {/* <a href={`#`} target="_blank" > */}
                <CardMedia
                  component="img"
                  alt="Maps"
                  height="180"
                  image="https://www.mp.gob.gt/wp-content/themes/ministerio-publico/assets/img/MP_logo.png"
                />
                <div
                  style={{
                    position: "absolute",
                    color: "black",
                    top: 10,
                    left: "50%",
                    top: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "15px",
                  }}
                >
                  {" "}
                  
                </div>
                {/* </a> */}
              </div>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {fiscalia.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Dirección:</b> {fiscalia.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Teléfono:</b> {fiscalia.phone}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" startIcon={<EditIcon />}>
                  <Link to={`/form/${fiscalia.branchId}`} >Editar</Link>
                </Button>
                <Button style={{ color: 'red'}} variant="outlined" startIcon={<DeleteIcon />}
                onClick={() => deleteFiscalia(fiscalia)}>
                  Eliminar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default App;
