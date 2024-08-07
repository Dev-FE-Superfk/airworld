'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Logo } from '@/../public';
import City from '@/components/City/page'; // Pastikan komponen City diimpor dengan benar
import './video.scss';

const InteractiveVideo = () => {
  const [isPaused, setIsPaused] = useState(true); // Mulai dengan video terpause
  const [showButton, setShowButton] = useState(false);
  const [introBoxVisible, setIntroBoxVisible] = useState(true); // Kontrol visibilitas intro_box
  const [showCity, setShowCity] = useState(false); // Kontrol visibilitas komponen City
  const [cityLoaded, setCityLoaded] = useState(false); // Kontrol jika City sudah dirender
  const videoRef = useRef(null);
  const cityRef = useRef(null);

  useEffect(() => {
    if (showCity) {
      const checkRenderComplete = () => {
        if (cityRef.current) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setCityLoaded(true);
            });
          });
        }
      };
      setTimeout(checkRenderComplete, 500); // Adjust timeout if necessary
    }
  }, [showCity]);

  const handleWhiteButtonClick = () => {
    setIntroBoxVisible(false); // Sembunyikan intro_box
    if (videoRef.current) {
      videoRef.current.play();
      setIsPaused(false);

      const timer = setTimeout(() => {
        setShowButton(true);
        if (videoRef.current) {
          videoRef.current.pause();
          setIsPaused(true);
        }
      }, 4000); // Ganti 5000 dengan waktu yang diinginkan dalam milidetik

      return () => clearTimeout(timer);
    }
  };

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPaused(false);
      setShowButton(false);
    }
  };

  const handleVideoEnded = () => {
    setShowCity(true); // Tampilkan komponen City setelah video selesai
  };

  return (
    <div>
      <video ref={videoRef} width="600" onEnded={handleVideoEnded}>
        <source src="/videos/Video_Intro_Airworld.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {introBoxVisible && (
        <div className="intro_box">
          <div className="intro_flex">
            <Image src={Logo} alt='' width={198} height={225} quality={100} />
            <div className="intro_text">
              ... is a Solana-based platform that powers immersive and rewarding user experiences via virtual-to-real world gamification
            </div>
            <button className='white_btn' onClick={handleWhiteButtonClick}>Enter</button>
          </div>
        </div>
      )}
      {showButton && (
        <div className="letsgo_box">
          <button className='letsgo_btn' onClick={handlePlayClick}>Let's Go</button>
        </div>
      )}
      {showCity && (
        <div
          style={{ position: 'relative', zIndex: 100 }}
          className={`city ${cityLoaded ? 'fade-in' : ''}`}
          ref={cityRef}
        >
          <City />
        </div>
      )}
    </div>
  );
};

export default InteractiveVideo;
