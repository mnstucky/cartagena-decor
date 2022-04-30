import React from "react";
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
  return (
    <List sx={{ mt: "56px" }}>
      <Divider />
      <Link href={"/shop/"}>
        <ListItem button key={"Shop"}>
          <ListItemIcon>
            <Store />
          </ListItemIcon>
          <ListItemText primary={"Shop"}></ListItemText>
        </ListItem>
      </Link>
      <Divider />
      <ListItem button key={"Maran Cafe"}>
        <ListItemIcon>
          <Coffee />
        </ListItemIcon>
        <ListItemText primary={"Maran Caf\xe9"}></ListItemText>
      </ListItem>
      <Divider />

      <Link href={"/contact/"}>
        <ListItem button key={"Contact"}>
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText primary={"Contact"}></ListItemText>
        </ListItem>
      </Link>
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
