import { useMutation, useQueryClient } from 'react-query';
import { REQUEST } from "../../services";
import { ENDPOINTS } from "../../services/servicesList";
import useBudgetTrackerStore from "../../store";
import { ICategory } from "../../components/Categories/CategoryColumn";

const usePostCategory = () => {
  const queryClient = useQueryClient();
  const { categoryObj, setNewCategoryStatus, setHttpError } = useBudgetTrackerStore();

  const { mutate: saveNewCategory } = useMutation({
    mutationFn: () =>
      REQUEST.post(ENDPOINTS.CATEGORIES.post(), categoryObj),
    onSuccess: ({data}) => {
      // console.log(data);

      setHttpError(null);
      setNewCategoryStatus(null);
      const currentCategories = (queryClient.getQueryData<ICategory[]>('categories') || []);
      queryClient.setQueryData('categories', [...currentCategories, data]);
    },
    onError: (error: any) => {
      console.error('Error fetching data:', error);
      setHttpError(error.response?.data?.message || 'An error occurred');
    },
  });

  return { saveNewCategory };
};

export default usePostCategory;
