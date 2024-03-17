import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

const ImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  console.log(images);


  const handleNextImage = () => {
    setFadeIn(false); // Start fading out
    setTimeout(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
      setFadeIn(true); // Start fading in
    }, 500); // Change image after 500 milliseconds (adjust as needed)
  };

  // Configure spring animation for fade effect
  const fadeAnimation = useSpring({
    opacity: fadeIn ? 1 : 0,
    config: { duration: 500 }, // Adjust duration as needed
  });

  useEffect(() => {
    const interval = setInterval(handleNextImage, 3000); // Change image every 3 seconds (adjust as needed)
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '50vh' }}>
      {images.map((image, idx) => (
        <animated.img
          key={idx}
          src={image}
          alt={`Image ${idx + 1}`}
          style={{
            ...fadeAnimation,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50%', // Adjust width to fit half the screen
            height: '100%', // Keep height as 100% to fill the container vertically
            objectFit: 'cover',
          }}
          className={idx === index ? 'fade-in' : 'fade-out'}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
