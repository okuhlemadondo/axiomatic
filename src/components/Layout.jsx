import React from 'react';
import Nav from './Nav';
import { Github, Instagram } from 'lucide-react';
import XLogo from './XLogo';
import Noise from '../Noise';

const Footer = () => (
    <footer className="py-12 px-6 border-t border-cyber-border mt-20 bg-cyber-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-cyber-text font-mono text-xs tracking-widest flex items-center gap-2">
                <span className="text-lg">©</span> {new Date().getFullYear()} AXIOMATIC // ALL RIGHTS RESERVED
            </div>
            <div className="flex gap-6">
                <a href="https://github.com/okuhlemadondo" target="_blank" rel="noopener noreferrer" className="text-cyber-text hover:text-cyber-white transition-colors">
                    <Github className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/okuhlemadondo/" target="_blank" rel="noopener noreferrer" className="text-cyber-text hover:text-cyber-white transition-colors">
                    <Instagram className="w-5 h-5" />
                </a>
                <a href="https://x.com/OkuhleMadondo" target="_blank" rel="noopener noreferrer" className="text-cyber-text hover:text-cyber-white transition-colors">
                    <XLogo className="w-5 h-5" />
                </a>
            </div>
        </div>
    </footer>
);

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-cyber-black selection:bg-cyber-white selection:text-cyber-black overflow-x-hidden">
            <Nav />
            <main>
                {children}
            </main>
            <Footer />
            <Noise />
        </div>
    );
};

export default Layout;
