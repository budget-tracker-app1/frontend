import { useMutation } from 'react-query';
import { REQUEST } from "../services";
import { ENDPOINTS } from "../services/servicesList";
import useBudgetTrackerStore from "../store";

const usePostCategory = () => {
  const { categoryObj } = useBudgetTrackerStore();

  const { mutate: saveNewCategory } = useMutation({
    mutationFn: () =>
      REQUEST.post(ENDPOINTS.CATEGORIES.post(), categoryObj),
    onSuccess: (response) => {
      console.log(response);

      // setCategories(response);
    },
    onError: (error) => {
      console.error('Error fetching data:', error);
    },
  });

  return { saveNewCategory };
};

export default usePostCategory;
