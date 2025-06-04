import { useState, useEffect, useRef } from "react";
import { SendHorizontal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Demo message on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          id: "welcome",
          text: "Welcome to the chat! Type a message to get started.",
          sender: "other",
          timestamp: new Date(),
        },
      ]);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    
    // Simulate response after a short delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getRandomResponse(),
        sender: "other",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, responseMessage]);
      
      toast({
        title: "New message",
        description: "You received a new message",
        duration: 3000,
      });
    }, 1000);
  };

  // Format time as HH:MM
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md h-[80vh] overflow-hidden">
      <div className="bg-blue-600 text-white p-4">
        <h2 className="font-semibold">Chat Room</h2>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-blue-500 text-white rounded-tr-none"
                  : "bg-gray-200 text-gray-800 rounded-tl-none"
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === "user" ? "text-blue-100" : "text-gray-500"
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t p-4 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
          disabled={!newMessage.trim()}
        >
          <SendHorizontal className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}

// Helper function to generate random responses
function getRandomResponse() {
  const responses = [
    "That's interesting! Tell me more.",
    "I see what you mean.",
    "Great point!",
    "How's your day going?",
    "I appreciate your message!",
    "What else is on your mind?",
    "That's a good question.",
    "I'm not sure I understand. Could you elaborate?",
    "Thanks for sharing that with me.",
    "Let's discuss this further."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}