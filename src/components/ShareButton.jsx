import React, { useState, useRef, useEffect } from 'react';
import { Share2, Link2, Twitter, Linkedin, Facebook, Mail, MessageCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ShareButton = ({ url, title, description }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                setIsOpen(false);
            }, 2000);
        } catch (err) {
            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = url;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                    setIsOpen(false);
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
            document.body.removeChild(textArea);
        }
    };

    const shareOptions = [
        {
            name: 'Copy Link',
            icon: copied ? Check : Link2,
            onClick: handleCopyLink,
            color: 'text-cyber-white'
        },
        {
            name: '𝕏',
            icon: Twitter,
            onClick: () => {
                window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
                    '_blank',
                    'noopener,noreferrer'
                );
                setIsOpen(false);
            },
            color: 'text-cyber-white'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            onClick: () => {
                window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
                    '_blank',
                    'noopener,noreferrer'
                );
                setIsOpen(false);
            },
            color: 'text-cyber-white'
        },
        {
            name: 'Facebook',
            icon: Facebook,
            onClick: () => {
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                    '_blank',
                    'noopener,noreferrer'
                );
                setIsOpen(false);
            },
            color: 'text-cyber-white'
        },
        {
            name: 'Email',
            icon: Mail,
            onClick: () => {
                window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description || 'Check out this article'}: ${url}`)}`;
                setIsOpen(false);
            },
            color: 'text-cyber-white'
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            onClick: () => {
                window.open(
                    `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
                    '_blank',
                    'noopener,noreferrer'
                );
                setIsOpen(false);
            },
            color: 'text-cyber-white'
        }
    ];

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative px-6 py-3 font-mono text-xs tracking-widest text-cyber-text border border-cyber-border hover:border-cyber-white transition-all duration-300 overflow-hidden cursor-pointer"
                aria-label="Share article"
            >
                <div className="absolute inset-0 bg-cyber-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    <span>SHARE</span>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full mb-2 left-0 lg:left-auto lg:right-0 w-56 bg-cyber-black/95 backdrop-blur-xl border border-cyber-border shadow-2xl shadow-cyber-white/10 z-50"
                    >
                        <div className="p-2 space-y-1">
                            {shareOptions.map((option, index) => (
                                <motion.button
                                    key={option.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={option.onClick}
                                    className="w-full group relative px-4 py-3 font-mono text-xs text-left text-cyber-text hover:bg-cyber-white/10 transition-all duration-200 flex items-center gap-3 cursor-pointer border border-transparent hover:border-cyber-border"
                                >
                                    <option.icon className={`w-4 h-4 ${option.color} transition-transform duration-200 group-hover:scale-110`} />
                                    <span className="group-hover:text-cyber-white transition-colors duration-200">
                                        {option.name === 'Copy Link' && copied ? 'COPIED!' : option.name.toUpperCase()}
                                    </span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Arrow pointer */}
                        <div className="absolute -bottom-2 left-6 lg:left-auto lg:right-6 w-4 h-4 bg-cyber-black/95 border-r border-b border-cyber-border transform rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast notification for copy success */}
            <AnimatePresence>
                {copied && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-cyber-black/90 backdrop-blur-xl border border-cyber-white font-mono text-xs text-cyber-white shadow-2xl shadow-cyber-white/20 z-[100]"
                    >
                        <div className="flex items-center gap-2">
                            <Check className="w-4 h-4" />
                            <span>LINK COPIED TO CLIPBOARD</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ShareButton;
