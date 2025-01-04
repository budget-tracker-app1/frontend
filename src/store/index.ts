import { create } from 'zustand';
import { CategoryType } from "../components/Categories";
import { ICategory } from "../components/Categories/CategoryColumn";
import { ITransaction, TransactionType } from "../components/Transactions";

export enum EModalName {
  INFO = "INFO",
  TUTORIAL = "TUTORIAL",
  ABOUT = "ABOUT",
}

interface BudgetTrackerState {
  newCategoryStatus: CategoryType | null;
  categoryObj: ICategory;
  exactCategoryId: number | null;
  newTransactionStatus: TransactionType | null;
  transactionObj: ITransaction;
  isModalOpen: boolean;
  modalName: EModalName | null;
  startTutorial: boolean;
  httpError: string | null;

  setNewCategoryStatus: (data: CategoryType | null) => void;
  setCategoryObj: (data: ICategory) => void;
  setExactCategoryId: (data: number | null) => void;
  setNewTransactionStatus: (data: TransactionType | null) => void;
  setTransactionObj: (data: ITransaction) => void;
  setIsModalOpen: (data: boolean) => void;
  setModalName: (data: EModalName | null) => void;
  setStartTutorial: (data: boolean) => void;
  setHttpError: (data: string | null) => void;
}

const useBudgetTrackerStore = create<BudgetTrackerState>((set) => ({
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
  httpError: null,

  setNewCategoryStatus: (data) => set(() => ({ newCategoryStatus: data })),
  setCategoryObj: (data) => set(() => ({ categoryObj: data })),
  setExactCategoryId: (data) => set(() => ({ exactCategoryId: data })),
  setNewTransactionStatus: (data) => set(() => ({ newTransactionStatus: data })),
  setTransactionObj: (data) => set(() => ({ transactionObj: data })),
  setIsModalOpen: (data) => set(() => ({ isModalOpen: data })),
  setModalName: (data) => set(() => ({ modalName: data })),
  setStartTutorial: (data) => set(() => ({ startTutorial: data })),
  setHttpError: (data) => set(() => ({ httpError: data })),
}));

export default useBudgetTrackerStore;
