import { create } from 'zustand';
import { CategoryType } from "../components/Categories";
import { ICategory } from "../components/Categories/CategoryColumn";

interface BudgetTrackerState {
  categories: any[];
  newCategoryStatus: CategoryType | null;
  categoryObj: ICategory;
  exactCategoryId: number | null;

  setCategories: (data: any[]) => void;
  setNewCategoryStatus: (data: CategoryType | null) => void;
  setCategoryObj: (data: ICategory) => void;
  setExactCategoryId: (data: number | null) => void;
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

  setCategories: (data) => set(() => ({ categories: data })),
  setNewCategoryStatus: (data) => set(() => ({ newCategoryStatus: data })),
  setCategoryObj: (data) => set(() => ({ categoryObj: data })),
  setExactCategoryId: (data) => set(() => ({ exactCategoryId: data })),
}));

export default useBudgetTrackerStore;
