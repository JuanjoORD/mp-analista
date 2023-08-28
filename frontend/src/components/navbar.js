import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom"

export default function SearchAppBar() {
  return (
    <div sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#ECF0F1" }} >
        <Toolbar>
            <Link to={'/'}>
          <Avatar
            alt="MP Loo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ2AWAHQqO1a78cuj9ire2iV6X1Tv9Hw7tgi9tkoBhxyGg_hMACEklUs5orlSBO84Qig4"
            sx={{ width: 76, height: 76 }}
          />
          </Link>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" }, color: "#34495E" }}
          >
            Ministerio Público
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
