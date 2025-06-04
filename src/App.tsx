import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Dashboard from "@/pages/Dashboard";
import CreateReport from "@/pages/CreateReport";
import ReportTemplates from "@/pages/ReportTemplates";
import ViewReport from "@/pages/ViewReport";
import Settings from "@/pages/Settings";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create" element={<CreateReport />} />
              <Route path="/templates" element={<ReportTemplates />} />
              <Route path="/view/:id" element={<ViewReport />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
          <Toaster />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;