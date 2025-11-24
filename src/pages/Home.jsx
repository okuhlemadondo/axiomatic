import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import PostCard from '../components/PostCard';
import ReadingOverlay from '../components/ReadingOverlay';
import SectionHeader from '../components/SectionHeader';
import { POSTS } from '../data/posts';

const Home = ({ startAnimation = true }) => {
    const [selectedPost, setSelectedPost] = useState(null);

    const pinnedPost = POSTS.find(post => post.pinned);
    const regularPosts = POSTS.filter(post => !post.pinned);

    return (
        <>
            <Hero startAnimation={startAnimation} />
            <section className="max-w-7xl mx-auto px-6 py-24 min-h-screen">
                <SectionHeader
                    title="LATEST_UPDATES"
                    index={POSTS.length}
                    sector="ALL_SECTORS"
                    color="text-cyber-white"
                    borderColor="border-cyber-border"
                />

                {/* Pinned Post */}
                {pinnedPost && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <motion.div
                            className="border border-cyber-white bg-cyber-black relative group overflow-hidden cursor-pointer"
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <div className="absolute inset-0 bg-cyber-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <PostCard
                                post={pinnedPost}
                                onClick={() => setSelectedPost(pinnedPost)}
                                forceWhite={true}
                                isPinned={true}
                                disableHoverLift={true}
                            />
                            <div className="absolute top-0 right-0 bg-cyber-white text-cyber-black text-xs font-bold px-3 py-1 font-mono tracking-widest">
                                PINNED
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                <motion.div
                    className="flex flex-wrap gap-px bg-cyber-border border border-cyber-border"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-50px" }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.15
                            }
                        }
                    }}
                >
                    {regularPosts.map((post) => (
                        <div key={post.id} className="flex-grow basis-full md:basis-[calc(50%-1px)] lg:basis-[calc(33.33%-1px)] min-w-[300px]">
                            <PostCard
                                post={post}
                                onClick={() => setSelectedPost(post)}
                                forceWhite={true}
                            />
                        </div>
                    ))}
                </motion.div>
            </section>
            {selectedPost && (
                <ReadingOverlay
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                    articleIndex={POSTS.sort((a, b) => a.date.localeCompare(b.date)).findIndex(p => p.id === selectedPost.id) + 1}
                />
            )}
        </>
    );
};

export default Home;
