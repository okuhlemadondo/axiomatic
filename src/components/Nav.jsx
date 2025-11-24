import React, { useState, useRef } from 'react';
import { motion, useScroll, useMotionValue, useTransform } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SideMenu from './SideMenu';
import Logo from './Logo';

const Nav = () => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const logoRef = useRef(null);

    // Fade out nav links when scrolling down past 75% of viewport height
    // Assuming 100vh is roughly 800-1000px, 75vh is ~600-750px. 
    // Let's use a safe value or percentage if possible, but useTransform works with pixels usually.
    // We can just use a fixed pixel value that represents "past the hero".
    const navLinksOpacity = useTransform(scrollY, [0, 600], [1, 0]);
    const navLinksPointerEvents = useTransform(scrollY, (value) => value > 600 ? 'none' : 'auto');

    useMotionValue(scrollY).on("change", (latest) => {
        setIsScrolled(latest > 50);
    });

    useGSAP(() => {
        gsap.to(logoRef.current, {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "linear"
        });
    }, { scope: logoRef });

    const links = [
        { name: 'SCIENCE', path: '/science', label: '[SCI]', color: 'text-cyan-400' },
        { name: 'ENGINEERING', path: '/engineering', label: '[ENG]', color: 'text-amber-400' },
        { name: 'PHILOSOPHY', path: '/philosophy', label: '[PHI]', color: 'text-violet-400' }
    ];

    const getThemeColor = () => {
        const currentLink = links.find(link => location.pathname === link.path);
        if (currentLink) return currentLink.color;
        if (location.pathname === '/personal') return 'text-red-500';
        return 'text-cyber-white';
    };

    const themeColor = getThemeColor();

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 border-b ${isScrolled ? 'bg-cyber-black/90 border-cyber-border backdrop-blur-sm' : 'bg-transparent border-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "circOut" }}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center relative">
                    <Link to="/" className={`flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity ${themeColor}`}>
                        <div ref={logoRef}>
                            <Logo size={40} />
                        </div>
                        <span className="font-mono font-bold text-lg tracking-tighter">AXIOMATIC</span>
                    </Link>
                    <motion.div
                        style={{ opacity: navLinksOpacity, pointerEvents: navLinksPointerEvents }}
                        className="hidden md:flex gap-8 font-mono text-xs tracking-widest text-cyber-text absolute left-1/2 -translate-x-1/2"
                    >
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`hover:text-cyber-white transition-colors uppercase ${location.pathname === link.path ? `${link.color} font-bold underline underline-offset-4` : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </motion.div>
                    <button
                        className="p-2 hover:bg-cyber-white/10 rounded-none border border-transparent hover:border-cyber-border transition-all"
                        aria-label="Menu"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <Menu className={`w-5 h-5 ${themeColor}`} />
                    </button>
                </div>
            </motion.nav>
            <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default Nav;
