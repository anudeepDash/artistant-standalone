import React from 'react';
import { useStore } from '../../lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const NeuralToast = () => {
    const { toasts, removeToast } = useStore();

    return (
        <div className="fixed bottom-8 right-8 z-[1000] flex flex-col gap-4">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl backdrop-blur-3xl border shadow-2xl ${
                            toast.type === 'success' 
                                ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                                : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}
                    >
                        {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                        <span className="text-sm font-black uppercase tracking-widest">{toast.message}</span>
                        <button onClick={() => removeToast(toast.id)} className="ml-2 hover:scale-110 transition-transform">
                            <X size={14} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default NeuralToast;
