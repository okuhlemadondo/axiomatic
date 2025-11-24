import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Grid, Disc } from 'lucide-react'; // Keeping import just in case, or removing if strictly unused. Actually, let's remove them to be clean.
// Wait, I can't comment inside imports easily with replace_file_content if I want to be precise.
// Let's just remove the specific named imports.
import { } from 'lucide-react'; // This might be invalid if empty.
// Better to just remove the line if no other icons are used.
// Checking file content... "import { Grid, Disc } from 'lucide-react';"
// Are there other icons? No other icons from lucide-react seem to be used in the file view I saw.
// Let's check if I missed any.
// I see no other usage of lucide-react components in the file view (lines 1-171).
// So I will remove the import line.
import Galaxy from './Galaxy';
import Dither from './Dither';
import Waves from './Waves';
import LiquidEther from './LiquidEther';

import StaggeredText from './StaggeredText';

const Hero = ({ title = "AXIOMATIC", subtitle, theme = "default", startAnimation = true }) => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getFullYear()).slice(-2)}`;

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-cyber-black">
            {/* Dynamic Backgrounds */}
            <div className="absolute inset-0 z-0">
                {theme === 'science' && <Galaxy />}
                {theme === 'engineering' && <Dither />}
                {theme === 'philosophy' && <Waves lineColor="rgba(167, 139, 250, 0.5)" />}
                {theme === 'personal' && (
                    <div className="absolute inset-0">
                        <LiquidEther
                            colors={['#FF0000', '#8B0000', '#FF4D4D']}
                            mouseForce={20}
                            cursorSize={100}
                            isViscous={false}
                            viscous={30}
                            iterationsViscous={32}
                            iterationsPoisson={32}
                            resolution={0.5}
                            isBounce={false}
                            autoDemo={true}
                            autoSpeed={0.5}
                            autoIntensity={2.2}
                            takeoverDuration={0.25}
                            autoResumeDelay={3000}
                            autoRampDuration={0.6}
                        />
                        <div className="absolute inset-0 bg-cyber-black/40 pointer-events-none" />
                    </div>
                )}
            </div>

            <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />
            <div className="absolute inset-0 scanline opacity-10 pointer-events-none" />

            <motion.div
                style={{ y: y1, opacity }}
                className="relative z-10 text-center px-4 max-w-7xl mx-auto w-full flex flex-col items-center justify-center pointer-events-none"
            >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5 }}
                    className="font-mono text-cyber-text mb-6 tracking-widest text-xs border-b border-cyber-border inline-block pb-1"
                >
                    {theme === 'personal' ? 'FROM_WITHIN' : 'FROM_AXIOMS'} // {dateStr}
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={startAnimation ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`text-4xl max-[530px]:text-3xl md:text-8xl font-display font-extrabold tracking-tighter mb-8 uppercase ${theme === 'science' ? 'text-cyan-400' : theme === 'engineering' ? 'text-amber-400' : theme === 'philosophy' ? 'text-violet-400' : theme === 'personal' ? 'text-red-500' : 'text-cyber-white'}`}
                >
                    {title}
                </motion.h1>
                <div className="max-w-2xl mx-auto text-center md:text-left font-sans text-sm md:text-lg leading-loose text-cyber-text/80 space-y-2">
                    {subtitle || (
                        <div className="max-w-2xl mx-auto text-center font-sans text-sm md:text-lg leading-loose text-cyber-text/80 space-y-2">
                            <StaggeredText delay={0.2} start={startAnimation} className="justify-center">
                                <p>
                                    <span className="text-cyber-white font-bold text-lg md:text-2xl inline-block animate-pulse-slow">
                                        axiomatic
                                    </span>
                                    <span className="mx-3 text-cyber-border">|</span>
                                    <span className="italic text-base md:text-xl">(adj.)</span>
                                </p>
                            </StaggeredText>
                            <StaggeredText delay={0.6} start={startAnimation} className="justify-center">
                                <p>
                                    1. self-evident or unquestionable.
                                </p>
                            </StaggeredText>
                            <StaggeredText delay={1.0} start={startAnimation} className="justify-center">
                                <p>
                                    2. relating to or containing axioms.
                                </p>
                            </StaggeredText>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Technical Background Elements */}


            <motion.div
                style={{ opacity }}
                className={`absolute bottom-10 left-1/2 -translate-x-1/2 animate-pulse ${theme === 'science' ? 'text-cyan-400' : theme === 'engineering' ? 'text-amber-400' : theme === 'philosophy' ? 'text-violet-400' : theme === 'personal' ? 'text-red-500' : 'text-cyber-text'}`}
            >
                <span className="font-mono text-xs tracking-widest">SCROLL_TO_READ</span>
            </motion.div>
        </section>
    );
};

export default Hero;
