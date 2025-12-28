import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import SuccessCriteria from '../components/SuccessCriteria';
import { sendMessage } from '../services/api';
import { Trash2, Sun, Moon, Info } from 'lucide-react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [successCriteria, setSuccessCriteria] = useState('');
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleSend = async (text) => {
        const userMessage = { role: 'user', content: text };

        // Optimistically add user message
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);
        setError(null);

        try {
            // API expects history EXCLUDING the current message, 
            // because current message is passed in 'message' field.
            const currentHistory = messages;

            const response = await sendMessage(text, currentHistory, successCriteria);

            // Response is { role: 'assistant', content: '...' }
            setMessages((prev) => [...prev, response]);
        } catch (err) {
            console.error(err);
            setError("Failed to get response from SideKick. Please try again.");
            // Optionally add an error message bubble
            setMessages((prev) => [...prev, {
                role: 'assistant',
                content: '_Error: Failed to connect to SideKick backend. Please check if the server is running._'
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setMessages([]);
        setSuccessCriteria('');
        setError(null);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Header */}
            <header className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <h1 className="text-xl font-semibold tracking-tight text-gray-800">SideKick UI</h1>
                </div>
                <button
                    onClick={handleReset}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                    title="Reset Chat"
                >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Reset</span>
                </button>
            </header>

            {/* Main Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth">
                <div className="max-w-3xl mx-auto flex flex-col min-h-full">

                    {/* Welcome State */}
                    {messages.length === 0 && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-60">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                                <Sun className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">How can I help you today?</h2>
                            <p className="text-gray-500 max-w-md">
                                I can help you reason through problems, write code, or analyze data using your success criteria.
                            </p>
                        </div>
                    )}

                    {/* Messages */}
                    <div className="flex-1 space-y-2 pb-4">
                        {messages.map((msg, idx) => (
                            <ChatMessage key={idx} role={msg.role} content={msg.content} />
                        ))}

                        {loading && (
                            <div className="flex justify-start w-full mb-6">
                                <div className="flex items-center gap-2 ml-14 group">
                                    <span className="flex space-x-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    </span>
                                    <span className="text-xs text-gray-400 font-medium ml-2">SideKick is thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                </div>
            </main>

            {/* Footer / Input Area */}
            <footer className="flex-shrink-0 bg-white/80 backdrop-blur-sm border-t border-gray-200">
                <div className="max-w-3xl mx-auto p-4 sm:p-6 pt-2">

                    <SuccessCriteria
                        value={successCriteria}
                        onChange={setSuccessCriteria}
                        disabled={loading}
                    />

                    <ChatInput
                        onSend={handleSend}
                        disabled={loading}
                    />

                    <div className="text-center mt-3 text-xs text-gray-400">
                        SideKick can make mistakes. Consider checking important information.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Chat;
