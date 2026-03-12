import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Sparkles, Edit, Trash2 } from 'lucide-react';

const initialProducts = [
  { id: 1, name: 'Neon Cyberpunk Jacket', category: 'Apparel', price: 199.99, stock: 43, status: 'Active' },
  { id: 2, name: 'Quantum AI Headphones', category: 'Electronics', price: 249.50, stock: 12, status: 'Low Stock' },
  { id: 3, name: 'Holographic Display', category: 'Tech', price: 899.00, stock: 5, status: 'Critical' },
  { id: 4, name: 'Smart Fitness Ring', category: 'Wearables', price: 129.99, stock: 124, status: 'Active' },
];

const Products = () => {
  const [products, setProducts] = useState(initialProducts);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-whiteText mb-2 pt-2">Product Management</h1>
          <p className="text-dimText">Inventory and AI-powered product insights.</p>
        </div>
        <button className="btn-primary flex items-center mt-4 md:mt-0 shadow-[0_0_15px_rgba(59,130,246,0.6)]">
          <Plus size={18} className="mr-2" />
          Add Product
        </button>
      </div>

      <div className="glass-card p-6 border-t-4 border-t-neonBlue">
        <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-2.5 text-dimText" size={18} />
            <input type="text" placeholder="Search products..." className="input-field pl-10 h-10 w-full" />
          </div>
          
          <button className="flex items-center space-x-2 text-neonBlue bg-neonBlue/10 hover:bg-neonBlue/20 px-4 py-2 rounded-lg border border-neonBlue/30 transition-colors">
            <Sparkles size={16} />
            <span>AI Auto-Description</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50 text-dimText text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Product Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <motion.tr 
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="p-4 text-whiteText font-medium">{product.name}</td>
                  <td className="p-4 text-dimText">{product.category}</td>
                  <td className="p-4 text-whiteText">${product.price.toFixed(2)}</td>
                  <td className="p-4 text-dimText">{product.stock}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      product.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      product.status === 'Low Stock' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 flex space-x-3">
                    <button className="text-dimText hover:text-neonBlue transition-colors"><Edit size={18} /></button>
                    <button className="text-dimText hover:text-red-400 object-colors"><Trash2 size={18} /></button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
