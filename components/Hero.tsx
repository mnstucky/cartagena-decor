import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useGetSanityData from '../services/useGetSanityData';

function Hero() {
  const { data: carouselImages } = useGetSanityData(`*[_type == 'carousel']{"imageUrl": image.asset->url}`, {}, false);
  const [carouselImageIndex, setCarouselImageIndex] = useState(0);
  useEffect(() => {
    if (!carouselImages) return () => {};
    const timer = setInterval(() => {
      setCarouselImageIndex((previousIndex) => (previousIndex + 1) % carouselImages.length);
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  if (!carouselImages) return null;
  return (
    <Paper elevation={2}><img style={{ width: '60%', height: 'auto' }} src={carouselImages[carouselImageIndex].imageUrl} alt="hero" /></Paper>
  );
}

export default Hero;
