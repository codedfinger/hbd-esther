import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

import e3 from '../images/1.jpeg'; // Import the image
import e4 from '../images/4.jpeg'; // Import the image
import e5 from '../images/5.jpeg'; // Import the image
import e6 from '../images/6.jpeg'; // Import the image
import e7 from '../images/7.jpeg'; // Import the image
import e8 from '../images/8.jpeg'; // Import the image
import e9 from '../images/9.jpeg'; // Import the image

const GalleryScreen = () => {
  const images = [
    e3,
    e4,
    e5,
    e6,
    e7,
    e8,
    e9
    // Add more image URLs as needed
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds (adjust as needed)
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '50%', maxWidth: '800px' }}> {/* Adjust width as needed */}
        <Carousel
          autoPlay
          interval={3000} // Interval between slides (in milliseconds)
          infiniteLoop // Loop through images infinitely
          showStatus={false} // Hide status indicator
          showThumbs={false} // Hide thumbnail navigation
          selectedItem={index} // Set the selected item based on index state
          onChange={setIndex} // Update index state when changing slides
        >
          {images.map((image, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={image} alt={`Image ${idx + 1}`} style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default GalleryScreen;
