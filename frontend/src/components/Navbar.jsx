import { Search, User } from 'lucide-react';
import NotificationPanel from './NotificationPanel';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="h-16 px-6 flex items-center justify-between z-10 sticky top-0 bg-darkCard/80 backdrop-blur-md border-b border-slate-700/50 shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="relative w-64 md:w-96 hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dimText" size={18} />
          <input
            type="text"
            placeholder="Search AI insights, orders, products..."
            className="input-field pl-10 h-10 w-full"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <NotificationPanel />

        <div className="flex items-center space-x-3 pl-4 border-l border-slate-700/50 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neonBlue to-purple-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-darkCard flex items-center justify-center overflow-hidden">
              <User size={18} className="text-dimText group-hover:text-whiteText transition-colors" />
            </div>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-whiteText">Admin User</p>
            <p className="text-xs text-dimText">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
