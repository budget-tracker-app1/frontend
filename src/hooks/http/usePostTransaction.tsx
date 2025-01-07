import { useMutation } from "react-query";
import { REQUEST } from "../../services";
import { ENDPOINTS } from "../../services/servicesList";
import useBudgetTrackerStore from "../../store";
import useFetchAllCategories from "./useFetchAllCategories";
import useFetchAllTransactions from "./useFetchAllTransactions";
import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";

const usePostTransaction = () => {
  const {
    setNewTransactionStatus,
    transactionObj,
    setLeftCategoryError,
    setRightCategoryError,
    setAmountError,
    setTransactionObj,
  } = useBudgetTrackerStore();
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

  const resetTransactionObj = () => {
    setTransactionObj({
      leftCategory: null,
      rightCategory: null,
      type: null,
      amount: 0,
      description: null,
      category_id: null,
      status: "FAILED",
      createdAt: new Date(),
    });
  };

  const { mutate: saveTransaction } = useMutation<
    AxiosResponse<any>,
    any,
    Dispatch<SetStateAction<boolean>>
  >({
    mutationFn: async (setIsLoading) => {
      setIsLoading(true);
      if (!validateTransactionObj()) {
        setIsLoading(false);
        return Promise.reject("Validation failed");
      }
      return REQUEST.post(ENDPOINTS.TRANSACTIONS.post(), transactionObj);
    },
    onSuccess: ({ data }, setIsLoading) => {
      // console.log(data);

      resetTransactionObj();
      setNewTransactionStatus(null);
      refetchCategories();
      refetchTransactions();
      setIsLoading(false);
    },
    onError: (error: any, setIsLoading) => {
      console.error("Error fetching data:", error);
      resetTransactionObj();
      refetchTransactions();
      setIsLoading(false);
    },
  });

  return { saveTransaction };
};

export default usePostTransaction;
