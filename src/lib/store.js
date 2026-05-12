import { create } from 'zustand';
import { db, auth } from './firebase';
import { 
    collection, addDoc, updateDoc, deleteDoc, doc, 
    onSnapshot, query, orderBy, getDoc, setDoc 
} from 'firebase/firestore';
import { 
    onAuthStateChanged, signInWithPopup, GoogleAuthProvider, 
    signOut 
} from 'firebase/auth';

export const useStore = create((set, get) => ({
    // State
    user: null,
    authInitialized: false,
    loading: true,
    artists: [],
    clientRequests: [],
    toasts: [],
    authModal: false,

    setAuthModal: (val) => set({ authModal: val }),

    // Initialization
    subscribeToData: () => {
        const sub = (colName, stateKey) => {
            const q = query(collection(db, colName));
            return onSnapshot(q, (snapshot) => {
                const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                set({ [stateKey]: data, loading: false });
            }, (error) => {
                console.error(`Error fetching ${stateKey}:`, error);
                set({ loading: false });
            });
        };

        const unsubArtists = sub('artists', 'artists');
        const unsubRequests = sub('client_requests', 'clientRequests');

        // Auth state listener
        const unsubAuth = onAuthStateChanged(auth, (user) => {
            set({ user, authInitialized: true });
        });

        return () => {
            unsubArtists();
            unsubRequests();
            unsubAuth();
        };
    },

    // Auth Actions
    loginWithGoogle: async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            get().addToast("Login failed. Please try again.", "error");
        }
    },

    logout: async () => {
        try {
            await signOut(auth);
        } catch (error) {
            get().addToast("Logout failed.", "error");
        }
    },

    // Artist Actions
    addArtist: async (data) => {
        return await addDoc(collection(db, 'artists'), {
            ...data,
            createdAt: new Date().toISOString()
        });
    },

    updateArtist: async (id, updates) => {
        await updateDoc(doc(db, 'artists', id), updates);
    },

    deleteArtist: async (id) => {
        await deleteDoc(doc(db, 'artists', id));
    },

    // Client Request Actions
    addClientRequest: async (data) => {
        return await addDoc(collection(db, 'client_requests'), {
            ...data,
            createdAt: new Date().toISOString()
        });
    },

    // Cloudinary Upload
    uploadToCloudinary: async (file) => {
        if (!file) return null;
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "maw1e4ud"); // Keep existing or change to new
        data.append("cloud_name", "dgtalrz4n");

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/dgtalrz4n/image/upload`, { 
                method: "POST", 
                body: data 
            });
            const uploadedFile = await res.json();
            return uploadedFile.secure_url;
        } catch (error) {
            throw new Error("Upload failed");
        }
    },

    // Toast System
    addToast: (message, type = 'error') => {
        const id = Date.now();
        set(state => ({
            toasts: [...state.toasts, { id, message, type }]
        }));
        setTimeout(() => {
            set(state => ({
                toasts: state.toasts.filter(t => t.id !== id)
            }));
        }, 5000);
    },
    removeToast: (id) => {
        set(state => ({
            toasts: state.toasts.filter(t => t.id !== id)
        }));
    },
}));
