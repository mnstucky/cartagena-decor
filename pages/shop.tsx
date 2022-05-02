import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";
import useFetch from "../services/useFetch";
import ItemGrid from "../components/ItemGrid";
import Error from "../components/Error";
import { CircularProgress, Grid, Typography } from "@mui/material";
import useGetSanityData from "../services/useGetSanityData";

function Shop() {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h3">Shop</Typography>
      </Grid>
      <Grid item container>
        <ItemGrid />
      </Grid>
    </Grid>
  );
}

export default Shop;
