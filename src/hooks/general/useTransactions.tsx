import { ITransaction, ITransactionWithColor, TransactionType } from "../../components/Transactions";
import useBudgetTrackerStore from "../../store";
import useCategories from "./useCategories";

const useTransactions = () => {
  const { transactions } = useBudgetTrackerStore();
  const { expenseCategories } = useCategories();

  const successfulExpenseTransactions: ITransactionWithColor[] = transactions
    .filter(
      (transaction) =>
        transaction.type === TransactionType.EXPENSE &&
        transaction.status === "SUCCESS"
    )
    .map((transaction) => {
      const category = expenseCategories.find(
        (category) => category.name === transaction.rightCategory
      );

      return { ...transaction, color: category?.color };
    });

  const successfulIncomeTransactions: ITransaction[] = transactions
    .filter(
      (transaction) =>
        transaction.type === TransactionType.INCOME &&
        transaction.status === "SUCCESS"
    );

  return {
    successfulExpenseTransactions,
    successfulIncomeTransactions
  };
};

export default useTransactions;
