import { create } from 'zustand';
import { CategoryType } from "../components/Categories";
import { ICategory } from "../components/Categories/CategoryColumn";
import { ITransaction, TransactionType } from "../components/Transactions";

export enum EModalName {
  INFO = "INFO",
  TUTORIAL = "TUTORIAL",
}

interface BudgetTrackerState {
  categories: ICategory[];
  transactions: ITransaction[];
  newCategoryStatus: CategoryType | null;
  categoryObj: ICategory;
  exactCategoryId: number | null;
  newTransactionStatus: TransactionType | null;
  transactionObj: ITransaction;
  isModalOpen: boolean;
  modalName: EModalName | null;
  startTutorial: boolean;

  setCategories: (data: ICategory[]) => void;
  setTransactions: (data: ITransaction[]) => void;
  setNewCategoryStatus: (data: CategoryType | null) => void;
  setCategoryObj: (data: ICategory) => void;
  setExactCategoryId: (data: number | null) => void;
  setNewTransactionStatus: (data: TransactionType | null) => void;
  setTransactionObj: (data: ITransaction) => void;
  setIsModalOpen: (data: boolean) => void;
  setModalName: (data: EModalName | null) => void;
  setStartTutorial: (data: boolean) => void;
}

const useBudgetTrackerStore = create<BudgetTrackerState>((set) => ({
  categories: [],
  transactions: [],
  newCategoryStatus: null,
  categoryObj: {
    type: null,
    name: "",
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
  isModalOpen: false,
  modalName: null,
  startTutorial: false,

  setCategories: (data) => set(() => ({ categories: data })),
  setTransactions: (data) => set(() => ({ transactions: data })),
  setNewCategoryStatus: (data) => set(() => ({ newCategoryStatus: data })),
  setCategoryObj: (data) => set(() => ({ categoryObj: data })),
  setExactCategoryId: (data) => set(() => ({ exactCategoryId: data })),
  setNewTransactionStatus: (data) => set(() => ({ newTransactionStatus: data })),
  setTransactionObj: (data) => set(() => ({ transactionObj: data })),
  setIsModalOpen: (data) => set(() => ({ isModalOpen: data })),
  setModalName: (data) => set(() => ({ modalName: data })),
  setStartTutorial: (data) => set(() => ({ startTutorial: data })),
}));

export default useBudgetTrackerStore;
