import { create } from 'zustand';
import { CategoryType } from "../components/Categories";
import { ICategory } from "../components/Categories/CategoryColumn";

interface BudgetTrackerState {
  categories: any[];
  newCategoryStatus: CategoryType | null;
  categoryObj: ICategory;

  setCategories: (data: any[]) => void;
  setNewCategoryStatus: (data: CategoryType | null) => void;
  setCategoryObj: (data: ICategory) => void;
}

const useBudgetTrackerStore = create<BudgetTrackerState>((set) => ({
  categories: [],
  newCategoryStatus: null,
  categoryObj: {
    type: "",
    name: "",
    color: null,
  },

  setCategories: (data) => set(() => ({ categories: data })),
  setNewCategoryStatus: (data) => set(() => ({ newCategoryStatus: data })),
  setCategoryObj: (data) => set(() => ({ categoryObj: data })),
}));

export default useBudgetTrackerStore;
