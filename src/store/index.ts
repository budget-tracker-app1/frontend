import { create } from 'zustand';

interface BudgetTrackerState {
  categories: any[];
  budgets: any[];
  transactions: any[];
  fetchCategories: () => Promise<void>;
  fetchBudgets: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
}

const useBudgetTrackerStore = create<BudgetTrackerState>((set) => ({
  categories: [],
  budgets: [],
  transactions: [],
  fetchCategories: async () => {
    const response = await fetch('/api/categories');
    const data = await response.json();
    set({ categories: data });
  },
  fetchBudgets: async () => {
    const response = await fetch('/api/budgets');
    const data = await response.json();
    set({ budgets: data });
  },
  fetchTransactions: async () => {
    const response = await fetch('/api/transactions');
    const data = await response.json();
    set({ transactions: data });
  },
}));

export default useBudgetTrackerStore;
