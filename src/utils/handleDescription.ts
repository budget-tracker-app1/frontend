import { ChangeEvent } from "react";
import useBudgetTrackerStore from "../store";

export const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
  const { transactionObj, setTransactionObj } = useBudgetTrackerStore.getState();

  const { value } = e.target;

  setTransactionObj({
    ...transactionObj,
    description: value,
  });
};
