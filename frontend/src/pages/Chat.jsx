import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toast } from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';
import api from '../api';
import './Chat.css';

const ChatMessage = ({ message, isBot }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard!', { id: 'chat-copy' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`message-wrapper ${isBot ? 'bot' : 'user'}`}>
      <div className="avatar-small">
        {isBot ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div className="message-content">
        <div className="message-header flex-between">
          <span className="sender-name">{isBot ? 'CodeMemoryAI' : 'You'}</span>
          {isBot && (
            <button 
              className="copy-btn" 
              onClick={() => handleCopy(message)}
              title="Copy response"
            >
              {copied ? <Check size={14} className="text-accent-success" /> : <Copy size={14} />}
            </button>
          )}
        </div>
        
        {isBot ? (
          <div className="markdown-body">
           <ReactMarkdown
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <div className="code-block-wrapper">
                    <div className="code-block-header">
                      <span>{match[1]}</span>
                      <button onClick={() => handleCopy(String(children))} className="copy-code-btn">
                        <Copy size={12} />
                      </button>
                    </div>
                    <SyntaxHighlighter
                      {...props}
                      children={String(children).replace(/\n$/, '')}
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                    />
                  </div>
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {message}
          </ReactMarkdown>
          </div>
        ) : (
          <p className="user-text">{message}</p>
        )}
      </div>
    </div>
  );
};

const Chat = () => {
  const { repoUrl } = useAppContext();
  const [messages, setMessages] = useState([
    { text: "Hello! I'm CodeMemoryAI. Ask me anything about your repository.", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !repoUrl) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await api.post('/ask', {
        repo_url: repoUrl,
        question: userMessage
      });
      
      setMessages(prev => [...prev, { text: response.data.answer, isBot: true }]);
    } catch (error) {
      console.error('Error asking question:', error);
      toast.error('Failed to get answer. Please check if backend is running.', { id: 'chat-error' });
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error while analyzing the repository. Please make sure the backend is running and the URL is correct.", 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container flex-col">
      <header className="chat-header p-6">
        <div>
          <h2>Repository Assistant</h2>
          <p className="text-muted">Chatting about: <span className="text-secondary">{repoUrl || 'No repository selected'}</span></p>
        </div>
      </header>
      
      <div className="messages-area flex-1 p-6">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg.text} isBot={msg.isBot} />
        ))}
        {isLoading && (
          <div className="message-wrapper bot typing-indicator">
            <div className="avatar-small"><Bot size={20} /></div>
            <div className="message-content">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area p-6">
        <form onSubmit={handleSend} className="chat-form glass-card relative">
          <input
            type="text"
            className="chat-input"
            placeholder={repoUrl ? "Ask a question about the code..." : "   Please set a repository URL in Dashboard first"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || !repoUrl}
          />
          <button 
            type="submit" 
            className="send-btn absolute right-2 top-1/2 -translate-y-1/2"
            disabled={!input.trim() || isLoading || !repoUrl}
          >
            {isLoading ? <Loader2 size={20} className="spinner" /> : <Send size={20} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
