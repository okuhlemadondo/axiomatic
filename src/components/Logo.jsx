import React from 'react';
import logoImg from '../assets/logo_v2.png';

const Logo = ({ size = 40 }) => {
    return (
        <div
            className="relative rounded-full overflow-hidden border border-cyber-white/20"
            style={{ width: size, height: size }}
        >
            <img
                src={logoImg}
                alt="Axiomatic Logo"
                className="w-full h-full object-cover scale-110"
            />
        </div>
    );
};

export default Logo;
