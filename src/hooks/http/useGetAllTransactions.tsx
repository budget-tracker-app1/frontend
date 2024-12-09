import { useMutation } from 'react-query';
import { REQUEST } from "../../services";
import { ENDPOINTS } from "../../services/servicesList";
import useBudgetTrackerStore from "../../store";
import { ITransaction } from "../../components/Transactions";

const useGetAllTransactions = () => {
  const { setTransactions } = useBudgetTrackerStore();

  const { mutate: getAllTransactions } = useMutation({
    mutationFn: () =>
      REQUEST.get(ENDPOINTS.TRANSACTIONS.getAll()),
    onSuccess: (response) => {
      // console.log(response);

      const sortedTransactions = response.sort((a: ITransaction, b: ITransaction) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
  
      setTransactions(sortedTransactions);
    },
    onError: (error) => {
      console.error('Error fetching data:', error);
    },
  });

  return { getAllTransactions };
};

export default useGetAllTransactions;
