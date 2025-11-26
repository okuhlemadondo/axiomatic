import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import Avatar from '../components/Avatar';
import DecryptedText from '../components/DecryptedText';
import TextType from '../components/TextType';

const About = () => {
    const [activeTooltip, setActiveTooltip] = useState(null);

    return (
        <div className="h-screen bg-cyber-black text-cyber-text flex flex-col md:flex-row overflow-hidden pt-20">
            {/* Mobile Layout: Stacked */}
            {/* Top: 3D Avatar (35% height) */}
            <div className="md:hidden w-full h-[35vh] relative border-b border-cyber-border/30 flex items-center justify-center bg-cyber-black/50 z-0 shrink-0">
                <div className="absolute inset-0 bg-cyber-grid-bg opacity-20 pointer-events-none" />
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={0.6} />
                    <spotLight position={[5, 5, 5]} angle={0.25} penumbra={1} intensity={1.5} />
                    <pointLight position={[-5, -5, -5]} intensity={0.5} />
                    <Avatar position={[0, 0.2, 0]} scale={1.1} />
                    <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 1.8} />
                    <Environment preset="city" />
                </Canvas>
            </div>

            {/* Desktop Layout: Left Side (Full Height) */}
            <div className="hidden md:flex md:w-1/2 h-full relative border-r border-cyber-border/30 items-center justify-center bg-cyber-black/50 z-0">
                <div className="absolute inset-0 bg-cyber-grid-bg opacity-20 pointer-events-none" />
                <Canvas camera={{ position: [0, 0, 4], fov: 35 }}>
                    <ambientLight intensity={0.6} />
                    <spotLight position={[5, 5, 5]} angle={0.25} penumbra={1} intensity={1.5} />
                    <pointLight position={[-5, -5, -5]} intensity={0.5} />
                    <Avatar position={[0, 0, 0]} scale={0.7} />
                    <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 1.8} />
                    <Environment preset="city" />
                </Canvas>
                <div className="absolute bottom-8 left-8 font-mono text-xs text-cyber-text/50 tracking-widest">
                    [INTERACTIVE_MODEL_VIEWER]
                    <br />
                    DRAG_TO_ROTATE
                </div>
            </div>

            {/* Right Side: Stats & Bio (Bottom on Mobile, Right on Desktop) */}
            <div className="w-full md:w-1/2 h-[65vh] md:h-full p-4 md:p-8 lg:p-12 flex flex-col justify-start md:justify-center relative overflow-y-auto z-10 bg-cyber-black md:bg-transparent backdrop-blur-none">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-border to-transparent opacity-50" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="h-full flex flex-col justify-start md:justify-center pt-4 md:pt-0 items-center md:items-start"
                >
                    <div className="font-mono text-[10px] md:text-xs text-red-500 mb-2 md:mb-4 tracking-widest text-center md:text-left">
                        // IDENTITY_VERIFIED
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-cyber-white mb-4 md:mb-6 tracking-tighter text-center md:text-left">
                        <DecryptedText
                            text="OKUHLE MADONDO"
                            animateOn="view"
                            speed={100}
                            sequential={true}
                            style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
                        />
                    </h1>
                    <div className="space-y-6 md:space-y-8 pb-20 md:pb-0">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 md:gap-6 border-t border-b border-cyber-border/30 py-4 md:py-6">
                            <div
                                className="relative group cursor-help"
                                onClick={() => setActiveTooltip(activeTooltip === 'age' ? null : 'age')}
                            >
                                <div className="font-mono text-[10px] md:text-xs text-red-500 mb-1">AGE</div>
                                <div className="text-base md:text-xl font-mono text-cyber-white border-b border-dashed border-cyber-text/30 inline-block hover:text-red-500 hover:border-red-500 transition-colors">
                                    {(() => {
                                        const birthDate = new Date('2003-03-14');
                                        const today = new Date();
                                        let age = today.getFullYear() - birthDate.getFullYear();
                                        const m = today.getMonth() - birthDate.getMonth();
                                        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                            age--;
                                        }
                                        return age;
                                    })()}
                                </div>

                                {/* Humorous Tooltip */}
                                {activeTooltip === 'age' && createPortal(
                                    <>
                                        <div className={`
                                            fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] z-[9999]
                                            md:absolute md:top-auto md:bottom-full md:left-0 md:translate-x-0 md:translate-y-0 md:w-72 md:z-50
                                            bg-cyber-black/95 border border-cyber-border p-5 shadow-[0_0_30px_-10px_rgba(239,68,68,0.2)]
                                            backdrop-blur-sm border-l-4 border-l-red-500
                                            transition-all duration-300
                                            opacity-100 visible scale-100
                                        `}>
                                            <div className="font-mono text-[10px] text-red-500/70 mb-3 tracking-widest uppercase border-b border-cyber-border/30 pb-2">
                                                // CLARIFICATION
                                            </div>
                                            <div className="font-mono text-xs text-cyber-text leading-relaxed">
                                                like...the number after {(() => {
                                                    const birthDate = new Date('2003-03-14');
                                                    const today = new Date();
                                                    let age = today.getFullYear() - birthDate.getFullYear();
                                                    const m = today.getMonth() - birthDate.getMonth();
                                                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                                        age--;
                                                    }
                                                    return age - 1;
                                                })()}
                                            </div>
                                        </div>
                                        {/* Mobile Backdrop */}
                                        <div className="fixed inset-0 bg-black/60 z-[9990]" onClick={(e) => { e.stopPropagation(); setActiveTooltip(null); }} />
                                    </>,
                                    document.body
                                )}
                            </div>

                            <div
                                className="relative group cursor-help"
                                onClick={() => setActiveTooltip(activeTooltip === 'class' ? null : 'class')}
                            >
                                <div className="font-mono text-[10px] md:text-xs text-red-500 mb-1">CLASS</div>
                                <div className="text-base md:text-lg lg:text-xl font-mono text-cyber-white border-b border-dashed border-cyber-text/30 inline-block hover:text-red-500 hover:border-red-500 transition-colors">Computational Scientist</div>

                                {/* Definition Tooltip */}
                                {activeTooltip === 'class' && createPortal(
                                    <>
                                        <div className={`
                                            fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] z-[9999]
                                            md:absolute md:top-auto md:bottom-full md:right-0 md:left-auto md:translate-x-0 md:translate-y-0 md:w-72 md:z-50
                                            bg-cyber-black/95 border border-cyber-border p-5 shadow-[0_0_30px_-10px_rgba(239,68,68,0.2)]
                                            backdrop-blur-sm border-l-4 border-l-red-500
                                            transition-all duration-300
                                            opacity-100 visible scale-100
                                        `}>
                                            <div className="font-mono text-[10px] text-red-500/70 mb-3 tracking-widest uppercase border-b border-cyber-border/30 pb-2">
                                                // DEFINITION
                                            </div>
                                            <div className="font-mono text-xs text-cyber-text leading-relaxed">
                                                A scientist who uses advanced computing capabilities to understand and solve complex physical problems.
                                            </div>
                                        </div>
                                        {/* Mobile Backdrop */}
                                        <div className="fixed inset-0 bg-black/60 z-[9990]" onClick={(e) => { e.stopPropagation(); setActiveTooltip(null); }} />
                                    </>,
                                    document.body
                                )}
                            </div>

                            <div
                                className="relative group cursor-help"
                                onClick={() => setActiveTooltip(activeTooltip === 'species' ? null : 'species')}
                            >
                                <div className="font-mono text-[10px] md:text-xs text-red-500 mb-1">SPECIES</div>
                                <div className="text-base md:text-xl font-mono text-cyber-white border-b border-dashed border-cyber-text/30 inline-block hover:text-red-500 hover:border-red-500 transition-colors">Homo Sapiens</div>

                                {/* Biological Classification Tooltip */}
                                {activeTooltip === 'species' && createPortal(
                                    <>
                                        <div className={`
                                            fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] z-[9999]
                                            md:absolute md:top-auto md:bottom-full md:left-0 md:translate-x-0 md:translate-y-0 md:w-72 md:z-50
                                            bg-cyber-black/95 border border-cyber-border p-5 shadow-[0_0_30px_-10px_rgba(239,68,68,0.2)]
                                            backdrop-blur-sm border-l-4 border-l-red-500
                                            transition-all duration-300
                                            opacity-100 visible scale-100
                                        `}>
                                            <div className="font-mono text-[10px] text-red-500/70 mb-3 tracking-widest uppercase border-b border-cyber-border/30 pb-2">
                                                // TAXONOMY_DATA
                                            </div>
                                            <div className="font-mono text-xs text-cyber-text space-y-2">
                                                <div className="flex justify-between"><span className="text-cyber-text/50">Domain:</span> <span className="text-cyber-white">Eukaryote</span></div>
                                                <div className="flex justify-between"><span className="text-cyber-text/50">Kingdom:</span> <span className="text-cyber-white">Animalia</span></div>
                                                <div className="flex justify-between"><span className="text-cyber-text/50">Phylum:</span> <span className="text-cyber-white">Chordata</span></div>
                                                <div className="flex justify-between"><span className="text-cyber-text/50">Class:</span> <span className="text-cyber-white">Mammalia</span></div>
                                                <div className="flex justify-between"><span className="text-cyber-text/50">Order:</span> <span className="text-cyber-white">Primate</span></div>
                                                <div className="flex justify-between"><span className="text-cyber-text/50">Family:</span> <span className="text-cyber-white">Hominid</span></div>
                                                <div className="flex justify-between"><span className="text-cyber-text/50">Genus:</span> <span className="text-cyber-white">Homo</span></div>
                                            </div>
                                        </div>
                                        {/* Mobile Backdrop */}
                                        <div className="fixed inset-0 bg-black/60 z-[9990]" onClick={(e) => { e.stopPropagation(); setActiveTooltip(null); }} />
                                    </>,
                                    document.body
                                )}
                            </div>

                            <div
                                className="relative group cursor-help"
                                onClick={() => setActiveTooltip(activeTooltip === 'origin' ? null : 'origin')}
                            >
                                <div className="font-mono text-[10px] md:text-xs text-red-500 mb-1">ORIGIN</div>
                                <div className="text-base md:text-xl font-mono text-cyber-white border-b border-dashed border-cyber-text/30 inline-block hover:text-red-500 hover:border-red-500 transition-colors">South Africa</div>

                                {/* Cosmic Address Tooltip */}
                                {activeTooltip === 'origin' && createPortal(
                                    <>
                                        <div className={`
                                            fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] z-[9999]
                                            md:absolute md:top-auto md:bottom-full md:right-0 md:left-auto md:translate-x-0 md:translate-y-0 md:w-72 md:z-50
                                            bg-cyber-black/95 border border-cyber-border p-5 shadow-[0_0_30px_-10px_rgba(239,68,68,0.2)]
                                            backdrop-blur-sm border-l-4 border-l-red-500
                                            transition-all duration-300
                                            opacity-100 visible scale-100
                                        `}>
                                            <div className="font-mono text-[10px] text-red-500/70 mb-3 tracking-widest uppercase border-b border-cyber-border/30 pb-2">
                                                // COSMIC_ADDRESS
                                            </div>
                                            <div className="font-mono text-xs text-cyber-text space-y-2">
                                                <div className="flex justify-between"><span className="text-cyber-text/50">Planet:</span> <span className="text-cyber-white">Earth</span></div>
                                                <div className="flex justify-between"><span className="text-cyber-text/50">Sun:</span> <span className="text-cyber-white">Sol</span></div>
                                                <div className="flex justify-between"><span className="text-cyber-text/50">Spiral Arm:</span> <span className="text-cyber-white">Orion</span></div>
                                                <div className="flex justify-between"><span className="text-cyber-text/50">Galaxy:</span> <span className="text-cyber-white">Milky Way</span></div>
                                                <div className="flex justify-between"><span className="text-cyber-text/50">Group:</span> <span className="text-cyber-white">Local Group</span></div>
                                                <div className="flex justify-between"><span className="text-cyber-text/50">Cluster:</span> <span className="text-cyber-white">Virgo</span></div>
                                            </div>
                                        </div>
                                        {/* Mobile Backdrop */}
                                        <div className="fixed inset-0 bg-black/60 z-[9990]" onClick={(e) => { e.stopPropagation(); setActiveTooltip(null); }} />
                                    </>,
                                    document.body
                                )}
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="space-y-3 font-sans text-sm leading-relaxed text-cyber-text/80 text-justify min-h-[200px]">
                            <TextType
                                text={[
                                    "Okuhle is a technical polymath and hard-determinist naturalist who blends rigorous mathematics, computer science, and exacting aesthetic design with a sharp, contrarian philosophy. He sees consciousness and free will as adaptive illusions (no more privileged than the taste of sweetness) and every human artefact, from flint knives to neural interfaces to stellar engines, as fully natural products of the same blind physics that shapes galaxies and anthills.",
                                    "Drawn to boundary-pushing thought experiments in science, culture, and ethics, he questions sacred norms like agreeableness and probes the implications of one mind remaking life or cosmos. He treats morality and politics as necessary but emergent fictions, grounding truth solely in physical law and mathematical structure. His core conviction: humanity must wake to its deterministic nature, fuse with its tools, and paint intentional structure across the stars before entropy erases the canvas."
                                ]}
                                typingSpeed={20}
                                pauseDuration={6000}
                                loop={true}
                                showCursor={true}
                                cursorCharacter="|"
                                className="inline"
                            />
                        </div>

                        {/* Skills / Tech Stack */}
                        <div>
                            <div className="font-mono text-xs text-red-500 mb-4 tracking-widest">
                                // ARSENAL
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { name: 'C', url: 'https://en.cppreference.com/w/c' },
                                    { name: 'C++', url: 'https://isocpp.org/' },
                                    { name: 'MQL5', url: 'https://www.mql5.com/en/docs' },
                                    { name: 'PYTHON', url: 'https://www.python.org/' },
                                    { name: 'JULIA', url: 'https://julialang.org/' },
                                    { name: 'MATLAB', url: 'https://www.mathworks.com/products/matlab.html' },
                                    { name: 'REACT', url: 'https://react.dev/' },
                                    { name: 'NODE', url: 'https://nodejs.org/' },
                                    { name: 'WEBGL', url: 'https://get.webgl.org/' },
                                    { name: 'THREE', url: 'https://threejs.org/' }
                                ].map((skill) => (
                                    <a
                                        key={skill.name}
                                        href={skill.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-2 py-1 border border-cyber-border text-[10px] font-mono text-cyber-text hover:text-cyber-white hover:border-cyber-white transition-colors cursor-pointer"
                                    >
                                        {skill.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
