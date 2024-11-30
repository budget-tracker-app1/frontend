import { create } from 'zustand';
import { CategoryType } from "../components/Categories";
import { ICategory } from "../components/Categories/CategoryColumn";
import { IIncomeTransaction, TransactionType } from "../components/Transactions";

interface BudgetTrackerState {
  categories: any[];
  newCategoryStatus: CategoryType | null;
  categoryObj: ICategory;
  exactCategoryId: number | null;
  newTransactionStatus: TransactionType | null;
  incomeTransactionObj: IIncomeTransaction | null;

  setCategories: (data: any[]) => void;
  setNewCategoryStatus: (data: CategoryType | null) => void;
  setCategoryObj: (data: ICategory) => void;
  setExactCategoryId: (data: number | null) => void;
  setNewTransactionStatus: (data: TransactionType | null) => void;
  setIncomeTransactionObj: (data: IIncomeTransaction | null) => void;
}

const useBudgetTrackerStore = create<BudgetTrackerState>((set) => ({
  categories: [],
  newCategoryStatus: null,
  categoryObj: {
    type: "",
    name: "",
    color: null,
  },
  exactCategoryId: null,
  newTransactionStatus: null,
  incomeTransactionObj: null,

  setCategories: (data) => set(() => ({ categories: data })),
  setNewCategoryStatus: (data) => set(() => ({ newCategoryStatus: data })),
  setCategoryObj: (data) => set(() => ({ categoryObj: data })),
  setExactCategoryId: (data) => set(() => ({ exactCategoryId: data })),
  setNewTransactionStatus: (data) => set(() => ({ newTransactionStatus: data })),
  setIncomeTransactionObj: (data) => set(() => ({ incomeTransactionObj: data })),
}));

export default useBudgetTrackerStore;
