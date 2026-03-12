import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, AlertTriangle, ShoppingBag, Sparkles, CheckCircle } from 'lucide-react';

const notificationsData = [
  { id: 1, type: 'warning', icon: <AlertTriangle size={16} className="text-yellow-400" />, title: 'Low Stock Alert', desc: 'AI Headphones — only 12 units left.', time: '2m ago', read: false },
  { id: 2, type: 'order', icon: <ShoppingBag size={16} className="text-blue-400" />, title: 'New Order #7893', desc: 'David Smith placed a $540 order.', time: '10m ago', read: false },
  { id: 3, type: 'ai', icon: <Sparkles size={16} className="text-purple-400" />, title: 'AI Sales Prediction', desc: 'Revenue likely to reach $62K this month.', time: '1h ago', read: true },
  { id: 4, type: 'success', icon: <CheckCircle size={16} className="text-green-400" />, title: 'Order Delivered', desc: 'Order #7892 delivered to Sarah Williams.', time: '3h ago', read: true },
];

const NotificationPanel = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);
  const unread = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-dimText hover:text-neonBlue transition-colors"
      >
        <Bell size={22} />
        {unread > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-darkCard flex items-center justify-center text-[9px] text-white font-bold shadow-[0_0_8px_rgba(239,68,68,0.7)]">
            {unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute right-0 top-12 w-80 glass-card border border-slate-700 shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Bell size={16} className="text-neonBlue" />
                  <span className="font-semibold text-whiteText text-sm">Notifications</span>
                  {unread > 0 && <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-xs px-2 py-0.5 rounded-full">{unread} new</span>}
                </div>
                <button onClick={markAllRead} className="text-xs text-neonBlue hover:underline">Mark all read</button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-800">
                {notifications.map(n => (
                  <div key={n.id} className={`p-4 flex items-start gap-3 hover:bg-slate-800/50 transition-colors cursor-pointer ${!n.read ? 'bg-neonBlue/5' : ''}`}>
                    <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      n.type === 'warning' ? 'bg-yellow-500/10' :
                      n.type === 'order' ? 'bg-blue-500/10' :
                      n.type === 'ai' ? 'bg-purple-500/10' : 'bg-green-500/10'
                    }`}>{n.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${!n.read ? 'text-whiteText' : 'text-dimText'}`}>{n.title}</p>
                      <p className="text-xs text-dimText truncate">{n.desc}</p>
                      <p className="text-xs text-slate-600 mt-1">{n.time}</p>
                    </div>
                    {!n.read && <div className="w-2 h-2 rounded-full bg-neonBlue flex-shrink-0 mt-1 shadow-[0_0_6px_rgba(59,130,246,0.8)]"></div>}
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-slate-700 text-center">
                <button className="text-xs text-neonBlue hover:underline">View all notifications</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationPanel;
