import React, { useState, useEffect } from 'react';
import musicImage from '../images/music.png'; // Import the music image
import giftImage from '../images/gift.png'; // Import the gift image
import bannerImage from '../images/banner.png'; // Import the banner image
import balloonImage from '../images/balloon.png'; // Import the balloon image
import { useSpring, animated } from '@react-spring/web'
import { useNavigate } from 'react-router-dom';

import '../styles/styles.css';

const Balloon = ({ position }) => (
  <img src={balloonImage} alt="Balloon" className="balloon" style={position} />
);

const ScrollingText = ({ showBanner, onComplete }) => {
  const props = useSpring({
    from: { bottom: '0px' },
    to: showBanner ? { bottom: '50px' } : { bottom: '50px' },
    config: { duration: 100000 }, // Adjust duration as needed
    onRest: onComplete // Call the onComplete function when animation finishes
  });

  return (
    <animated.div className="scrolling-text" style={props}>
      <p className="text-font" style={{ fontSize: '20px'}}>
      We do not get to choose our families, but we do get to choose our friends. You have been as close as a family to me. I wish you every happiness and blessing on this day of your birth. Congratulations! 
      </p>
      <p className="text-font" style={{ fontSize: '20px'}}>
      You grew up one more year. Soon, you'll be 25, then 30, then 35, then 40 and so on. And, if things go right for you, then, in the meantime, you'll be achieving your goals, getting married, having kids, seeing them also getting married and having grandchildren. And, if you are lucky enough, you'll be seeing your grandchildren marry as well
      </p>
      <p className="text-font" style={{ fontSize: '20px'}}>
      But mind you, these will only happen if things go right for you. Things might go wrong, yes, but life is always a challenge and standing up when you fall is what makes people achieve all these goals. But i know you would experience unending happiness throughout your lifetime. 
     </p>
     <p className="text-font" style={{ fontSize: '25px'}}>Happy Cake Day Esther!</p>
    </animated.div>
  );
};


const BulbScreen = () => {
  const navigate = useNavigate();

  const [showButton, setShowButton] = useState(true);
  const [showGift, setShowGift] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false); // State to control balloon visibility
  const [balloons, setBalloons] = useState([]);
  const [showScrollingText, setShowScrollingText] = useState(true); // State to control scrolling text visibility
  const [showCelebrateButton, setShowCelebrateButton] = useState(false); // State to control "Let's celebrate" button visibility

  useEffect(() => {
    const maxBalloons = 20; // Maximum number of balloons
    let createdBalloons = 0; // Counter for created balloons
    let intervalId;

    // Function to create a new balloon
    const createBalloon = () => {
      if (createdBalloons >= maxBalloons) return; // Check if maximum balloons reached
      const newBalloon = {
        id: Date.now(), // Unique identifier for each balloon
        position: { left: `${Math.random() * 90 + 5}%`, bottom: '-10%' }, // Initial position at the bottom
      };
      setBalloons(prevBalloons => [...prevBalloons, newBalloon]); // Add the new balloon to the list
      createdBalloons++; // Increment the counter
      if (createdBalloons >= maxBalloons) clearInterval(intervalId); // Stop creating balloons if max is reached
    };

    if (showBalloons) {
      // Create a new balloon every 1 second if balloons are visible
      intervalId = setInterval(createBalloon, 1000);
    }

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [showBalloons]); // Run whenever showBalloons state changes

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCelebrateButton(true);
    }, 60000); // 20 seconds in milliseconds

    return () => clearTimeout(timer);
  }, []);

  const handleTurnOnMusic = () => {
    const audio1 = new Audio('/assets/birthday.mp3');
    audio1.play();

    // Set a timeout to play the second song after 2 minutes
    setTimeout(() => {
      audio1.pause();
      const audio2 = new Audio('/assets/mistake.mp3');
      audio2.play();
    }, 70000); // 2 minutes in milliseconds

    setShowButton(false);

    setTimeout(() => {
      setShowButton(false); // Hide the music button
      setShowGift(true);
    }, 10000);
  };

  const handleOpenGift = () => {
    setShowGift(false);
    setShowBanner(true);
    setShowBalloons(true); // Show balloons when gift is clicked
  };

  const handleScrollingTextComplete = () => {
    setShowScrollingText(false); 
  };

  const handleCelebrateButtonClick = () => {
    navigate('/gallery');
  };


  return (
    <div className={`bulb-container bulb-background ${showButton ? 'show-button' : ''}`}>
      {showButton && (
        <div className="music-container">
          <img
            src={musicImage}
            alt="Turn on music"
            className="music-icon"
            onClick={handleTurnOnMusic}
          />
          <h5>Turn on Music</h5>
        </div>
      )}
      {showGift && (
        <div className="music-container">
          <img
            src={giftImage}
            alt="Open gift"
            className="music-icon"
            onClick={handleOpenGift}
          />
          <h5>Open the Gift</h5>
        </div>
      )}
      {showBanner && (
        <div className="gift-container">
          <img src={bannerImage} alt="Banner" className="banner-image" />
        </div>
      )}
      {showBalloons && (
        balloons.map(balloon => (
          <Balloon key={balloon.id} position={balloon.position} />
        ))
      )}

      {showBalloons && (
        showScrollingText && <ScrollingText showBanner={showBanner} onComplete={handleScrollingTextComplete} />
      )}

      {showCelebrateButton && (
        <button className="celebrate-button" onClick={handleCelebrateButtonClick}>Dont Click!</button>
      )}
    </div>
  );
};

export default BulbScreen;
