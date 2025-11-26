import React, { useMemo } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import PostCard from '../components/PostCard';
import ReadingOverlay from '../components/ReadingOverlay';
import SectionHeader from '../components/SectionHeader';
import { POSTS } from '../data/posts';

const Science = () => {
    const [searchParams] = useSearchParams();
    const { slug } = useParams();
    const navigate = useNavigate();
    const posts = POSTS.filter(p => p.category === 'SCIENCE');

    const selectedPost = useMemo(() => {
        // First check for slug in URL params
        if (slug) {
            return posts.find(p => p.slug === slug);
        }
        // Fallback to query param for backward compatibility
        const postId = searchParams.get('post');
        return postId ? posts.find(p => p.id === parseInt(postId)) : null;
    }, [slug, searchParams, posts]);

    const handleClose = () => {
        // Navigate back to the category page
        navigate('/science');
    };

    const handlePostClick = (post) => {
        // Navigate to the post's URL using slug
        navigate(`/science/${post.slug}`);
    };

    return (
        <>
            <Hero
                title="SCIENCE"
                subtitle="FORMAL_SCIENCE // NATURAL_SCIENCE // METASCIENCE"
                theme="science"
            />
            <section className="max-w-7xl mx-auto px-6 py-24 min-h-screen">
                <SectionHeader
                    title="ELEMENTS"
                    index={posts.length}
                    sector="SCIENCE"
                    color="text-cyan-400"
                    borderColor="border-cyan-900/30"
                />

                <motion.div
                    className="flex flex-wrap gap-px bg-cyan-900/30 border border-cyan-900/30"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.15
                            }
                        }
                    }}
                >
                    {posts.map((post) => (
                        <div key={post.id} className="flex-grow basis-full md:basis-[calc(50%-1px)] lg:basis-[calc(33.33%-1px)] min-w-[300px]">
                            <PostCard
                                post={post}
                                onClick={() => handlePostClick(post)}
                            />
                        </div>
                    ))}
                </motion.div>
            </section>
            <AnimatePresence>
                {selectedPost && (
                    <ReadingOverlay
                        key="overlay"
                        post={selectedPost}
                        onClose={handleClose}
                        articleIndex={posts.sort((a, b) => a.date.localeCompare(b.date)).findIndex(p => p.id === selectedPost.id) + 1}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Science;
