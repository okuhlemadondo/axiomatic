import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import PostCard from '../components/PostCard';
import ReadingOverlay from '../components/ReadingOverlay';
import SectionHeader from '../components/SectionHeader';
import { POSTS } from '../data/posts';

const Personal = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const posts = POSTS.filter(p => p.category === 'PERSONAL');

    const selectedPost = useMemo(() => {
        const postId = searchParams.get('post');
        return postId ? posts.find(p => p.id === parseInt(postId)) : null;
    }, [searchParams, posts]);

    const handleClose = () => {
        setSearchParams({});
    };

    const handlePostClick = (post) => {
        setSearchParams({ post: post.id });
    };

    return (
        <>
            <Hero
                title="PERSONAL"
                subtitle="REFLECTIONS // MEMORIES // RAMBLINGS"
                theme="personal"
            />
            <section className="max-w-7xl mx-auto px-6 py-24 min-h-screen">
                <SectionHeader
                    title="JOURNAL"
                    index={posts.length}
                    sector="PERSONAL"
                    color="text-red-500"
                    borderColor="border-red-900/30"
                />

                <motion.div
                    className="flex flex-wrap gap-px bg-red-900/30 border border-red-900/30"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-200px" }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.15
                            }
                        }
                    }}
                >
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="flex-grow basis-full md:basis-[calc(50%-1px)] lg:basis-[calc(33.33%-1px)] min-w-[300px]">
                                <PostCard
                                    post={post}
                                    onClick={() => handlePostClick(post)}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="w-full p-12 text-center font-mono text-cyber-text/50">
                            // NO_DATA_FOUND_IN_SECTOR
                        </div>
                    )}
                </motion.div>
            </section>

            <AnimatePresence>
                {selectedPost && (
                    <ReadingOverlay key="overlay" post={selectedPost} onClose={handleClose} />
                )}
            </AnimatePresence>
        </>
    );
};

export default Personal;
