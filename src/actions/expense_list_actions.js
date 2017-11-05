import firebase, {getUid} from '../firebase.config';

const database = firebase.database();


export const FETCH_EXPENSE_LIST = 'fetchExpenseList';

export function fetchExpenseList() {
  const expenseListRef = database.ref(`expenseList/${getUid()}`);
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