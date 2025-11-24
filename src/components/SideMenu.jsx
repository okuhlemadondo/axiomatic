import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { POSTS } from '../data/posts';

const SideMenu = ({ isOpen, onClose }) => {
    const [expandedSection, setExpandedSection] = useState(null);

    React.useEffect(() => {
        if (isOpen) {
            setExpandedSection(null);
        }
    }, [isOpen]);

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const categories = [
        { id: 'SCIENCE', label: 'SCIENCE', path: '/science', color: 'text-cyan-400' },
        { id: 'ENGINEERING', label: 'ENGINEERING', path: '/engineering', color: 'text-amber-400' },
        { id: 'PHILOSOPHY', label: 'PHILOSOPHY', path: '/philosophy', color: 'text-violet-400' },
        { id: 'PERSONAL', label: 'PERSONAL', path: '/personal', color: 'text-red-500' },
    ];

    const getPostsByCategory = (category) => {
        return POSTS.filter(post => post.category === category);
    };

    const menuVariants = {
        closed: { x: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
        open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
    };

    const backdropVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={backdropVariants}
                        onClick={onClose}
                    />

                    {/* Menu Panel */}
                    <motion.div
                        className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-cyber-black border-l border-cyber-border z-[70] flex flex-col shadow-2xl shadow-cyan-900/20"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-cyber-border">
                            <span className="font-mono text-sm tracking-widest text-cyber-text">NAVIGATION // SYSTEM</span>
                            <button onClick={onClose} className="text-cyber-white hover:text-cyan-400 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-2">
                            {/* Home Link */}
                            <Link
                                to="/"
                                className="block py-4 text-xl font-mono font-bold text-cyber-white hover:text-cyan-400 transition-colors border-b border-cyber-border/50"
                                onClick={onClose}
                            >
                                {'>'} HOME
                            </Link>

                            {/* Categories */}
                            {categories.map((category) => {
                                const categoryPosts = getPostsByCategory(category.id);
                                const isExpanded = expandedSection === category.id;

                                return (
                                    <div key={category.id} className="border-b border-cyber-border/50">
                                        <button
                                            onClick={() => toggleSection(category.id)}
                                            className={`w-full flex items-center justify-between py-4 text-left group ${isExpanded ? category.color : 'text-cyber-text hover:text-cyber-white'}`}
                                        >
                                            <span className="font-mono text-lg tracking-wider flex items-center gap-3">
                                                {isExpanded ? '> ' : ''} {category.label}
                                            </span>
                                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                        </button>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pl-6 pb-4 space-y-3">
                                                        {/* Link to main category page */}
                                                        <Link
                                                            to={category.path}
                                                            className={`block font-mono text-xs ${category.color} opacity-70 hover:opacity-100 transition-opacity uppercase tracking-widest mb-4`}
                                                            onClick={onClose}
                                                        >
                                                            [VIEW ALL {category.label}]
                                                        </Link>

                                                        {/* List of Posts */}
                                                        {categoryPosts.length > 0 ? (
                                                            categoryPosts.map(post => (
                                                                <div key={post.id} className="group/post cursor-pointer">
                                                                    {/* Note: In a real app, this might link to a post detail page. 
                                                                         For now, we might just link to the category page or handle selection if we had a global context for the overlay.
                                                                         Since the overlay is page-local, we'll link to the category page with a hash or query param ideally, 
                                                                         but for now let's just link to the category page to keep it simple, or maybe just display titles.
                                                                         
                                                                         Actually, the user wants to "see the articles". 
                                                                         I'll render them as simple text items for now, or links if we had individual post routes.
                                                                         Given the current architecture uses overlays on category pages, linking directly to a post is tricky without refactoring routing.
                                                                         I will link to the category page for now.
                                                                     */}
                                                                    <Link to={`${category.path}?post=${post.id}`} onClick={onClose} className="block">
                                                                        <div className="font-sans text-sm text-cyber-text group-hover/post:text-cyber-white transition-colors line-clamp-1">
                                                                            {post.title}
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="font-mono text-xs text-cyber-text/40 italic">
                                                                // NO_DATA_FOUND
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-cyber-border flex flex-col gap-4">
                            <Link
                                to="/about"
                                className="font-mono text-sm text-cyber-text hover:text-cyber-white transition-colors tracking-widest flex items-center gap-2"
                                onClick={onClose}
                            >
                                <span>[?]</span> ABOUT_OPERATOR
                            </Link>
                            <div className="font-mono text-xs text-cyber-text/60 text-center pt-4 border-t border-cyber-border/30">
                                SYSTEM_STATUS: ONLINE
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SideMenu;
