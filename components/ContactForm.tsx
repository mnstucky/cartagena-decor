import { Button, Grid, TextField } from "@mui/material";
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
  const [APIresponse, setAPIResponse] = useState("");
  function onSubmit(event) {
    event.preventDefault();
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
          setAPIResponse("success");
        } else {
          setAPIResponse("error");
        }
      })
      .catch((error) => {
        throw error;
      });
  }
  let submitMessage = "";
  if (APIresponse === "success") {
    submitMessage = "Thank you for contacting us! We will be in touch.";
  } else if (APIresponse === "error") {
    submitMessage = "Something went wrong. Please try again later.";
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
            />
          )}
        />
      </Grid>
      <Grid item>
        <Button variant="contained">Submit</Button>
      </Grid>
    </Grid>
  );
}

export default ContactForm;
