import React, { useState, useEffect, Suspense, lazy, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Noise from './components/Noise';
import TargetCursor from './components/TargetCursor';
import Intro from './components/Intro';
import Lenis from 'lenis';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const Science = lazy(() => import('./pages/Science'));
const Engineering = lazy(() => import('./pages/Engineering'));
const Philosophy = lazy(() => import('./pages/Philosophy'));
const About = lazy(() => import('./pages/About'));
const Personal = lazy(() => import('./pages/Personal'));

const App = () => {
    const location = useLocation();
    const [showIntro, setShowIntro] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const lenisRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(pointer: coarse)").matches);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });
        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        if (!showIntro && !isMobile) {
            document.body.classList.add('no-cursor');
        } else {
            document.body.classList.remove('no-cursor');
        }
    }, [showIntro, isMobile]);

    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);

    return (
        <div className="bg-cyber-black min-h-screen relative selection:bg-cyber-white selection:text-cyber-black">
            {!isMobile && (
                <TargetCursor
                    targetSelector="a, button, .cursor-target, .cursor-pointer"
                    spinDuration={2}
                    hideDefaultCursor={true}
                    parallaxOn={true}
                />
            )}
            {!isMobile && <Noise />}
            <AnimatePresence mode="wait">
                {showIntro && <Intro onComplete={() => setShowIntro(false)} />}
            </AnimatePresence>

            {!showIntro && (
                <>
                    <Nav />
                    <main className="relative z-10">
                        <Suspense fallback={<div className="h-screen w-full bg-cyber-black flex items-center justify-center text-cyber-text font-mono text-xs">LOADING_MODULES...</div>}>
                            <Routes location={location} key={location.pathname}>
                                <Route path="/" element={<Home startAnimation={!showIntro} />} />
                                <Route path="/science" element={<Science />} />
                                <Route path="/engineering" element={<Engineering />} />
                                <Route path="/philosophy" element={<Philosophy />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/personal" element={<Personal />} />
                            </Routes>
                        </Suspense>
                    </main>
                    <Footer />
                </>
            )}
        </div>
    );
};

export default App;
