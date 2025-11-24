import React, { useRef, useEffect } from 'react';

const Noise = ({
    patternSize = 250,
    patternScaleX = 1,
    patternScaleY = 1,
    patternRefreshInterval = 2,
    patternAlpha = 15,
}) => {
    const grainRef = useRef(null);

    useEffect(() => {
        const frame = () => {
            if (grainRef.current) {
                grainRef.current.setAttribute('seed', Math.random() * 100);
            }
            requestAnimationFrame(frame);
        };

        const animationId = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none w-full h-full overflow-hidden">
            <svg
                className="absolute w-full h-full opacity-20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <filter id="noiseFilter">
                    <feTurbulence
                        ref={grainRef}
                        type="fractalNoise"
                        baseFrequency="0.4"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="3" intercept="-1.5" />
                    </feComponentTransfer>
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    );
};

export default Noise;
