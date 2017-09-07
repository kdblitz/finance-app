import firebase from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCb4Qc3jpLBRQZGg91GMrE1qN0cu5pdP4c",
    authDomain: "singils-app.firebaseapp.com",
    databaseURL: "https://singils-app.firebaseio.com",
    projectId: "singils-app",
    storageBucket: "singils-app.appspot.com",
    messagingSenderId: "505027770679"
};

firebase.initializeApp(config);
const database = firebase.database();
const expenseRef = database.ref('expense');

export const FETCH_EXPENSE_DATA = 'fetch_expense_data';

export function fetchExpenseData() {
    return dispatch => {
        expenseRef.on('value', snapshot => {
            dispatch({
                type: FETCH_EXPENSE_DATA,
                payload: snapshot.val()
            });
        });
    };
}

export const SAVE_EXPENSE_DATA = 'save_expense_data';

export function saveExpenseData(expenseData) {
    return dispatch => {
        return database.ref().update({
            expense: expenseData
        });
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