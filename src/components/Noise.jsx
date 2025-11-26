import React from 'react';

const Noise = () => {
    return (
        <div className="fixed -top-1/2 -left-1/2 w-[200%] h-[200%] z-50 pointer-events-none opacity-[0.15] mix-blend-screen">
            <svg className="w-full h-full">
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.4"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                    <feComponentTransfer>
                        <feFuncA type="table" tableValues="0 0.5 0" />
                    </feComponentTransfer>
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" className="noise-rect" />
            </svg>
            <style>{`
                @keyframes noise-animation {
                    0% { transform: translate(0, 0); }
                    10% { transform: translate(-5%, -5%); }
                    20% { transform: translate(-10%, 5%); }
                    30% { transform: translate(5%, -10%); }
                    40% { transform: translate(-5%, 15%); }
                    50% { transform: translate(-10%, 5%); }
                    60% { transform: translate(15%, 0); }
                    70% { transform: translate(0, 10%); }
                    80% { transform: translate(-15%, 0); }
                    90% { transform: translate(10%, 5%); }
                    100% { transform: translate(5%, 0); }
                }
                .noise-rect {
                    animation: noise-animation 2s steps(10) infinite;
                }
            `}</style>
        </div>
    );
};

export default Noise;
