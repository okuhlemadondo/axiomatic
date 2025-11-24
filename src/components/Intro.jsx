import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpiralAnimation from './SpiralAnimation';

const Intro = ({ onComplete }) => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
        >
            <div className="absolute inset-0">
                <SpiralAnimation />
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <motion.button
                    onClick={onComplete}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: showButton ? 1 : 0,
                        y: showButton ? 0 : 20
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="pointer-events-auto group relative px-6 py-3 md:px-8 md:py-4 overflow-hidden max-w-[80vw] md:max-w-none"
                >
                    <span className="relative z-10 font-mono text-[10px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.5em] text-cyber-white group-hover:text-black transition-colors duration-500 whitespace-nowrap">
                        AXIOMATIC // INITIALIZE
                    </span>
                    <div className="absolute inset-0 bg-cyber-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <div className="absolute inset-0 border border-cyber-white/30 group-hover:border-transparent transition-colors duration-500" />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Intro;
