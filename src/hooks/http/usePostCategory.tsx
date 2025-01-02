import { useMutation, useQueryClient } from 'react-query';
import { REQUEST } from "../../services";
import { ENDPOINTS } from "../../services/servicesList";
import useBudgetTrackerStore from "../../store";
import { ICategory } from "../../components/Categories/CategoryColumn";

const usePostCategory = () => {
  const queryClient = useQueryClient();
  const { categoryObj, setNewCategoryStatus } = useBudgetTrackerStore();

  const { mutate: saveNewCategory } = useMutation({
    mutationFn: () =>
      REQUEST.post(ENDPOINTS.CATEGORIES.post(), categoryObj),
    onSuccess: ({data}) => {
      // console.log(data);

      setNewCategoryStatus(null);
      const currentCategories = (queryClient.getQueryData<ICategory[]>('categories') || []);
      queryClient.setQueryData('categories', [...currentCategories, data]);
    },
    onError: (error) => {
      console.error('Error fetching data:', error);
    },
  });

  return { saveNewCategory };
};

export default usePostCategory;
