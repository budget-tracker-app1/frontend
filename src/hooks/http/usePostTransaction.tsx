import { useMutation } from 'react-query';
import { REQUEST } from "../../services";
import { ENDPOINTS } from "../../services/servicesList";
import useBudgetTrackerStore from "../../store";
import useGetAllCategories from "./useGetAllCategories";
import useGetAllTransactions from "./useGetAllTransactions";

const usePostTransaction = () => {
  const { setNewTransactionStatus, transactionObj } = useBudgetTrackerStore();
  const { getAllCategories } = useGetAllCategories();
  const { getAllTransactions } = useGetAllTransactions();

  const { mutate: saveTransaction } = useMutation({
    mutationFn: () =>
      REQUEST.post(ENDPOINTS.TRANSACTIONS.post(), transactionObj),
    onSuccess: ({data}) => {
      // console.log(data);
      
      setNewTransactionStatus(null);
      getAllCategories();
      getAllTransactions();
    },
    onError: (error) => {
      console.error('Error fetching data:', error);
      getAllTransactions();
    },
  });

  return { saveTransaction };
};

export default usePostTransaction;
