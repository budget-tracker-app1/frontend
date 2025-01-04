import { useMutation, useQueryClient } from 'react-query';
import { REQUEST } from "../../services";
import { ENDPOINTS } from "../../services/servicesList";
import useBudgetTrackerStore from "../../store";
import useFetchAllCategories from "./useFetchAllCategories";
import useFetchAllTransactions from "./useFetchAllTransactions";

const usePutCategory = () => {
  const queryClient = useQueryClient();

  const { categoryObj, setCategoryObj, setExactCategoryId, setHttpError } = useBudgetTrackerStore();
  const { refetchCategories, categories } = useFetchAllCategories();
  const { refetchTransactions } = useFetchAllTransactions();

  const { mutate: saveEditedCategory } = useMutation({
    mutationFn: (id: number) =>
      REQUEST.put(ENDPOINTS.CATEGORIES.put(id), categoryObj),
    onSuccess: ({ data }) => {
      // console.log(data);

      setHttpError(null);
      setExactCategoryId(null);
      setCategoryObj({
        id: undefined,
        userId: undefined,
        type: null,
        name: null,
        color: undefined,
        balance: undefined
      });

      if (categories) {
        const updatedCategories = categories.map((category) =>
          category.id === data.id ? data : category
        );
        queryClient.setQueryData("categories", updatedCategories);
      }
      refetchCategories();
      refetchTransactions();
    },
    onError: (error: any) => {
      console.error('Error fetching data:', error);
      setHttpError(error.response?.data?.message || 'An error occurred');
    },
  });

  return { saveEditedCategory };
};

export default usePutCategory;
