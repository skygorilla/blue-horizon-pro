import React, { useState, useEffect, useRef } from 'react';
import { BrainCircuit, Send, User, X } from 'lucide-react'; // Added User icon
import { operateGemini } from '@/lib/gemini';

interface Message {
  sender: 'user' | 'gemini';
  text: string;
}

// Simple Avatar Component
const Avatar = ({ sender }: { sender: 'user' | 'gemini' }) => {
  const bgColor = sender === 'user' ? 'bg-blue-500' : 'bg-purple-500'; // Different colors for avatars
  const initials = sender === 'user' ? <User size={18} /> : <BrainCircuit size={18} />; // Use icons for avatars

  return (
    <div className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center text-white text-xs font-semibold`}>
      {initials}
    </div>
  );
};

export default function GeminiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!prompt.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: prompt };
    setMessages(prev => [...prev, userMessage]);
    setPrompt('');
    setIsLoading(true);

    try {
      const responseText = await operateGemini(userMessage.text);
      const geminiMessage: Message = { sender: 'gemini', text: responseText };
      setMessages(prev => [...prev, geminiMessage]);
    } catch (error: unknown) {
      console.error('Gemini operation error:', error);
      const messageText = error instanceof Error ? error.message : String(error);
      const errorMessage: Message = { sender: 'gemini', text: `Error: ${messageText}` };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent newline on Enter
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Bubble Icon */}
      <button
        onClick={handleToggle}
        className={`fixed bottom-5 right-5 z-50 p-3 rounded-full shadow-lg transition-colors duration-200 ${
          isOpen
            ? 'bg-gray-600 hover:bg-gray-500'
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
        aria-label={isOpen ? "Close Gemini Chat" : "Open Gemini Chat"}
      >
        {isOpen ? <X size={24} /> : <BrainCircuit size={24} />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-40 w-full max-w-md h-[70vh] flex flex-col overflow-hidden font-sans"
             style={{
               background: 'var(--card-bg)',
               color: 'var(--text-primary)',
               border: '1px solid var(--border-color)',
               borderRadius: 'var(--radius-md)',
               boxShadow: 'var(--shadow-md)',
             }}>
          {/* Header */}
          <div className="p-3 flex items-center justify-between"
               style={{
                 background: 'var(--bg-color)',
                 borderBottom: '1px solid var(--border-color)',
               }}>
            <h2 style={{ display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '13px', color: 'var(--primary-color)' }}>
              <BrainCircuit size={20} className="mr-2" style={{ color: 'var(--accent-color)' }} /> Blue Horizon Pro
            </h2>
            <button onClick={handleToggle} style={{ color: 'var(--text-light)' }}>
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4"
               style={{ background: 'var(--bg-color)' }}>
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'gemini' && <Avatar sender="gemini" />}
                <div style={{
                  maxWidth: '75%',
                  padding: '12px',
                  background: msg.sender === 'user' ? 'var(--accent-color)' : 'var(--primary-light)',
                  color: msg.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  <pre style={{ margin: 0, fontSize: '13px', whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{msg.text}</pre>
                </div>
                {msg.sender === 'user' && <Avatar sender="user" />}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-end gap-2 justify-start">
                <Avatar sender="gemini" />
                <div style={{
                  maxWidth: '75%',
                  padding: '12px',
                  background: 'var(--primary-light)',
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: 'var(--shadow-sm)',
                  fontSize: '11px'
                }}>
                  Gemini is thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 flex items-center gap-2"
               style={{
                 background: 'var(--bg-color)',
                 borderTop: '1px solid var(--border-color)',
               }}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '12px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                fontFamily: 'inherit',
                resize: 'none',
                outline: 'none',
                transition: 'var(--transition)',
                maxHeight: '80px',
                overflowY: 'auto',
              }}
              placeholder="Ask Gemini..."
              />
            <button
              onClick={handleSend}
              disabled={isLoading || !prompt.trim()}
              style={{
                padding: '8px 12px',
                background: 'var(--primary-color)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-sm)',
                cursor: isLoading || !prompt.trim() ? 'not-allowed' : 'pointer',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-dark)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--primary-color)'}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}