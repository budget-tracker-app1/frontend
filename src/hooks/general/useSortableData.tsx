import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useShallow } from "zustand/react/shallow";
import useBudgetTrackerStore from "../../store";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { ITransaction } from "../../components/Transactions";

// Define the SortingCriteria type as a generic type.
type SortingCriteria<T> = {
  column: keyof T;
  order: 'asc' | 'desc';
};

// Define the useSortableData custom hook.
function useSortableData<T>(defaultSortingCriteria: SortingCriteria<T>[] = []) {
  const { setTransactions, transactions } = useBudgetTrackerStore(useShallow((state) => (state)));

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
    if(!transactions) {
      return [];
    } else {
      return transactions.slice().sort((a, b) => {
        for (const criterion of sortingCriteria) {
          const column = criterion.column as keyof typeof a;
          const sortOrder = criterion.order;
    
          const valueA = a[column];
          const valueB = b[column];
    
          if (valueA && valueB && (valueA < valueB)) return sortOrder === 'asc' ? -1 : 1;
          if (valueA && valueB && (valueA > valueB)) return sortOrder === 'asc' ? 1 : -1;
        }
    
        // If all criteria are equal, maintain the current order.
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }
  }, [transactions, sortingCriteria]);

  useEffect(() => {
    // Set the sorted data to transactions when sortingCriteria changes
    if (JSON.stringify(sortedData) !== JSON.stringify(transactions)) {
      setTransactions(sortedData);
    }
  }, [sortedData, setTransactions, transactions]);

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
    const sortedTransactions = transactions.sort((a: ITransaction, b: ITransaction) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    setTransactions(sortedTransactions);
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