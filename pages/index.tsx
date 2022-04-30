import { Grid, Typography } from "@mui/material";
import { PortableText } from "@portabletext/react";
import React from "react";
import Hero from "../components/Hero";
import useGetSanityData from "../services/useGetSanityData";

export default function Home() {
  const { data } = useGetSanityData(
    "*[_type == 'page' && title == 'Home'][0]",
    {},
    false
  );
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Hero />
      </Grid>
      <Grid container item justifyContent="center">
        <Typography variant="h3">
          Welcome to Cartagena Decor and Maran Caf&eacute;!
        </Typography>
      </Grid>
      {data && data.content && (
        <Grid item>
          <PortableText value={data.content} />
        </Grid>
      )}
    </Grid>
  );
}
