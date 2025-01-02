import { useQuery } from "react-query";
import { REQUEST } from "../../services";
import { ENDPOINTS } from "../../services/servicesList";
import { ICategory } from "../../components/Categories/CategoryColumn";

const useFetchAllCategories = () => {
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isFetching: isCategoriesFetching,
    refetch: refetchCategories,
  } = useQuery<ICategory[]>(
    'categories',
    () => REQUEST.get(ENDPOINTS.CATEGORIES.getAll()),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  return { categories, isCategoriesLoading, isCategoriesFetching, refetchCategories };
};

export default useFetchAllCategories;
