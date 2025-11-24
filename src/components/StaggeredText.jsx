import React from 'react';
import { motion } from 'framer-motion';

const StaggeredText = ({ children, delay = 0, className = "", start = true }) => {
    const text = typeof children === 'string' ? children : null;

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay }
        }
    };

    const child = {
        hidden: { opacity: 0, y: 5 },
        visible: { opacity: 1, y: 0 }
    };

    if (text) {
        return (
            <motion.div
                className={className}
                variants={container}
                initial="hidden"
                animate={start ? "visible" : "hidden"}
            >
                {text.split("").map((char, index) => (
                    <motion.span key={index} variants={child}>
                        {char}
                    </motion.span>
                ))}
            </motion.div>
        );
    }

    const recursiveRender = (node) => {
        if (typeof node === 'string') {
            return node.split("").map((char, i) => (
                <motion.span key={i} variants={child} className="inline-block whitespace-pre">
                    {char}
                </motion.span>
            ));
        }
        if (React.isValidElement(node)) {
            const { children, ...props } = node.props;
            return React.cloneElement(node, { ...props, key: Math.random() },
                Array.isArray(children) ? children.map(recursiveRender) : recursiveRender(children)
            );
        }
        return node;
    };

    return (
        <motion.div
            className={`flex flex-wrap ${className}`}
            variants={container}
            initial="hidden"
            animate={start ? "visible" : "hidden"}
        >
            {React.Children.map(children, recursiveRender)}
        </motion.div>
    );
};

export default StaggeredText;
