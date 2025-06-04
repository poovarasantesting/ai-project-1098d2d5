import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Calendar from './components/Calendar';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
        <Routes>
          <Route path="/" element={<Calendar />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;