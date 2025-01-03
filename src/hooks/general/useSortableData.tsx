import { ReactElement, useMemo, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { ITransaction } from "../../components/Transactions";
import { useQueryClient } from "react-query";

// Define the SortingCriteria type as a generic type.
type SortingCriteria<T> = {
  column: keyof T;
  order: 'asc' | 'desc';
};

// Define the useSortableData custom hook.
function useSortableData<T>(defaultSortingCriteria: SortingCriteria<T>[] = []) {
  const queryClient = useQueryClient();
  const originalTransactions = queryClient.getQueryData<ITransaction[]>('transactions');

  // State to hold the sorting criteria.
  const [sortingCriteria, setSortingCriteria] = useState<SortingCriteria<T>[]>(defaultSortingCriteria);

  // Function to handle column clicks and update sorting criteria.
  const handleColumnClick = (column: keyof T) => {
    const existingCriterion = sortingCriteria.find((criterion) => criterion.column === column);

    if (existingCriterion) {
      if (existingCriterion.order === 'asc') {
        // Switch to descending order.
        const updatedCriteria: SortingCriteria<T>[] = sortingCriteria.map((criterion) =>
          criterion.column === column ? { ...criterion, order: 'desc' as const } : criterion
        );
        setSortingCriteria(updatedCriteria);
      } else {
        // Remove the criterion (cancel sorting for this column).
        const updatedCriteria: SortingCriteria<T>[] = sortingCriteria.filter(
          (criterion) => criterion.column !== column
        );
        setSortingCriteria(updatedCriteria);
      }
    } else {
      // Add the column with ascending order.
      setSortingCriteria([
        ...sortingCriteria,
        { column, order: 'asc' as const },
      ]);
    }
  };

  // Function to apply sorting to the data.
  const sortedData = useMemo(() => {
    if (!originalTransactions) return [];
  
    const dataCopy = [...originalTransactions]; // Copy the data to ensure immutability.

    dataCopy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
    dataCopy.sort((a, b) => {
      for (const criterion of sortingCriteria) {
        const column = criterion.column as keyof ITransaction;
        const sortOrder = criterion.order;
  
        const valueA = a[column];
        const valueB = b[column];
        // console.log(column);

        if (valueA && valueB) {
          if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
          if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
        }
      }
  
      // If values are equal for all criteria, return 0 (no change).
      return 0;
    });
    return dataCopy;
  }, [originalTransactions, sortingCriteria]);

  // Function to render sort icons based on sorting criteria.
  const renderSortIcon = (column: keyof T): ReactElement | undefined => {
    const sortingCriterion = sortingCriteria.find((criterion) => criterion.column === column);

    if (sortingCriterion) {
      return sortingCriterion.order === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />;
    }
    return undefined;
  };

  // Function to cancel sorting and reset to default (date descending).
  const cancelSorting = () => {
    setSortingCriteria([]);
  };

  return {
    sortedData,
    sortingCriteria,
    handleColumnClick,
    renderSortIcon,
    cancelSorting,
  };
}

export default useSortableData;