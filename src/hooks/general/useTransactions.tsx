import { ITransaction, ITransactionWithColor, TransactionType } from "../../components/Transactions";
import useFetchAllTransactions from "../http/useFetchAllTransactions";
import useCategories from "./useCategories";

const useTransactions = () => {
  const { expenseCategories } = useCategories();
  const { transactions } = useFetchAllTransactions();

  const successfulExpenseTransactions: ITransactionWithColor[] = transactions
    .filter(
      (transaction) =>
        transaction.type === TransactionType.EXPENSE &&
        transaction.status === "SUCCESS"
    )
    .map((transaction) => {
      const category = expenseCategories?.find(
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
