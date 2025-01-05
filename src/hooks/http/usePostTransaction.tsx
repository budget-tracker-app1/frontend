import { useMutation } from 'react-query';
import { REQUEST } from "../../services";
import { ENDPOINTS } from "../../services/servicesList";
import useBudgetTrackerStore from "../../store";
import useFetchAllCategories from "./useFetchAllCategories";
import useFetchAllTransactions from "./useFetchAllTransactions";
import { AxiosResponse } from "axios";

const usePostTransaction = () => {
  const { setNewTransactionStatus, transactionObj, setLeftCategoryError, setRightCategoryError, setAmountError } = useBudgetTrackerStore();
  const { refetchCategories } = useFetchAllCategories();
  const { refetchTransactions } = useFetchAllTransactions();

  const validateTransactionObj = () => {
    let isValid = true;
    if (!transactionObj.leftCategory) {
      setLeftCategoryError("Choose a category");
      isValid = false;
    } else {
      setLeftCategoryError(null);
    }
    if (!transactionObj.rightCategory) {
      setRightCategoryError("Choose a category");
      isValid = false;
    } else {
      setRightCategoryError(null);
    }
    if (!transactionObj.amount || transactionObj.amount <= 0) {
      setAmountError("Transaction amount must be greater than zero");
      isValid = false;
    } else {
      setAmountError(null);
    }
    return isValid;
  };

  const { mutate: saveTransaction } = useMutation<AxiosResponse<any>, any, void>({
    mutationFn: async () => {
      if (!validateTransactionObj()) {
        return Promise.reject("Validation failed");
      }
      return REQUEST.post(ENDPOINTS.TRANSACTIONS.post(), transactionObj);
    },
    onSuccess: ({ data }) => {
      // console.log(data);
      setNewTransactionStatus(null);
      refetchCategories();
      refetchTransactions();
    },
    onError: (error: any) => {
      console.error('Error fetching data:', error);
      refetchTransactions();
    },
  });

  return { saveTransaction };
};

export default usePostTransaction;
