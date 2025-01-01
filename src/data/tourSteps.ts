export enum TutorialTargets {
  AddAccountButton = "add-account-button",
  AddIncomeButton = "add-income-button",
  AddExpenseButton = "add-expense-button",
  ExpensesChartTitle = "expenses-chart-title",
  CashflowTitle = "cashflow-title",
  TotalBalance = "total-balance",
  IncomeTransactionButton = "income-transaction-button",
  TransferTransactionButton = "transfer-transaction-button",
  ExpenseTransactionButton = "expense-transaction-button",
  SortButtonGroup = "sort-button-group",
  ResetAllSortingButton = "reset-all-sorting-button",
}

export const steps = [
  {
    target: TutorialTargets.AddAccountButton,
    message: "You can add an account using this button, such as a bank card, cash, savings or any other account. Once the tutorial ends, the button will be activated.",
  },
  {
    target: TutorialTargets.AddIncomeButton,
    message: "Here are your income categories. For example, you can add your salary, freelance income, retirement funds or any other income source.",
  },
  {
    target: TutorialTargets.AddExpenseButton,
    message: "The last category is for your expenses. You can add categories like bills, groceries, entertainment, rent or any other expenses here.",
  },
  {
    target: TutorialTargets.ExpensesChartTitle,
    message: "Once you add at least one expense category, a chart will appear showing your expenses. It will display the percentage of each category in relation to your total expenses.",
  },
  {
    target: TutorialTargets.CashflowTitle,
    message: "This is your cash flow, showing your income and expenses by category. You can see the total amount of money you earned and spent in each category.",
  },
  {
    target: TutorialTargets.TotalBalance,
    message: "This is your total balance section. It will show the amount of money you have in all your accounts combined.",
  },
  {
    target: TutorialTargets.IncomeTransactionButton,
    message: "You need at least one account and one income category, in order to make an income transaction.",
  },
  {
    target: TutorialTargets.TransferTransactionButton,
    message: "To make a transfer transaction, you need at least two account categories to send amounts between them.",
  },
  {
    target: TutorialTargets.ExpenseTransactionButton,
    message: "To make an expense transaction, you need at least one account and one expense category.",
  },
  {
    target: TutorialTargets.SortButtonGroup,
    message: "These are sorting buttons. You can use them to sort your transactions by type, status, or date. The sorting process allows for multiple levels of sorting, meaning you can sort within a sorted category.",
  },
  {
    target: TutorialTargets.ResetAllSortingButton,
    message: "This button resets all sorting criteria. It will remove all sorting and return the transactions to their original order.",
  },
];
