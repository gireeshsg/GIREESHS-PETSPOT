import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './spinner';// Import the spinner
import './Tra.css'; // Import the CSS file

const Transitionvideo = ({ to }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Hide spinner after video duration
            navigate(to);
        }, 1600); // Duration of the video

        return () => clearTimeout(timer);
    }, [navigate, to]);

    return (
        <div className="transition-wrapper">
            {isLoading && <Spinner />} {/* Show spinner while loading */}
           
        </div>
    );
};

export default Transitionvideo;
