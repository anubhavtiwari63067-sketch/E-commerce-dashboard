import { motion } from 'framer-motion';
import { PackageOpen, Clock, CheckCircle, Truck, FileText } from 'lucide-react';

const ordersData = [
  { id: '#ORD-7890', customer: 'Alice Johnson', date: '2026-03-10', amount: '$340.50', status: 'Processing' },
  { id: '#ORD-7891', customer: 'Michael Chen', date: '2026-03-09', amount: '$1,299.99', status: 'Shipped' },
  { id: '#ORD-7892', customer: 'Sarah Williams', date: '2026-03-08', amount: '$85.00', status: 'Delivered' },
  { id: '#ORD-7893', customer: 'David Smith', date: '2026-03-07', amount: '$540.20', status: 'Processing' },
];

const Orders = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-whiteText mb-2 pt-2">Order Management</h1>
          <p className="text-dimText">Track, process, and analyze incoming orders.</p>
        </div>
        <button className="bg-slate-800 hover:bg-slate-700 text-whiteText px-4 py-2 border border-slate-600 rounded-lg flex items-center transition-colors">
          <FileText size={18} className="mr-2 text-neonBlue" />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', count: 1245, icon: <PackageOpen className="text-neonBlue" />, color: 'shadow-[0_0_10px_rgba(59,130,246,0.3)]' },
          { label: 'Processing', count: 48, icon: <Clock className="text-yellow-400" />, color: 'shadow-[0_0_10px_rgba(250,204,21,0.3)]' },
          { label: 'Shipped', count: 32, icon: <Truck className="text-purple-400" />, color: 'shadow-[0_0_10px_rgba(168,85,247,0.3)]' },
          { label: 'Delivered', count: 1165, icon: <CheckCircle className="text-green-400" />, color: 'shadow-[0_0_10px_rgba(74,222,128,0.3)]' },
        ].map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} className={`glass-card p-4 flex items-center justify-between border-l-4 ${idx===0 ? 'border-l-neonBlue': idx===1 ? 'border-l-yellow-400' : idx===2? 'border-l-purple-400' : 'border-l-green-400'} ${stat.color}`}> 
            <div>
              <p className="text-dimText text-sm">{stat.label}</p>
              <h3 className="text-2xl font-bold text-whiteText">{stat.count}</h3>
            </div>
            <div className="bg-slate-800 p-2 rounded-lg">{stat.icon}</div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900 border-b border-slate-700">
            <tr className="text-dimText text-sm">
              <th className="p-4 font-medium">Order ID</th>
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order, i) => (
              <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }} className="border-b border-slate-800 hover:bg-slate-800/70">
                <td className="p-4 font-medium text-neonBlue">{order.id}</td>
                <td className="p-4 text-whiteText">{order.customer}</td>
                <td className="p-4 text-dimText">{order.date}</td>
                <td className="p-4 font-semibold text-whiteText">{order.amount}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    order.status === 'Processing' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' :
                    order.status === 'Shipped' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' :
                    'bg-green-500/10 text-green-400 border border-green-500/30'
                  }`}>{order.status}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
