import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 32000, orders: 420, profit: 12000 },
  { month: 'Feb', revenue: 28000, orders: 380, profit: 9800 },
  { month: 'Mar', revenue: 45000, orders: 590, profit: 17000 },
  { month: 'Apr', revenue: 39000, orders: 490, profit: 14200 },
  { month: 'May', revenue: 52000, orders: 680, profit: 21000 },
  { month: 'Jun', revenue: 48000, orders: 620, profit: 19400 },
  { month: 'Jul', revenue: 61000, orders: 790, profit: 25000 },
];

const topProducts = [
  { name: 'AI Headphones', sales: 420 },
  { name: 'Cyber Jacket', sales: 310 },
  { name: 'Smart Ring', sales: 280 },
  { name: 'Holo Display', sales: 190 },
  { name: 'VR Lens', sales: 150 },
];

const pieData = [
  { name: 'Electronics', value: 40 },
  { name: 'Apparel', value: 25 },
  { name: 'Wearables', value: 20 },
  { name: 'Others', value: 15 },
];
const PIE_COLORS = ['#3b82f6', '#a855f7', '#22c55e', '#f59e0b'];

const TOOLTIP_STYLE = {
  contentStyle: { backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' },
};

const Analytics = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-whiteText mb-1 pt-2">Analytics</h1>
        <p className="text-dimText">Deep-dive into store performance and AI-powered forecasts.</p>
      </div>

      {/* Revenue & Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <h2 className="text-lg font-bold text-whiteText mb-4">Revenue vs Profit</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.7}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="prof" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.7}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip {...TOOLTIP_STYLE} />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#rev)" name="Revenue ($)" />
              <Area type="monotone" dataKey="profit" stroke="#a855f7" fill="url(#prof)" name="Profit ($)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
          <h2 className="text-lg font-bold text-whiteText mb-4">Monthly Orders</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip {...TOOLTIP_STYLE} />
              <Bar dataKey="orders" fill="#3b82f6" radius={[6,6,0,0]} name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Products & Category Share */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h2 className="text-lg font-bold text-whiteText mb-4">Top Selling Products</h2>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart layout="vertical" data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" width={110} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Bar dataKey="sales" fill="#22c55e" radius={[0,6,6,0]} name="Units Sold" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6 flex flex-col">
          <h2 className="text-lg font-bold text-whiteText mb-4">Sales by Category</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 flex-1">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={4}>
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip {...TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 text-sm">
              {pieData.map((entry, i) => (
                <div key={entry.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }}></div>
                  <span className="text-dimText">{entry.name}</span>
                  <span className="text-whiteText font-semibold ml-auto pl-4">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
