import { create } from 'zustand';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Dispute {
  id?: string;
  userId: string;
  ticketImageUrl: string;
  status: 'pending' | 'success' | 'failed';
  issuer: string;
  dateIssued: string;
  location: string;
  appealType: string;
  additionalDetails: string;
  extractedText: string;
  appealLetter: string;
  createdAt: Date;
}

interface DisputeStore {
  disputes: Dispute[];
  loading: boolean;
  error: string | null;
  fetchDisputes: (userId: string) => Promise<void>;
  addDispute: (dispute: Omit<Dispute, 'id' | 'createdAt'>) => Promise<void>;
}

export const useDisputeStore = create<DisputeStore>((set) => ({
  disputes: [],
  loading: false,
  error: null,
  
  fetchDisputes: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const q = query(collection(db, 'disputes'), where('userId', '==', userId));
      const snapshot = await getDocs(q);
      const disputes = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as Dispute[];
      set({ disputes, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch disputes', loading: false });
    }
  },

  addDispute: async (dispute) => {
    set({ loading: true, error: null });
    try {
      await addDoc(collection(db, 'disputes'), {
        ...dispute,
        createdAt: new Date()
      });
      const userId = dispute.userId;
      await useDisputeStore.getState().fetchDisputes(userId);
    } catch (error) {
      set({ error: 'Failed to add dispute', loading: false });
    }
  }
}));