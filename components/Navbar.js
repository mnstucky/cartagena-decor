import React, { useState } from "react";
import { Button, Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cartagena Decor & Maran Caf&eacute;
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
