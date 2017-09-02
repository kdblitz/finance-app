export const ADD_USER_TO_EXPENSE_FORM = 'add_user_to_expense';

// const expenseData = new Firebase('https://singils-app.firebaseio.com/');

const expenseData = {
    users: {
        'user a': {
            claims: {
                'item a': 0,
                'item b': 0,
                'item c': 0
            }
        },
        'user b': {
            claims: {
                'item a': 0,
                'item b': 0,
                'item c': 0
            }
        }
    },
    items: {
        'item a': {name: 'item a', price: 100, quantity: 10, claimedQuantity: 0, shared: false},
        'item b': {name: 'item b', price: 200, quantity: 5, claimedQuantity: 0, shared: false},
        'item c': {name: 'item c', price: 300, quantity: 3, claimedQuantity: 0, shared: false}
    },
    rows: [
        'SubtotalRow',
        'ServiceChargeRow'
    ]
};

export const FETCH_EXPENSE_DATA = 'fetch_expense_data';

export function fetchExpenseData() {
    return {
        type: FETCH_EXPENSE_DATA,
        payload: expenseData
    }
}

export function addUser(user) {
    return {
        type: ADD_USER_TO_EXPENSE_FORM,
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