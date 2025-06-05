import React from "react";
import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Canvassing Notes
        </Typography>
        <Link component={RouterLink} to="/" color="inherit" sx={{ mx: 2 }}>
          View Notes
        </Link>
        <Link
          component={RouterLink}
          to="/new-note"
          color="inherit"
          sx={{ mx: 2 }}
        >
          Add a new canvassing note
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
