import { useMutation } from 'react-query';
import { REQUEST } from "../services";
import { ENDPOINTS } from "../services/servicesList";
import useBudgetTrackerStore from "../store";

const usePutCategory = () => {
  const { categories, setCategories, categoryObj, setCategoryObj, setExactCategoryId } = useBudgetTrackerStore();

  const { mutate: saveEditedCategory } = useMutation({
    mutationFn: (id: number) =>
      REQUEST.put(ENDPOINTS.CATEGORIES.put(id), categoryObj),
    onSuccess: ({ data }) => {
      // console.log(data);

      setExactCategoryId(null);
      setCategoryObj({
        type: "",
        name: "",
        color: null,
      });

      const updatedCategories = categories.map((category) =>
        category.id === data.id ? data : category
      );
      setCategories(updatedCategories);
    },
    onError: (error) => {
      console.error('Error fetching data:', error);
    },
  });

  return { saveEditedCategory };
};

export default usePutCategory;
