import { useEffect } from 'react';

function Hero() {
  useEffect(() => {
    const rotatingImages = [
      './#item-1',
      './#item-2',
      './#item-3',
      './#item-4',
      './#item-5',
    ];
    let rotatingImagesIndex = 1;
    const timer = setInterval(() => {
      rotatingImagesIndex = (rotatingImagesIndex + 1) % rotatingImages.length;
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    null
  );
}

export default Hero;
