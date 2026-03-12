import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, PieChart, Settings, LogOut, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Products', icon: <Package size={20} />, path: '/products' },
    { name: 'Orders', icon: <ShoppingCart size={20} />, path: '/orders' },
    { name: 'Customers', icon: <Users size={20} />, path: '/customers' },
    { name: 'Analytics', icon: <PieChart size={20} />, path: '/analytics' },
  ];

  return (
    <motion.div 
      initial={{ width: isOpen ? 250 : 80 }}
      animate={{ width: isOpen ? 250 : 80 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
      className="h-screen bg-darkCard border-r border-slate-700/50 flex flex-col relative"
    >
      <div className="p-5 flex items-center justify-center border-b border-slate-700/50">
        {isOpen ? (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-neonBlue flex items-center justify-center text-white font-bold">AI</div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-accent">DashIO</span>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-neonBlue flex items-center justify-center text-white font-bold">AI</div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            title={!isOpen ? item.name : ''}
          >
            <div className="flex items-center justify-center">{item.icon}</div>
            {isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-3 font-medium whitespace-nowrap">{item.name}</motion.span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700/50 space-y-2">
        <button className="nav-item w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10 hover:border-red-400">
          <div className="flex items-center justify-center"><LogOut size={20} /></div>
          {isOpen && <span className="ml-3 font-medium whitespace-nowrap">Logout</span>}
        </button>
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6 bg-darkCard border border-slate-700 rounded-full p-1 text-dimText hover:text-whiteText shadow-lg z-50 transform hover:scale-110 transition-all"
      >
        <ChevronLeft size={16} className={`transform transition-transform ${!isOpen ? 'rotate-180' : ''}`} />
      </button>
    </motion.div>
  );
};

export default Sidebar;
