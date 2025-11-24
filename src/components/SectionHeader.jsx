import React from 'react';
import { motion } from 'framer-motion';

import DecryptedText from './DecryptedText';

const SectionHeader = ({ title, index, sector, color = "text-cyber-white", borderColor = "border-cyber-border" }) => {
    return (
        <div className={`flex flex-row items-end justify-between mb-12 md:mb-16 border-b ${borderColor} pb-4 relative overflow-hidden gap-2 md:gap-0`}>
            <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0 }}
                className={`absolute bottom-0 left-0 h-[1px] ${borderColor.replace('border-', 'bg-')}`}
            />

            <motion.h2
                className={`text-lg md:text-2xl font-mono font-bold tracking-tighter ${color} flex items-center shrink-0`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={{
                    hidden: { opacity: 0, x: -20, transition: { duration: 0.1 } },
                    visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.5 } }
                }}
            >
                <span className="mr-2 md:mr-4 opacity-50">//</span>
                <DecryptedText
                    text={title}
                    animateOn="view"
                    speed={100}
                    sequential={true}
                    className="inline-block"
                />
            </motion.h2>

            <motion.div
                className={`font-mono text-[10px] md:text-xs ${color} opacity-60 text-right`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={{
                    hidden: { opacity: 0, x: 20, transition: { duration: 0.1 } },
                    visible: { opacity: 0.6, x: 0, transition: { delay: 0.8, duration: 0.5 } }
                }}
            >
                <span className="block md:inline">INDEX: {index.toString().padStart(3, '0')}</span>
                <span className="hidden md:inline"> // </span>
                <span className="block md:inline">SECTOR: {sector}</span>
            </motion.div>
        </div>
    );
};

export default SectionHeader;
