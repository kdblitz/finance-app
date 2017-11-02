import firebase from '../firebase.config';

const database = firebase.database();

const expenseListRef = database.ref('expenseList');

export const FETCH_EXPENSE_LIST = 'fetchExpenseList';

export function fetchExpenseList() {
  return dispatch => {
    expenseListRef.on('value', snapshot => {
      let expenseList = snapshot.val() || {};
      dispatch({
        type: FETCH_EXPENSE_LIST,
        payload: expenseList
      })
    });
  };
}