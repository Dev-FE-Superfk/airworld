// components/VideoPlayer.js
'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import City from "../City/page";
import { Logo } from '../../../public';
import './video.scss';

const VideoPlayer = () => {
  const videoList = [
    "/videos/Video_Intro_Airworld_A.mp4",
    "/videos/Video_Intro_Airworld_B.mp4",
  ];
  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null); // Start with no video playing
  const [showPlayButton, setShowPlayButton] = useState(true); // Show play1 button initially
  const [showCityComponent, setShowCityComponent] = useState(false); // State to control rendering of City component
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    if (currentVideoIndex === 0) {
      setShowPlayButton(true); // Show play2 button after first video ends
    } else if (currentVideoIndex === 1) {
      setShowCityComponent(true); // Show City component after second video ends
    }
  };

  const handlePlayClick = () => {
    if (currentVideoIndex === null) {
      setCurrentVideoIndex(0); // Start playing the first video
    } else if (currentVideoIndex === 0) {
      setCurrentVideoIndex(1); // Start playing the second video
    }
    setShowPlayButton(false); // Hide play button while video is playing
    videoRef.current.load();
    videoRef.current.play();
  };

  useEffect(() => {
    if (showCityComponent) {
      console.log('City component is now visible');
    }
  }, [showCityComponent]);
  return (
    <div>
      {showPlayButton && currentVideoIndex === null && (
        <div className="intro_box">
            <div className="intro_flex">
                <Image src={Logo} alt='' width={198} height={225} quality={100}></Image>
                <div className="intro_text">
                ... is a Solana-based platform that powers immersive and rewarding user experiences via virtual-to-real world gamification
                </div>
                <button className='white_btn' onClick={handlePlayClick}>Enter</button>
            </div>
        </div>
      )}
      {showPlayButton && currentVideoIndex === 0 && (
        <div className="letsgo_box">
            <button className='letsgo_btn' onClick={handlePlayClick}>Let's Go</button>       
        </div>
      )}
      <video
        width="600"
        ref={videoRef}
        onEnded={handleVideoEnd}
        preload="auto" // Preload video
      >
        {currentVideoIndex !== null && (
          <source src={videoList[currentVideoIndex]} type="video/mp4" />
        )}
        Your browser does not support the video tag.
      </video>
      {showCityComponent && <div style={{position:'relative',zIndex:'100'}}><City /></div>} {/* Render City component when showCityComponent is true */}
    </div>
  );
};

export default VideoPlayer;