import React from 'react';

const YouTube = ({ id }) => {
    return (
        <div className="relative w-full aspect-video my-8 border border-cyber-border bg-cyber-black">
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default YouTube;
