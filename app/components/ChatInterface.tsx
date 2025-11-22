'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, BookOpen, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { exportToPDF } from '../utils/pdfExport';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '**Namaste! 🙏 Main SmartEd Tutor hoon!**\n\nMujhse tum apne doubts pooch sakte ho - Physics, Chemistry, Math, Biology, English, Computer... koi bhi subject!\n\n**Tum mujhse kya pooch sakte ho:**\n- Koi bhi topic explain karo\n- Question solve karo step-by-step\n- Concepts samjhao simple Hinglish me\n- Practice questions do\n\n**Example:** "Photosynthesis kya hai?" ya "Quadratic equation solve karo: x² + 5x + 6 = 0"\n\nBolo, kya doubt hai tumhara? 😊',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'hinglish' | 'english'>('hinglish');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          language,
          conversationHistory: messages,
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry! Kuch problem ho gayi. Please try again! 🙏',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleExportPDF = () => {
    if (chatContainerRef.current) {
      exportToPDF(chatContainerRef.current, 'chat-conversation');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="text-white" size={24} />
            <h2 className="text-white font-bold text-xl">Your AI Tutor</h2>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'hinglish' | 'english')}
              className="bg-white/20 text-white rounded-lg px-3 py-2 text-sm font-medium backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="hinglish">Hinglish</option>
              <option value="english">English</option>
            </select>
            <button
              onClick={handleExportPDF}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors backdrop-blur-sm border border-white/30"
              title="Export to PDF"
            >
              <Download size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={chatContainerRef}
          className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-50"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    : 'bg-white shadow-md'
                }`}
              >
                <div className="markdown-content">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
                <div
                  className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-indigo-100' : 'text-gray-400'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white shadow-md rounded-2xl p-4">
                <Loader2 className="animate-spin text-indigo-600" size={24} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Apna doubt yahan type karo..."
              className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl px-6 py-3 font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          'Physics concept samjhao',
          'Math problem solve karo',
          'Chemistry formula batao',
          'Biology diagram explain karo',
        ].map((suggestion, index) => (
          <button
            key={index}
            onClick={() => setInput(suggestion)}
            className="bg-white hover:bg-indigo-50 text-gray-700 rounded-xl p-3 text-sm font-medium shadow-md hover:shadow-lg transition-all border border-gray-200"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
