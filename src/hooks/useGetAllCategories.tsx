import { useMutation } from 'react-query';
import { REQUEST } from "../services";
import { ENDPOINTS } from "../services/servicesList";
import useBudgetTrackerStore from "../store";

const useGetAllCategories = () => {
  const { setCategories } = useBudgetTrackerStore();

  const { mutate: getAllCategories } = useMutation({
    mutationFn: () =>
      REQUEST.get(ENDPOINTS.CATEGORIES.getAll()),
    onSuccess: (response) => {
      // console.log(response);

      setCategories(response);
    },
    onError: (error) => {
      console.error('Error fetching data:', error);
    },
  });

  return { getAllCategories };
};

export default useGetAllCategories;
