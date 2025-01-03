import { useMutation } from 'react-query';
import { REQUEST } from "../../services";
import { ENDPOINTS } from "../../services/servicesList";
import useBudgetTrackerStore from "../../store";
import useFetchAllCategories from "./useFetchAllCategories";
import useFetchAllTransactions from "./useFetchAllTransactions";

const usePostTransaction = () => {
  const { setNewTransactionStatus, transactionObj } = useBudgetTrackerStore();
  const { refetchCategories } = useFetchAllCategories();
  const { refetchTransactions } = useFetchAllTransactions();

  const { mutate: saveTransaction } = useMutation({
    mutationFn: () =>
      REQUEST.post(ENDPOINTS.TRANSACTIONS.post(), transactionObj),
    onSuccess: ({data}) => {
      // console.log(data);
      
      setNewTransactionStatus(null);
      refetchCategories();
      refetchTransactions();
    },
    onError: (error) => {
      console.error('Error fetching data:', error);
      refetchTransactions();
    },
  });

  return { saveTransaction };
};

export default usePostTransaction;
