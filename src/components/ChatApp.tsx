import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import ChatMessage from './ChatMessage';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: "other",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      toast({
        title: "Message is empty",
        description: "Please enter a message to send",
        variant: "destructive",
      });
      return;
    }
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate response after a delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: Date.now() + 1,
        text: "Thanks for your message! This is a simulated response.",
        sender: 'other',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 1000);
  };

  return (
    <div className="container mx-auto max-w-md p-4 h-screen flex flex-col">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex-1 flex flex-col">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">Simple Chat</h1>
        
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-3">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}