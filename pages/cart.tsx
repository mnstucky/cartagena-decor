import React, { useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "../components/CartContextProvider";
import Error from "../components/Error";
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { getSanityImage } from "../services/useGetSanityData";
import { Add, Remove } from "@mui/icons-material";

const stripePromise = loadStripe(
  "pk_live_51JC8iGJpFLurhJIASqy8xOrD2zs7FaKAg4bPLOzVhEdYvtNxeRduyZqd4NmBefV5Iln6kmqmj1Lu9qeEXR48F7ny00Ifzbulua"
);

function Cart() {
  const { cart, subtotal, addToCart, removeFromCart } = useContext(CartContext);
  async function handleCheckout() {
    const stripe = await stripePromise;
    const response = await fetch("/api/createcheckout", {
      method: "POST",
      body: JSON.stringify(cart),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      return (
        <Error
          message={`The following error occurred: ${result.error.message}`}
        />
      );
    }
  }
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h3">Cart</Typography>
      </Grid>
      <Grid item>
        <List>
          {cart.map((cartItem) => (
            <>
              <ListItem
                key={cartItem.product.slug.current}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar
                    alt={cartItem.product.title}
                    src={getSanityImage(cartItem.product.images[0])
                      .width(200)
                      .url()}
                    variant="rounded"
                    sx={{ height: "70px", width: "70px", mr: "1rem" }}
                  />
                </ListItemAvatar>
                <ListItemText primary={cartItem.product.title} />
                <Grid item container justifyContent="flex-end">
                  <Grid
                    item
                    container
                    style={{ width: "5rem" }}
                    direction="column"
                  >
                    <Typography>Quantity: {cartItem.quantity}</Typography>
                    <Grid container item justifyContent="center">
                      <IconButton
                        onClick={() => addToCart(cartItem.product, 1)}
                      >
                        <Add />
                      </IconButton>
                      <IconButton
                        onClick={() => removeFromCart(cartItem.product, 1)}
                      >
                        <Remove />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Grid>
      <Grid item container justifyContent="flex-end">
        <Typography variant="body1">Subtotal: ${subtotal}</Typography>
      </Grid>
    </Grid>
  );
}

export default Cart;
