import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const PostCard = ({ post, onClick, forceWhite = false, disableHoverLift = false }) => {
    const shouldReduceMotion = useReducedMotion();

    const getThemeColor = (category) => {
        if (forceWhite) return 'text-cyber-white group-hover:text-cyber-white/80';

        switch (category) {
            case 'SCIENCE': return 'text-cyan-400 group-hover:text-cyan-300';
            case 'ENGINEERING': return 'text-amber-400 group-hover:text-amber-300';
            case 'PHILOSOPHY': return 'text-violet-400 group-hover:text-violet-300';
            case 'PERSONAL': return 'text-red-500 group-hover:text-red-400';
            default: return 'text-cyber-white';
        }
    };

    const themeColor = getThemeColor(post.category);

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: -10 },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        duration: 0.6
                    }
                }
            }}
            className="h-full perspective-1000"
        >
            <motion.article
                onClick={onClick}
                className="group relative h-full bg-cyber-dark border border-cyber-border p-6 cursor-pointer overflow-hidden transition-all hover:border-cyber-white flex flex-col"
                whileHover={disableHoverLift ? {} : { y: -5 }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className={`w-4 h-4 -rotate-45 ${themeColor}`} />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8 font-mono text-xs text-cyber-text border-b border-cyber-border pb-2">
                        <span className={themeColor.split(' ')[0]}>{post.category}</span>
                        <span>{post.date}</span>
                    </div>

                    <h3 className={`text-xl font-bold mb-4 leading-tight ${themeColor} decoration-1 underline-offset-4`}>
                        {post.title}
                    </h3>

                    <p className="text-cyber-text text-sm leading-relaxed mb-8 flex-grow font-mono">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-mono text-cyber-text group-hover:text-cyber-white transition-colors">
                        <div className="w-2 h-2 bg-cyber-border group-hover:bg-cyber-white transition-colors" />
                        <span>READ_TIME: {post.readTime}</span>
                    </div>
                </div>
            </motion.article>
        </motion.div>
    );
};

export default PostCard;
