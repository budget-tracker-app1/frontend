import { useQuery } from "react-query";
import { REQUEST } from "../../services";
import { ENDPOINTS } from "../../services/servicesList";
import { ITransaction } from "../../components/Transactions";

const useFetchAllTransactions = () => {
  const {
    data: transactions = [],
    isLoading: isTransactionsLoading,
    isFetching: isTransactionsFetching,
    refetch: refetchTransactions,
  } = useQuery<ITransaction[]>(
    'transactions',
    () => REQUEST.get(ENDPOINTS.TRANSACTIONS.getAll()),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  return { transactions, isTransactionsLoading, isTransactionsFetching, refetchTransactions };
};

export default useFetchAllTransactions;
