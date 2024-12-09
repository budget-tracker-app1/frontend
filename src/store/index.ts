import { create } from 'zustand';
import { CategoryType } from "../components/Categories";
import { ICategory } from "../components/Categories/CategoryColumn";
import { ITransaction, TransactionType } from "../components/Transactions";

interface BudgetTrackerState {
  categories: any[];
  transactions: ITransaction[];
  newCategoryStatus: CategoryType | null;
  categoryObj: ICategory;
  exactCategoryId: number | null;
  newTransactionStatus: TransactionType | null;
  transactionObj: ITransaction;

  setCategories: (data: any[]) => void;
  setTransactions: (data: ITransaction[]) => void;
  setNewCategoryStatus: (data: CategoryType | null) => void;
  setCategoryObj: (data: ICategory) => void;
  setExactCategoryId: (data: number | null) => void;
  setNewTransactionStatus: (data: TransactionType | null) => void;
  setTransactionObj: (data: ITransaction) => void;
}

const useBudgetTrackerStore = create<BudgetTrackerState>((set) => ({
  categories: [],
  transactions: [],
  newCategoryStatus: null,
  categoryObj: {
    type: "",
    name: "",
    color: null,
  },
  exactCategoryId: null,
  newTransactionStatus: null,
  transactionObj: {
    leftCategory: null,
    rightCategory: null,
    type: null,
    amount: 0,
    description: null,
    category_id: null,
    status: 'FAILED',
    createdAt: new Date(),
  },

  setCategories: (data) => set(() => ({ categories: data })),
  setTransactions: (data) => set(() => ({ transactions: data })),
  setNewCategoryStatus: (data) => set(() => ({ newCategoryStatus: data })),
  setCategoryObj: (data) => set(() => ({ categoryObj: data })),
  setExactCategoryId: (data) => set(() => ({ exactCategoryId: data })),
  setNewTransactionStatus: (data) => set(() => ({ newTransactionStatus: data })),
  setTransactionObj: (data) => set(() => ({ transactionObj: data })),
}));

export default useBudgetTrackerStore;
