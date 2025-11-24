import React, { useEffect } from 'react';

const TwitterEmbed = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="flex justify-center my-8">
            <blockquote className="twitter-tweet" data-theme="dark">
                <p lang="en" dir="ltr">
                    There is power without virtue, but there is no virtue without power.
                </p>
                &mdash; Okuhle Madondo (@OkuhleMadondo){" "}
                <a href="https://twitter.com/OkuhleMadondo/status/1992156811550695736?ref_src=twsrc%5Etfw">
                    November 22, 2025
                </a>
            </blockquote>
        </div>
    );
};

export default TwitterEmbed;
