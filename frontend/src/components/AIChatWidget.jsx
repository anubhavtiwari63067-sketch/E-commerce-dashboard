import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot, User } from 'lucide-react';

const initialMessages = [
  { role: 'ai', text: "👋 Hi! I'm your AI Dashboard Assistant. Ask me anything about your store — sales trends, inventory, customer insights, and more!" },
];

const aiReplies = [
  "📈 Your revenue grew by 18% compared to last month! Electronics is the top performing category.",
  "🔮 Based on demand signals, I forecast a 25-30% spike in sneaker sales next week. Consider restocking.",
  "🧑‍🤝‍🧑 142 customers haven't purchased in 90+ days. A targeted email campaign could recover ~$12K in revenue.",
  "⚠️ 3 products are critically low in stock: Holographic Display (5 units), AI Headphones (12 units).",
  "💡 Tip: Lowering the price of 'Smart Ring' by 8% could increase conversions by an estimated 22%.",
];

let replyIndex = 0;

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const reply = aiReplies[replyIndex % aiReplies.length];
      replyIndex++;
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-80 md:w-96 h-[500px] glass-card border border-neonBlue/30 shadow-[0_0_30px_rgba(59,130,246,0.2)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-neonBlue/20 to-purple-500/20 border-b border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-neonBlue flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.8)]">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-whiteText">AI Assistant</p>
                  <p className="text-xs text-green-400 flex items-center"><span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block mr-1 animate-pulse"></span>Online</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-dimText hover:text-whiteText transition-colors"><X size={18} /></button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${msg.role === 'ai' ? 'bg-neonBlue shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-purple-500'}`}>
                    {msg.role === 'ai' ? <Bot size={14} className="text-white" /> : <User size={14} className="text-white" />}
                  </div>
                  <div className={`max-w-[75%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'ai'
                      ? 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                      : 'bg-neonBlue text-white rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-neonBlue flex items-center justify-center"><Bot size={14} className="text-white" /></div>
                  <div className="bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl rounded-tl-none flex space-x-1">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="w-1.5 h-1.5 bg-neonBlue rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}></span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-slate-700/50 flex gap-2">
              <input
                type="text"
                placeholder="Ask about sales, orders..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                className="input-field flex-1 h-10 text-sm"
              />
              <button
                onClick={sendMessage}
                className="w-10 h-10 bg-neonBlue rounded-lg flex items-center justify-center hover:bg-neonBlueHover transition-colors shadow-[0_0_10px_rgba(59,130,246,0.5)] flex-shrink-0"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-gradient-to-br from-neonBlue to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.7)] relative"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X className="text-white" size={24} /></motion.div>
            : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><Sparkles className="text-white" size={22} /></motion.div>
          }
        </AnimatePresence>
        {!open && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-darkBg animate-pulse"></span>}
      </motion.button>
    </div>
  );
};

export default AIChatWidget;
