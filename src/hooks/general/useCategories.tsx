import { CategoryType } from "../../components/Categories";
import useBudgetTrackerStore from "../../store";

const useCategories = () => {
  const { categories } = useBudgetTrackerStore();

  const accountCategories = categories.filter((category) => category.type === CategoryType.ACCOUNT);
  const incomeCategories = categories.filter((category) => category.type === CategoryType.INCOME);
  const expenseCategories = categories.filter((category) => category.type === CategoryType.EXPENSE);

  return {
    accountCategories,
    incomeCategories,
    expenseCategories
  };
};

export default useCategories;
