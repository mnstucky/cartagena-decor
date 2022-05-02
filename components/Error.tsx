import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";

const drawerWidth = 240;

function Error({ message = "Sorry, something went wrong." }) {
  return (
    <>
      <Navbar
        mobileDrawerOpen={false}
        handleDrawerToggle={() => {}}
        drawerWidth={drawerWidth}
      />
      <Box
        sx={{
          mt: "80px",
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Container>
          <Grid container justifyContent="flex-start">
            <Grid item>
              <Typography variant="h4">{message}</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Error;
