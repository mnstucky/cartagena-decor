import { Grid, Typography } from "@mui/material";
import React from "react";

function Error({ message = "Sorry, something went wrong." }) {
  return (
    <Grid container justifyContent="center">
      <Typography variant="h3">{message}</Typography>
    </Grid>
  );
}

export default Error;
