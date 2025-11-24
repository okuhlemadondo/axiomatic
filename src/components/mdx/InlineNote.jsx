import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InlineNote = ({ children, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <span className="relative inline-block">
            <span
                className="cursor-pointer text-cyber-white border-b border-cyber-white/30 hover:border-cyber-white transition-colors"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onClick={() => setIsOpen(!isOpen)}
            >
                {children}
            </span>
            <AnimatePresence>
                {isOpen && (
                    <motion.span
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-cyber-dark border border-cyber-border text-xs text-cyber-text shadow-xl z-50 backdrop-blur-md"
                    >
                        {content}
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    );
};

export default InlineNote;
