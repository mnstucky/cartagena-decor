import React from "react";
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

const drawerWidth = 240;

interface Props {
  mobileDrawerOpen: boolean;
  handleDrawerToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar({ mobileDrawerOpen, handleDrawerToggle }: Props) {
  const container =
    window !== undefined ? () => window.document.body : undefined;
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open-menu"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cartagena Decor & Maran Caf&eacute;
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>{" "}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileDrawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        />
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        />
      </Box>
    </>
  );
}

export default Navbar;
