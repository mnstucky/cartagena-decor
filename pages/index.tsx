import { Grid, Typography } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <Grid container direction="column">
      <div className="block">
        <Hero />
      </div>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        ...
      </Swiper>
      <Grid container item justifyContent="center">
        <Typography variant="h3">
          Welcome to Cartagena Decor and Maran Caf&eacute;!
        </Typography>
      </Grid>
      <div className="block">
        <p className="is-size-5-desktop">
          Established in 2016, Cartagena Decor LLC works with coffee producers
          and local artists in Colombia through direct and fair trade practices.
          Cartagena Decor is the authorized distributor of Maran Caf&eacute;,
          single-origin specialty Colombian coffee.
        </p>
      </div>
      <div className="block">
        <p className="is-size-5-desktop">
          Check out our full range of products!
        </p>
      </div>
    </Grid>
  );
}
