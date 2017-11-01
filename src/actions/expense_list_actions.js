const expenses = {
  123: {
    title: 'some title'
  }
};

export const FETCH_EXPENSE_LIST = 'fetchExpenseList';

export function fetchExpenseList() {
  return {
    type: FETCH_EXPENSE_LIST,
    payload: expenses
  };
}