import { Link } from "react-router-dom";
import { FileText, Home, Settings, FileBarChart, FilePlus } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">ReportGen</span>
          </Link>
          
          <div className="hidden md:flex space-x-1">
            <NavLink to="/" icon={<Home className="h-4 w-4" />} label="Dashboard" />
            <NavLink to="/create" icon={<FilePlus className="h-4 w-4" />} label="Create Report" />
            <NavLink to="/templates" icon={<FileBarChart className="h-4 w-4" />} label="Templates" />
            <NavLink to="/settings" icon={<Settings className="h-4 w-4" />} label="Settings" />
          </div>
          
          <div className="md:hidden">
            {/* Mobile menu button would go here */}
            <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      to={to} 
      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center space-x-1"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}