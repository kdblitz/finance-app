export const EXPENSE_LIST = `${PUBLIC_PATH}`;
export const NEW_EXPENSE = `${PUBLIC_PATH}expense/new`;
export const USERS_LIST = `${PUBLIC_PATH}users`;
const GET_EXPENSE_FORM = `${PUBLIC_PATH}expense/`;

export function getExpenseFormLink(expenseId) {
  return `${PUBLIC_PATH}expense/${expenseId}`;
}