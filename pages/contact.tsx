import { Grid, Typography } from "@mui/material";
import React from "react";
import ContactForm from "../components/ContactForm";

function Contact() {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h3">Contact Us</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          Have a question? Don&apos;t hesitate to reach out to us using this
          form!
        </Typography>
      </Grid>
      <Grid item>
        <ContactForm />
      </Grid>
    </Grid>
  );
}

export default Contact;
