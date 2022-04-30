import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import useGetSanityCDNData from "../services/useGetSanityCDNData";

function Hero() {
  const { data: carouselImages } = useGetSanityCDNData(
    `*[_type == 'carousel']{"imageUrl": image.asset->url}`,
    {},
    false
  );
  const [carouselImageIndex, setCarouselImageIndex] = useState(0);
  useEffect(() => {
    if (!carouselImages) return () => {};
    const timer = setInterval(() => {
      setCarouselImageIndex(
        (previousIndex) => (previousIndex + 1) % carouselImages.length
      );
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  if (!carouselImages) return null;
  return (
    <Paper elevation={2} style={{ height: "25vh" }}>
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          overflow: "hidden",
          borderRadius: "3px",
        }}
        src={carouselImages[carouselImageIndex].imageUrl}
        alt="hero"
      />
    </Paper>
  );
}

export default Hero;
