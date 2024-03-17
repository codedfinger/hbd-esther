import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bulbImage from '../images/bulb.png'; // Import the bulb image
import '../styles/styles.css'; // Import the styles

const TypingEffect = ({ text, onFinish }) => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
  // Add the class to the body when the component mounts
  document.body.classList.add('celebration-screen-body');

  // Remove the class from the body when the component unmounts
  return () => {
    document.body.classList.remove('celebration-screen-body');
  };
}, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setTypedText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        setTimeout(() => {
          setIsVisible(false);
          onFinish(); // Call onFinish when text has finished typing
        }, 5000); // Delay before hiding the text
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [currentIndex, text, onFinish]);

  return isVisible ? <div className="typing-text text-font">{typedText}</div> : null;
};

const CelebrationScreen = () => {
  const navigate = useNavigate();
  const [showMainContent, setShowMainContent] = useState(false);
  const [showTurnOnText, setShowTurnOnText] = useState(false);

  useEffect(() => {
    document.body.classList.add('celebration-screen');
    return () => {
      document.body.classList.remove('celebration-screen');
    };
  }, []);

  const handleCelebrateClick = () => {
    navigate('/bulbs');
  };

  const handleFinishTurnOnText = () => {
    setShowMainContent(true); // Show main content after typing finishes
  };

  const handleFinishTyping = () => {
    setShowTurnOnText(true); // Show "Turn on the lights" text after "Hey, It's so dark in here" finishes typing
  };

  return (
    <div className="container">
      <TypingEffect text="Hey, It's so dark in here" onFinish={handleFinishTyping} />
      {showTurnOnText && (
        <TypingEffect text="Turn on the lights" onFinish={handleFinishTurnOnText} />
      )}
      {showMainContent && (
        <>
          {/* <h1 className="header" style={{ marginTop: '5vh' }}>Let's celebrate Your Birthday Esther!</h1> */}
          <div className="bulb-container" style={{ marginTop: '20px' }}>
            <img src={bulbImage} alt="Bulb" className="bulb-image" onClick={handleCelebrateClick} />
          </div>
          <h4 className="header" style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>Click the light bulb</h4>
        </>
      )}
    </div>
  );
};

export default CelebrationScreen;
