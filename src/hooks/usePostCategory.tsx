import { useMutation } from 'react-query';
import { REQUEST } from "../services";
import { ENDPOINTS } from "../services/servicesList";
import useBudgetTrackerStore from "../store";

const usePostCategory = () => {
  const { categoryObj, categories, setCategories, setNewCategoryStatus } = useBudgetTrackerStore();

  const { mutate: saveNewCategory } = useMutation({
    mutationFn: () =>
      REQUEST.post(ENDPOINTS.CATEGORIES.post(), categoryObj),
    onSuccess: ({data}) => {
      // console.log(data);

      setNewCategoryStatus(null);
      setCategories([
        ...categories,
        data,
      ]);
    },
    onError: (error) => {
      console.error('Error fetching data:', error);
    },
  });

  return { saveNewCategory };
};

export default usePostCategory;
