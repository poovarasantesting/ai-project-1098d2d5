import React from 'react';
import ChatApp from './components/ChatApp';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Toaster />
      <ChatApp />
    </div>
  );
}

export default App;