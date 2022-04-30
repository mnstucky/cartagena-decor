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
import { Menu, ShoppingCart } from "@mui/icons-material";
import NavbarMenu from "./NavbarMenu";

interface Props {
  mobileDrawerOpen: boolean;
  handleDrawerToggle: () => void;
  drawerWidth: number;
}

function Navbar({ mobileDrawerOpen, handleDrawerToggle, drawerWidth }: Props) {
  const container =
    typeof window !== "undefined" ? () => window.document.body : undefined;
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open-menu"
            sx={{ mr: 2, display: { sm: "none" } }}
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cartagena Decor & Maran Caf&eacute;
          </Typography>
          <IconButton color="inherit">
            <ShoppingCart />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
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
        >
          <NavbarMenu />
        </Drawer>
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
        >
          <NavbarMenu />
        </Drawer>
      </Box>
    </>
  );
}

export default Navbar;
