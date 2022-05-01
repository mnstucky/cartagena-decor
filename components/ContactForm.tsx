import { Button, Grid, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ContactFormState } from "../types";

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  message: "",
};

function ContactForm() {
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormState>({ defaultValues: initialFormState });
  const [submitMessage, setSubmitMessage] = useState("");
  const [loading, setLoading] = useState(false);
  function onSubmit(event) {
    setLoading(true);
    const form = getValues();
    fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        name: form.name,
        subject: form.message,
        email: form.email,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.ok) {
          setSubmitMessage("Thank you for contacting us! We will be in touch.");
        } else {
          setSubmitMessage("Something went wrong. Please try again later.");
        }
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <Grid
      container
      direction="column"
      component="form"
      onSubmit={() => handleSubmit(onSubmit)()}
      spacing={1}
    >
      <Grid item>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              label="Full Name"
              error={!!errors.name}
              fullWidth
              required
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              label="Email Address"
              error={!!errors.email}
              fullWidth
              required
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="message"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              label="Message"
              error={!!errors.message}
              fullWidth
              multiline
              minRows={10}
              required
            />
          )}
        />
      </Grid>
      <Grid item>
        <LoadingButton
          disabled={submitMessage !== ""}
          onClick={() => handleSubmit(onSubmit)()}
          variant="contained"
          loading={loading}
        >
          Submit
        </LoadingButton>
      </Grid>
      <Grid item>
        <Typography>{submitMessage}</Typography>
      </Grid>
    </Grid>
  );
}

export default ContactForm;
