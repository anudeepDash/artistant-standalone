import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../lib/store';
import { X, Mail, Lock, User, Loader2 } from 'lucide-react';

const AuthOverlay = () => {
    const { loginWithGoogle, authModal, setAuthModal } = useStore();
    const [loading, setLoading] = useState(false);

    if (!authModal) return null;

    const handleGoogleLogin = async () => {
        setLoading(true);
        await loginWithGoogle();
        setLoading(false);
        setAuthModal(false);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl"
                >
                    <button onClick={() => setAuthModal(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>

                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black font-heading uppercase italic tracking-tighter text-white">
                            ARTISTANT <span className="text-[#FF6B6B]">SIGN IN.</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-[10px] font-bold uppercase tracking-widest">Access your dashboard & gig history</p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full h-20 bg-white hover:bg-gray-100 text-black rounded-2xl flex items-center justify-center gap-4 transition-all font-black uppercase tracking-widest text-[11px]"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (
                                <>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    </svg>
                                    Continue with Google
                                </>
                            )}
                        </button>
                        
                        <div className="pt-4 text-center">
                            <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest leading-relaxed">
                                By continuing, you agree to Artistant's <br/> Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthOverlay;
