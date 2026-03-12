import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, TrendingUp, Star, Sparkles } from 'lucide-react';

const customersData = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', orders: 24, spent: 3420.00, segment: 'VIP', joined: '2024-01' },
  { id: 2, name: 'Michael Chen', email: 'mchen@example.com', orders: 15, spent: 2100.50, segment: 'Loyal', joined: '2024-03' },
  { id: 3, name: 'Sarah Williams', email: 'swilliams@example.com', orders: 8, spent: 980.00, segment: 'Regular', joined: '2024-06' },
  { id: 4, name: 'David Smith', email: 'dsmith@example.com', orders: 3, spent: 210.00, segment: 'New', joined: '2025-12' },
  { id: 5, name: 'Priya Sharma', email: 'priya@example.com', orders: 31, spent: 5640.75, segment: 'VIP', joined: '2023-08' },
  { id: 6, name: 'Lucas Oliveira', email: 'lucas@example.com', orders: 11, spent: 1550.20, segment: 'Loyal', joined: '2024-05' },
];

const segmentColors = {
  VIP: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  Loyal: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  Regular: 'bg-green-500/10 text-green-400 border-green-500/30',
  New: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
};

const Customers = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = customersData.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || c.segment === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-whiteText mb-1 pt-2">Customers</h1>
          <p className="text-dimText">AI-powered segmentation and behavior analytics.</p>
        </div>
        <button className="btn-primary flex items-center mt-4 md:mt-0">
          <Sparkles size={18} className="mr-2" /> AI Segmentation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Customers', value: '8,924', icon: <Users className="text-neonBlue" size={22} /> },
          { label: 'VIP Customers', value: '312', icon: <Star className="text-yellow-400" size={22} /> },
          { label: 'Avg. Lifetime Value', value: '$1,840', icon: <TrendingUp className="text-green-400" size={22} /> },
          { label: 'Churn Risk', value: '5.2%', icon: <TrendingUp className="text-red-400 rotate-180" size={22} /> },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4 flex items-center justify-between">
            <div>
              <p className="text-dimText text-xs mb-1">{stat.label}</p>
              <h3 className="text-xl font-bold text-whiteText">{stat.value}</h3>
            </div>
            <div className="bg-slate-800 p-2 rounded-lg">{stat.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* Filter + Search */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-2.5 text-dimText" size={18} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-10 h-10"
            />
          </div>
          <div className="flex space-x-2 flex-wrap gap-y-2">
            {['All', 'VIP', 'Loyal', 'Regular', 'New'].map(seg => (
              <button
                key={seg}
                onClick={() => setFilter(seg)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  filter === seg
                    ? 'bg-neonBlue text-white border-neonBlue shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                    : 'border-slate-600 text-dimText hover:border-neonBlue hover:text-white'
                }`}
              >
                {seg}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-700 text-dimText text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Orders</th>
                <th className="p-4 font-medium">Total Spent</th>
                <th className="p-4 font-medium">Segment</th>
                <th className="p-4 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neonBlue to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                        {c.name.charAt(0)}
                      </div>
                      <span className="text-whiteText font-medium">{c.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-dimText">{c.email}</td>
                  <td className="p-4 text-whiteText">{c.orders}</td>
                  <td className="p-4 text-whiteText font-semibold">${c.spent.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${segmentColors[c.segment]}`}>{c.segment}</span>
                  </td>
                  <td className="p-4 text-dimText">{c.joined}</td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-dimText">No customers found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
