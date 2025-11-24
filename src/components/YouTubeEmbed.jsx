import React from 'react';

const YouTubeEmbed = ({ id, title = "YouTube Video" }) => {
    return (
        <div className="my-8 w-full">
            <div className="relative w-full aspect-video border border-cyber-border/50 bg-cyber-black overflow-hidden group">
                {/* Cyber Corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyber-text/30" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyber-text/30" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyber-text/30" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyber-text/30" />

                {/* Scanline Overlay (pointer-events-none to allow clicking video) */}
                <div className="absolute inset-0 bg-[url('/scanlines.png')] opacity-10 pointer-events-none z-10" />

                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${id}`}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
            <div className="mt-2 flex justify-between items-center text-[10px] font-mono text-cyber-text/50 uppercase tracking-wider">
                <span>// VIDEO_FEED_ESTABLISHED</span>
                <span>ID: {id}</span>
            </div>
        </div>
    );
};

export default YouTubeEmbed;
