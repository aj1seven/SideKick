import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Bot } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const ChatMessage = ({ role, content }) => {
    const isUser = role === 'user';

    return (
        <div
            className={cn(
                "flex w-full mb-6",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            <div
                className={cn(
                    "flex max-w-[80%] md:max-w-[70%]",
                    isUser ? "flex-row-reverse" : "flex-row"
                )}
            >
                {/* Avatar */}
                <div
                    className={cn(
                        "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center -mt-1",
                        isUser ? "bg-emerald-600 ml-3" : "bg-gray-200 mr-3"
                    )}
                >
                    {isUser ? (
                        <User className="h-5 w-5 text-white" />
                    ) : (
                        <Bot className="h-5 w-5 text-gray-600" />
                    )}
                </div>

                {/* Message Bubble */}
                <div
                    className={cn(
                        "relative px-5 py-3.5 text-sm shadow-sm rounded-2xl overflow-hidden",
                        isUser
                            ? "bg-emerald-600 text-white rounded-tr-sm"
                            : "bg-white border border-gray-100/50 text-gray-800 rounded-tl-sm shadow-sm"
                    )}
                >
                    {/* Content */}
                    <div className={cn("prose break-words", isUser ? "prose-invert" : "prose-zinc")}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {content}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
