import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import Chat from "@/components/Chat";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 container mx-auto p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-6 text-center">Simple Chat</h1>
        <Chat />
      </div>
      <Toaster />
    </div>
  );
}

export default App;