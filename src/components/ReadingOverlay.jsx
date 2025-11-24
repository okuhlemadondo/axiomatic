import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal } from 'lucide-react';
import DecryptedText from './DecryptedText';
import StaggeredText from './StaggeredText';

const ReadingOverlay = ({ post, onClose, articleIndex }) => {
    const [contentVisible, setContentVisible] = useState(false);

    useEffect(() => {
        if (post) {
            setContentVisible(false);
            // Delay content fade-in to allow title typing to start/finish
            const timer = setTimeout(() => setContentVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, [post]);

    if (!post) return null;

    // Format title: replace underscores with spaces
    const formattedTitle = post.title.replace(/_/g, ' ');

    return createPortal(
        <AnimatePresence>
            {post && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 bg-cyber-black/90 md:backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="bg-cyber-black border border-cyber-white w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col no-scrollbar"
                        onClick={(e) => e.stopPropagation()}
                        data-lenis-prevent
                    >
                        {/* Header Bar */}
                        <div className="sticky top-0 z-20 bg-cyber-black border-b border-cyber-white flex justify-between items-center px-6 py-4">
                            <div className="font-mono text-xs text-cyber-white">
                                READING_MODE // {(articleIndex || 0).toString().padStart(3, '0')}
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-cyber-white hover:text-cyber-black transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8 md:p-16">
                            <div className="flex flex-row justify-between items-end gap-4 mb-8 border-b border-cyber-border pb-6">
                                <motion.div
                                    initial={{ opacity: 0, filter: 'blur(5px)' }}
                                    animate={contentVisible ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(5px)' }}
                                    transition={{ duration: 1.0, delay: 0.2 }}
                                    className="shrink-0"
                                >
                                    <Link to="/about" className="group flex items-center gap-4 no-underline flex-row-reverse">
                                        <div className="flex flex-col items-start">
                                            <span className="text-xs md:text-sm font-display font-bold text-cyber-white group-hover:text-cyan-400 transition-colors text-left tracking-wide">Okuhle Madondo</span>
                                            <span className="text-[9px] md:text-[10px] font-mono text-cyber-text tracking-widest text-left">AUTHOR // ARCHITECT</span>
                                        </div>
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-cyber-dark border border-cyber-border overflow-hidden relative group-hover:border-cyber-white transition-colors shrink-0">
                                            {/* Placeholder for portrait */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-cyber-border to-transparent opacity-50"></div>
                                            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-cyber-text">OM</div>
                                        </div>
                                    </Link>
                                </motion.div>

                                <div className="font-mono text-[10px] md:text-xs text-cyber-text w-auto text-right">
                                    <div className="md:hidden flex flex-col gap-1 items-end text-[9px]">
                                        <div className="whitespace-nowrap">
                                            <DecryptedText
                                                text={`CAT: ${post.category}`}
                                                animateOn="view"
                                                speed={50}
                                                sequential={true}
                                                className="inline-block"
                                            />
                                        </div>
                                        <div className="whitespace-nowrap">
                                            <DecryptedText
                                                text={`DATE: ${post.date}`}
                                                animateOn="view"
                                                speed={50}
                                                sequential={true}
                                                className="inline-block"
                                                startDelay={500}
                                            />
                                        </div>
                                        <div className="whitespace-nowrap">
                                            <DecryptedText
                                                text={`TIME: ${post.readTime}`}
                                                animateOn="view"
                                                speed={50}
                                                sequential={true}
                                                className="inline-block"
                                                startDelay={1000}
                                            />
                                        </div>
                                    </div>
                                    <div className="hidden md:block mb-3">
                                        <DecryptedText
                                            text={`CAT: ${post.category} // DATE: ${post.date} // TIME: ${post.readTime}`}
                                            animateOn="view"
                                            speed={50}
                                            sequential={true}
                                            className="inline-block"
                                        />
                                    </div>
                                </div>
                            </div>

                            {post.audioTrack && (
                                <div className="mb-12 p-4 border border-cyber-border bg-cyber-dark/50 flex items-center gap-4">
                                    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-cyber-white text-cyber-white hover:bg-cyber-white hover:text-cyber-black transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                    </button>
                                    <div className="flex-1">
                                        <div className="text-xs font-mono text-cyber-text mb-1">AUDIO_TRACK // {post.title}</div>
                                        <div className="h-1 w-full bg-cyber-black border border-cyber-border relative">
                                            <div className="absolute top-0 left-0 h-full w-1/3 bg-cyber-white/50"></div>
                                        </div>
                                    </div>
                                    <div className="font-mono text-xs text-cyber-white">00:00 / 12:45</div>
                                </div>
                            )}

                            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-none tracking-tighter uppercase min-h-[1.2em] break-words hyphens-auto">
                                <StaggeredText start={true} delay={0.2}>
                                    {formattedTitle}
                                </StaggeredText>
                            </h2>



                            <motion.div
                                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                                animate={contentVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 40, filter: 'blur(10px)' }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="prose prose-invert prose-base md:prose-lg max-w-none font-sans text-cyber-text"
                            >
                                {post.component ? <post.component /> : (
                                    <>
                                        <p className="lead text-xl text-cyber-white mb-8 font-mono border-l-4 border-cyber-white pl-6">{post.excerpt}</p>
                                        <p>{post.content}</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    </>
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={contentVisible ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="mt-16 pt-8 border-t border-cyber-border flex justify-between items-center"
                            >
                                <div className="flex gap-4">
                                    <button className="px-8 py-3 border border-cyber-white hover:bg-cyber-white hover:text-cyber-black transition-colors font-mono text-sm uppercase tracking-widest">
                                        SHARE
                                    </button>
                                </div>
                                <Terminal className="w-5 h-5 text-cyber-text" />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ReadingOverlay;
