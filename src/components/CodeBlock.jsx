import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const CodeBlock = ({ children, className, ...props }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        // Extract text content from children
        const code = children?.props?.children || children;
        const textContent = typeof code === 'string' ? code : code?.toString() || '';

        try {
            await navigator.clipboard.writeText(textContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = textContent;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <div className="relative group">
            <pre className={className} {...props}>
                {children}
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-cyber-black/80 border border-cyber-border hover:border-cyber-white transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
                aria-label="Copy code"
            >
                {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                ) : (
                    <Copy className="w-4 h-4 text-cyber-text hover:text-cyber-white transition-colors" />
                )}
            </button>
            {copied && (
                <div className="absolute top-2 right-14 px-3 py-1 bg-cyber-black/90 border border-green-400/50 text-green-400 text-xs font-mono whitespace-nowrap">
                    COPIED!
                </div>
            )}
        </div>
    );
};

export default CodeBlock;
