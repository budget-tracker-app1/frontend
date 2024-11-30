import { useMutation } from 'react-query';
import { REQUEST } from "../../services";
import { ENDPOINTS } from "../../services/servicesList";
import useBudgetTrackerStore from "../../store";
import useGetAllCategories from "./useGetAllCategories";

const usePostIncome = () => {
  const { incomeTransactionObj, setNewTransactionStatus } = useBudgetTrackerStore();
  const { getAllCategories } = useGetAllCategories();

  const { mutate: saveIncomeTransaction } = useMutation({
    mutationFn: () =>
      REQUEST.post(ENDPOINTS.TRANSACTIONS.INCOME.post(), incomeTransactionObj),
    onSuccess: ({data}) => {
      // console.log(data);
      
      setNewTransactionStatus(null);
      getAllCategories();
    },
    onError: (error) => {
      console.error('Error fetching data:', error);
    },
  });

  return { saveIncomeTransaction };
};

export default usePostIncome;
