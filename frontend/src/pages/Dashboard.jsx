import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingBag, Users, Activity, TrendingUp, Sparkles, ArrowUpRight, Box, Clock } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 32000 },
  { name: 'Feb', revenue: 28000 },
  { name: 'Mar', revenue: 45000 },
  { name: 'Apr', revenue: 39000 },
  { name: 'May', revenue: 52000 },
  { name: 'Jun', revenue: 48000 },
  { name: 'Jul', revenue: 61000 },
];

const TOOLTIP_STYLE = {
  contentStyle: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
    borderRadius: '8px',
    color: '#f8fafc',
    fontSize: '13px',
  },
};

const recentOrders = [
  { id: '#7893', customer: 'David Smith',   amount: '$540', status: 'Processing', time: '2m ago' },
  { id: '#7892', customer: 'Sarah Williams', amount: '$85',  status: 'Delivered',  time: '1h ago' },
  { id: '#7891', customer: 'Michael Chen',   amount: '$1,299', status: 'Shipped', time: '3h ago' },
  { id: '#7890', customer: 'Alice Johnson',  amount: '$340', status: 'Processing', time: '5h ago' },
];

const StatCard = ({ title, value, icon, trend, trendUp, delay, accent }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, type: 'spring', stiffness: 120 }}
    className="glass-card p-6 group hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden"
    style={{ borderBottom: `3px solid ${accent}` }}
  >
    {/* Glow orb */}
    <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 blur-2xl" style={{ backgroundColor: accent }} />

    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-sm font-medium mb-1" style={{ color: '#94a3b8' }}>{title}</p>
        <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
      </div>
      <div className="p-3 rounded-xl border" style={{ backgroundColor: `${accent}18`, borderColor: `${accent}30` }}>
        {icon}
      </div>
    </div>

    <div className="mt-4 flex items-center text-sm relative z-10">
      <span className="flex items-center px-2 py-0.5 rounded-full mr-2 font-medium"
        style={{
          backgroundColor: trendUp ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)',
          color: trendUp ? '#4ade80' : '#f87171',
          border: `1px solid ${trendUp ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)'}`
        }}>
        <TrendingUp size={13} className={`mr-1 ${!trendUp ? 'rotate-180' : ''}`} />
        {trend}
      </span>
      <span style={{ color: '#64748b' }}>vs last month</span>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [period, setPeriod] = useState('7d');

  return (
    <div className="space-y-6 pb-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-2">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            AI Dashboard Overview
          </h1>
          <p className="text-sm flex items-center gap-1.5" style={{ color: '#94a3b8' }}>
            <Sparkles size={15} style={{ color: '#3b82f6' }} />
            Real-time AI-powered insights — updated just now
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary mt-4 md:mt-0 flex items-center"
        >
          <Sparkles size={16} className="mr-2" />
          Generate AI Report
        </motion.button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Revenue"     value="$48,294" icon={<DollarSign size={22} style={{ color: '#3b82f6' }} />} trend="+12.5%" trendUp delay={0.0} accent="#3b82f6" />
        <StatCard title="Total Orders"      value="1,245"   icon={<ShoppingBag size={22} style={{ color: '#a855f7' }} />} trend="+5.2%"  trendUp delay={0.1} accent="#a855f7" />
        <StatCard title="Active Customers"  value="8,924"   icon={<Users size={22}       style={{ color: '#22c55e' }} />} trend="+18.7%" trendUp delay={0.2} accent="#22c55e" />
        <StatCard title="AI Accuracy"       value="98.2%"   icon={<Activity size={22}    style={{ color: '#f59e0b' }} />} trend="+2.4%"  trendUp delay={0.3} accent="#f59e0b" />
      </div>

      {/* Revenue Chart + AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="glass-card p-6 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white">Revenue Analytics</h2>
            <div className="flex border border-slate-700 rounded-lg overflow-hidden text-xs">
              {['7d', '30d', '1y'].map(p => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 font-medium transition-colors ${period === p ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip {...TOOLTIP_STYLE} formatter={v => [`$${v.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2.5} fill="url(#revGrad)" dot={{ fill: '#3b82f6', r: 4 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
          className="glass-card p-6 relative overflow-hidden flex flex-col"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <Sparkles size={18} style={{ color: '#3b82f6' }} />
            AI Insights
          </h2>

          <div className="space-y-3 flex-1">
            {[
              { tag: 'Demand Forecast',     color: '#3b82f6', text: 'Sneaker sales +30% projected next week. Restock recommended.' },
              { tag: 'Re-engagement',        color: '#a855f7', text: '142 inactive users show return signals — trigger campaign?' },
              { tag: 'Pricing Opportunity',  color: '#22c55e', text: 'Drop "Tech Gadgets" price by 5% to maximize total revenue.' },
              { tag: 'Low Stock Alert',       color: '#f59e0b', text: 'Holographic Display: only 5 units left. Reorder urgently.' },
            ].map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="p-3 rounded-lg border cursor-pointer hover:scale-[1.01] transition-transform"
                style={{ backgroundColor: `${insight.color}08`, borderColor: `${insight.color}25` }}
              >
                <p className="text-xs font-semibold mb-1" style={{ color: insight.color }}>{insight.tag}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#cbd5e1' }}>{insight.text}</p>
              </motion.div>
            ))}
          </div>

          <button className="mt-4 text-xs text-blue-400 hover:text-blue-300 hover:underline text-center transition-colors">
            View all 18 AI insights →
          </button>
        </motion.div>
      </div>

      {/* Recent Orders + Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="glass-card p-6 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShoppingBag size={18} style={{ color: '#3b82f6' }} />
              Recent Orders
            </h2>
            <a href="/orders" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
              View all <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: '#1e293b' }}>
                  {['Order ID','Customer','Amount','Status','Time'].map(h => (
                    <th key={h} className="pb-3 pr-4 text-xs font-semibold uppercase tracking-wider" style={{ color: '#475569' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#1e293b' }}>
                {recentOrders.map((o, i) => (
                  <motion.tr key={o.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 + i * 0.07 }} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 pr-4 font-medium" style={{ color: '#60a5fa' }}>{o.id}</td>
                    <td className="py-3 pr-4 font-medium" style={{ color: '#f1f5f9' }}>{o.customer}</td>
                    <td className="py-3 pr-4 font-semibold" style={{ color: '#f1f5f9' }}>{o.amount}</td>
                    <td className="py-3 pr-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold border" style={
                        o.status === 'Processing' ? { backgroundColor: 'rgba(245,158,11,0.1)', color: '#fbbf24', borderColor: 'rgba(245,158,11,0.25)' } :
                        o.status === 'Shipped'    ? { backgroundColor: 'rgba(168,85,247,0.1)',  color: '#c084fc', borderColor: 'rgba(168,85,247,0.25)' } :
                                                    { backgroundColor: 'rgba(34,197,94,0.1)',   color: '#4ade80', borderColor: 'rgba(34,197,94,0.25)' }
                      }>{o.status}</span>
                    </td>
                    <td className="py-3 pr-4 flex items-center gap-1 text-xs" style={{ color: '#64748b' }}>
                      <Clock size={12} />{o.time}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="glass-card p-6 flex flex-col space-y-4"
        >
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Box size={18} style={{ color: '#3b82f6' }} />
            Inventory Status
          </h2>

          {[
            { name: 'AI Headphones',     stock: 12,  total: 100, color: '#f59e0b' },
            { name: 'Cyber Jacket',       stock: 43,  total: 100, color: '#3b82f6' },
            { name: 'Holographic Display',stock: 5,   total: 50,  color: '#ef4444' },
            { name: 'Smart Fitness Ring', stock: 124, total: 150, color: '#22c55e' },
          ].map((item) => {
            const pct = Math.round((item.stock / item.total) * 100);
            return (
              <div key={item.name}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span style={{ color: '#cbd5e1' }}>{item.name}</span>
                  <span style={{ color: item.color, fontWeight: 600 }}>{item.stock} / {item.total}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#1e293b' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}80` }}
                  />
                </div>
              </div>
            );
          })}

          <div className="mt-auto pt-2 border-t" style={{ borderColor: '#1e293b' }}>
            <p className="text-xs" style={{ color: '#64748b' }}>
              ⚠ <span style={{ color: '#fbbf24' }}>2 products</span> are critically low — restock now.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
