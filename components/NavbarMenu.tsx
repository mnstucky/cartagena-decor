import React from "react";
import { useSession, signIn, signOut } from "next-auth/client";
import GoToCartButton from "./GoToCartButton";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { AccountCircle, Coffee, Email, Store } from "@mui/icons-material";

function NavbarMenu() {
  const [session, sessionLoading] = useSession();
  return (
    <List sx={{ mt: "56px" }}>
      <Divider />
      <ListItem button key={"Shop"}>
        <ListItemIcon>
          <Store />
        </ListItemIcon>
        <ListItemText primary={"Shop"}></ListItemText>
      </ListItem>
      <Divider />
      <ListItem button key={"Maran Cafe"}>
        <ListItemIcon>
          <Coffee />
        </ListItemIcon>
        <ListItemText primary={"Maran Cafe"}></ListItemText>
      </ListItem>
      <Divider />
      <ListItem button key={"Contact"}>
        <ListItemIcon>
          <Email />
        </ListItemIcon>
        <ListItemText primary={"Contact"}></ListItemText>
      </ListItem>
      <Divider />
      <ListItem button key={"Account"}>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        <ListItemText primary={"Account"}></ListItemText>
      </ListItem>
      <Divider />
    </List>
  );
}

export default NavbarMenu;
