import { useMutation } from 'react-query';
import { REQUEST } from "../../services";
import { ENDPOINTS } from "../../services/servicesList";
import useBudgetTrackerStore from "../../store";
import useGetAllCategories from "./useGetAllCategories";

const usePostTransaction = () => {
  const { setNewTransactionStatus, transactionObj } = useBudgetTrackerStore();
  const { getAllCategories } = useGetAllCategories();

  const { mutate: saveTransaction } = useMutation({
    mutationFn: () =>
      REQUEST.post(ENDPOINTS.TRANSACTIONS.post(), transactionObj),
    onSuccess: ({data}) => {
      // console.log(data);
      
      setNewTransactionStatus(null);
      getAllCategories();
    },
    onError: (error) => {
      console.error('Error fetching data:', error);
    },
  });

  return { saveTransaction };
};

export default usePostTransaction;
