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
  const transactions = queryClient.getQueryData('transactions');

  // State to hold the sorting criteria.
  const [sortingCriteria, setSortingCriteria] = useState(defaultSortingCriteria);

  // Function to handle column clicks and update sorting criteria.
  const handleColumnClick = (column: keyof T) => {
    // Check if the column is already in sorting criteria.
    const existingCriterion = sortingCriteria.find((criterion) => criterion.column === column);

    if (existingCriterion) {
      if (existingCriterion.order === 'asc') {
        // If sorted in ascending order, switch to descending.
        const updatedCriteria: SortingCriteria<T>[] = sortingCriteria.map((criterion) =>
          criterion.column === column ? { ...criterion, order: 'desc' } : criterion
        );
        setSortingCriteria(updatedCriteria);
      } else {
        // If sorted in descending order, remove the criterion (cancel).
        const updatedCriteria = sortingCriteria.filter((criterion) => criterion.column !== column);
        setSortingCriteria(updatedCriteria);
      }
    } else {
      // If the column is not in sorting criteria, add it with ascending order.
      setSortingCriteria([...sortingCriteria, { column, order: 'asc' }]);
    }
  };

  // Function to apply sorting to the data.
  const sortedData = useMemo(() => {
    if (!transactions) return [];
    
    return (transactions as ITransaction[])?.slice().sort((a, b) => {
      for (const criterion of sortingCriteria) {
        const column = criterion.column as keyof typeof a;
        const sortOrder = criterion.order;
  
        const valueA = a[column];
        const valueB = b[column];
  
        if (valueA && valueB && valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
        if (valueA && valueB && valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [transactions, sortingCriteria]);

  // useEffect(() => {
  //   // Set the sorted data to transactions when sortingCriteria changes
  //   if (transactions && JSON.stringify(sortedData) !== JSON.stringify(transactions)) {
  //     // queryClient.setQueryData('transactions', sortedData);
  //   }
  // }, [sortedData, transactions, queryClient]);

  // Function to render sort icons based on sorting criteria.
  const renderSortIcon = (column: keyof T): ReactElement | undefined => {
    const sortingCriterion = sortingCriteria.find((criterion) => criterion.column === column);

    if (sortingCriterion) {
      return sortingCriterion.order === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />;
    } else {
      return undefined;
    }
  };

  // Function to cancel sorting.
  const cancelSorting = () => {
    setSortingCriteria([]);
    const sortedTransactions = (transactions as ITransaction[])?.sort((a: ITransaction, b: ITransaction) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    queryClient.setQueryData('transactions', sortedTransactions);
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