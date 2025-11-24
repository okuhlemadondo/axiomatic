import React from 'react';
import { Github, Instagram } from 'lucide-react';
import XLogo from './XLogo';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-8 bg-cyber-black border-t border-cyber-border/30 relative z-10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Copyright / Brand */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <div className="font-mono font-bold text-xl text-cyber-white tracking-tighter">
                        AXIOMATIC
                    </div>
                    <div className="font-mono text-[10px] text-cyber-text/60 tracking-widest">
                        © {currentYear} // ALL_RIGHTS_RESERVED
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-6">
                    <a
                        href="https://github.com/okuhlemadondo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyber-text hover:text-cyber-white transition-colors duration-300 group"
                        aria-label="GitHub"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <a
                        href="https://x.com/okuhlemadondo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyber-text hover:text-cyber-white transition-colors duration-300 group"
                        aria-label="X (Twitter)"
                    >
                        <XLogo className="w-4 h-4 fill-current" />
                    </a>
                    <a
                        href="https://instagram.com/okuhlemadondo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyber-text hover:text-cyber-white transition-colors duration-300 group"
                        aria-label="Instagram"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5"
                        >
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <path d="M2 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z" opacity="0" />
                            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" />
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                    </a>
                </div>

                {/* System Status / Decorative */}
                <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-cyber-text/40 tracking-widest">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    SYSTEM_ONLINE
                </div>
            </div>
        </footer>
    );
};

export default Footer;
