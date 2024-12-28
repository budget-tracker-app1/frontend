import { useMutation } from 'react-query';
import { REQUEST } from "../../services";
import { ENDPOINTS } from "../../services/servicesList";
import useBudgetTrackerStore from "../../store";
import useGetAllTransactions from "./useGetAllTransactions";

const usePutCategory = () => {
  const { categories, setCategories, categoryObj, setCategoryObj, setExactCategoryId } = useBudgetTrackerStore();
  const { getAllTransactions } = useGetAllTransactions();

  const { mutate: saveEditedCategory } = useMutation({
    mutationFn: (id: number) =>
      REQUEST.put(ENDPOINTS.CATEGORIES.put(id), categoryObj),
    onSuccess: ({ data }) => {
      // console.log(data);

      setExactCategoryId(null);
      setCategoryObj({
        id: undefined,
        userId: undefined,
        type: null,
        name: null,
        color: undefined,
        balance: undefined
      });

      const updatedCategories = categories.map((category) =>
        category.id === data.id ? data : category
      );
      setCategories(updatedCategories);
      getAllTransactions();
    },
    onError: (error) => {
      console.error('Error fetching data:', error);
    },
  });

  return { saveEditedCategory };
};

export default usePutCategory;
