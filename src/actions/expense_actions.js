import Expense from '../components/expenses/models/expense';

import firebase from '../firebase.config';

const database = firebase.database();
let expenseRef;

export const FETCH_EXPENSE_DATA = 'fetch_expense_data';

export function fetchExpenseData(expenseId) {
  if (expenseId) {
    expenseRef = database.ref(`expense/${expenseId}`);
    return dispatch => {
      expenseRef.on('value', snapshot => {
        dispatch({
          type: FETCH_EXPENSE_DATA,
          payload: new Expense(snapshot.val())
        });
      });
    };
  }
  return {
    type: FETCH_EXPENSE_DATA,
    payload: new Expense()
  };
}

export const SAVE_EXPENSE_DATA = 'save_expense_data';

export function saveExpenseData(expenseId,expenseData) {
  if (!expenseId) {
    expenseId = database.ref().child('expense').push().key;
  }

  return dispatch => {
    const updates = {};
    updates[`expense/${expenseId}`] = expenseData;
    updates[`expenseList/${expenseId}`] = {title: 'Test title'};
    return database.ref().update(updates, () => expenseId);
  };
}

export const ADD_USER_TO_EXPENSE_FORM = 'add_user_to_expense';

export function addUser(user) {
  return {
    type: ADD_USER_TO_EXPENSE_FORM,
    payload: user
  };
}

export const REMOVE_USER_TO_EXPENSE_FORM = 'remove_user_to_expense';

export function removeUser(user) {
  return {
    type: REMOVE_USER_TO_EXPENSE_FORM,
    payload: user
  };
}

export const ADD_ITEM_TO_EXPENSE_FORM = 'add_item_to_expense';

export function addItem(item) {
  return {
    type: ADD_ITEM_TO_EXPENSE_FORM,
    payload: item
  };
}

export const REMOVE_ITEM_TO_EXPENSE_FORM = 'remove_item_to_expense';

export function removeItem(item) {
  return {
    type: REMOVE_ITEM_TO_EXPENSE_FORM,
    payload: item
  }
}

export const UPDATE_CLAIM = 'update_claim';

export function updateClaim(user, itemName, claim) {
  return {
    type: UPDATE_CLAIM,
    payload: {
      user,
      itemName,
      claim
    }
  };
}

export const TOGGLE_SHARING = 'toggle_sharing';

export function toggleSharing(itemName, flag) {
  return {
    type: TOGGLE_SHARING,
    payload: {
      itemName,
      flag
    }
  };
}

export const ADD_SPECIAL_ROW = 'add_special_row';

export function addSpecialRow(rowName) {
  return {
    type: ADD_SPECIAL_ROW,
    payload: {
      rowName
    }
  };
}

export const REMOVE_SPECIAL_ROW = 'remove_special_row';

export function removeSpecialRow(rowName) {
  return {
    type: REMOVE_SPECIAL_ROW,
    payload: {
      rowName
    }
  };
}

export const UPDATE_ROW_CONFIG = 'update_row_config';

export function updateRowConfig(rowName, config) {
  return {
    type: UPDATE_ROW_CONFIG,
    payload: {
      rowName,
      config
    }
  };
}

export const UPDATE_PAYMENT = 'update_payment';

export function updatePayment(user, payment) {
  return {
    type: UPDATE_PAYMENT,
    payload: {
      user,
      payment
    }
  };
}