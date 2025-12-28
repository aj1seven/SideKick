import React, { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { SendHorizontal, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const ChatInput = ({ onSend, disabled, placeholder = "Send a message..." }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSend(message);
            setMessage('');
        }
    };

    return (
        <div className="w-full relative flex items-end gap-2 p-3 bg-white border border-gray-200 shadow-sm rounded-xl focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all duration-200">
            <TextareaAutosize
                ref={textareaRef}
                minRows={1}
                maxRows={6}
                placeholder={placeholder}
                className="flex-1 w-full bg-transparent border-0 resize-none focus:ring-0 p-1 text-gray-800 placeholder-gray-400 text-base leading-relaxed"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
            />
            <button
                onClick={handleSend}
                disabled={!message.trim() || disabled}
                className={cn(
                    "flex-shrink-0 p-2 rounded-lg transition-colors",
                    message.trim() && !disabled
                        ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                )}
            >
                {disabled ? <Loader2 className="w-5 h-5 animate-spin" /> : <SendHorizontal className="w-5 h-5" />}
            </button>
        </div>
    );
};

export default ChatInput;
