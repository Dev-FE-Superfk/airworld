'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Who, When, Where, How, What, Why, McAlien, McBirdman, McGirl, McFarmer, McHeadset, McSleeper } from '../../../public';
import './navbar.scss';

export default function NavBar() {
    const [isActive, setIsActive] = useState(false);
    const [activePopup, setActivePopup] = useState(null); // State to track which popup is active

    const handleMenuClick = () => {
        setIsActive(!isActive);
    };

    const handleItemClick = (popupId) => {
        setActivePopup(popupId); // Set the active popup based on the clicked item
    };

    const handleClosePopup = (event) => {
        event.stopPropagation();
        setActivePopup(null); // Close the popup
    };

    return (
        <>
            <div 
                className={`menu_burger ${isActive ? 'active' : ''}`} 
                onClick={handleMenuClick}
            >
                {/* Menu burger icon */}
            </div>
            <div className={`nav_box ${isActive ? 'active' : ''}`}>
                <div onClick={() => handleItemClick('who')}>
                    <Image src={Who} alt="" width={56} height={56} quality={100} />
                </div>
                <div onClick={() => handleItemClick('when')}>
                    <Image src={When} alt="" width={56} height={56} quality={100} />
                </div>
                <div onClick={() => handleItemClick('where')}>
                    <Image src={Where} alt="" width={56} height={56} quality={100} />
                </div>
                <div onClick={() => handleItemClick('why')}>
                    <Image src={Why} alt="" width={56} height={56} quality={100} />
                </div>
                <div onClick={() => handleItemClick('what')}>
                    <Image src={What} alt="" width={56} height={56} quality={100} />
                </div>
                <div onClick={() => handleItemClick('how')}>
                    <Image src={How} alt="" width={56} height={56} quality={100} />
                </div>
            </div>

            {/* Conditional rendering of popups based on activePopup state */}
            {activePopup === 'who' && (
                <div className="popup who" onClick={(e) => e.stopPropagation()}>
                    <div className='content'>
                        <h2>Who</h2>
                        <p><strong>AIRWORLD</strong> is driven by data analysts, data engineers, UI/UX designers, developers, devOps, animators stationed across HONG KONG, INDONESIA, SINGAPORE AND  THAILAND.</p>
                    </div>
                    <div className='mascot_box'>
                        <Image src={McAlien} width={960} height={960} alt='' />
                    </div>
                    <button className="close_btn" onClick={handleClosePopup}>Close</button>
                </div>
            )}
            {activePopup === 'when' && (
                <div className="popup when" onClick={(e) => e.stopPropagation()}>
                    <div className='content'>
                        <h2>When</h2>
                        <p>HQ in <strong>HONG KONG since 2021.</strong></p>
                    </div>
                    <div className='mascot_box'>
                        <Image src={McBirdman} width={960} height={960} alt='' />
                    </div>
                    <button className="close_btn" onClick={handleClosePopup}>Close</button>
                </div>
            )}
            {activePopup === 'where' && (
                <div className="popup where" onClick={(e) => e.stopPropagation()}>
                    <div className='content'>
                        <h2>Where</h2>
                        <p>Serving the new universe from <strong>DUBAI, HONG KONG, INDONESIA, MALAYSIA, SINGAPORE, THAILAND, VIETNAM.</strong></p>
                    </div>
                    <div className='mascot_box'>
                        <Image src={McGirl} width={960} height={960} alt='' />
                    </div>
                    <button className="close_btn" onClick={handleClosePopup}>Close</button>
                </div>
            )}
            {activePopup === 'why' && (
                <div className="popup why" onClick={(e) => e.stopPropagation()}>
                    <div className='content'>
                        <h2>Why</h2>
                        <p>Just as the personal computer transformed our way of working and the smartphone reshaped our daily interactions, AIR offers unparalleled opportunities for creativity and innovation; redefining how we connect, work, play, and live. It also democratize access to experiences and opportunities, bridging gaps created by geography, socioeconomics, and even physical ability.</p>
                    </div>
                    <div className='mascot_box'>
                        <Image src={McFarmer} width={960} height={960} alt='' />
                    </div>
                    <button className="close_btn" onClick={handleClosePopup}>Close</button>
                </div>
            )}
            {activePopup === 'what' && (
                <div className="popup what" onClick={(e) => e.stopPropagation()}>
                    <div className='content'>
                        <h2>What</h2>
                        <p>We help our clients grow their brand and revenue by driving unique Online-2-Offline engagements and actionable insights powered by our decentralized platforms i.e. <strong>AIR WORLD, AIR-VERSE and ANYWHERE.</strong></p>
                    </div>
                    <div className='mascot_box'>
                        <Image src={McSleeper} width={960} height={960} alt='' />
                    </div>
                    <button className="close_btn" onClick={handleClosePopup}>Close</button>
                </div>
            )}
            {activePopup === 'how' && (
                <div className="popup how" onClick={(e) => e.stopPropagation()}>
                    <div className='content'>
                        <h2>How</h2>
                        <p>
                            <strong>AIR WORLD</strong><br/>
                            <strong>AIR-VERSE</strong><br/>
                            <strong>ANYWHERE</strong>
                        </p>
                    </div>
                    <div className='mascot_box'>
                        <Image src={McHeadset} width={960} height={960} alt='' />
                    </div>
                    <button className="close_btn" onClick={handleClosePopup}>Close</button>
                </div>
            )}
        </>
    );
}
