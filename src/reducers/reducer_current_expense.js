import _ from 'lodash';

import { ADD_USER_TO_EXPENSE_FORM, ADD_ITEM_TO_EXPENSE_FORM, UPDATE_CLAIM, TOGGLE_SHARING } from '../actions/expense_actions';

import { sum } from '../utils';
// import SubtotalRow from '../components/expenses/rows/subtotal_row';
// import ServiceChargeRow from '../components/expenses/rows/service_charge_row';

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
        // new SubtotalRow(this),
        // new ServiceChargeRow(this)
    ]
};

export default function(state = expenseData, action) {
    switch (action.type) {
        case ADD_USER_TO_EXPENSE_FORM:
            return addUser(state, action.payload);
        case ADD_ITEM_TO_EXPENSE_FORM:
            return addItem(state, action.payload);
        case TOGGLE_SHARING:
            return toggleSharing(state, action.payload);
        case UPDATE_CLAIM:
            return updateClaim(state, action.payload);
        default:
            return state;
    }
}

function addUser(state, user) {
    const itemNames = _.keys(state.items);
    const initValues = _.fill(Array(itemNames.length), 0);

    const newState = _.cloneDeep(state);
    newState.users[user.name] = {
        claims: _.zipObject(itemNames, initValues)
    };
    return newState;
}

function addItem(state, item) {
    item.claimedQuantity = 0;
    item.shared = false;

    const newState = _.cloneDeep(state);
    newState.items[item.name] = item;

    newState.users = _.mapValues(state.users, user => {
        user.claims[item.name] = 0;
        return user;
    });

    return newState;
}

function updateClaim(state, {user, itemName, claim}) {
    const newState = _.cloneDeep(state);

    newState.users[user].claims[itemName] = Number(claim);
    newState.items[itemName].claimedQuantity = getClaimedQuantity(itemName, newState.users);

    return newState;
}

function getClaimedQuantity(itemName, users) {
    return _(users).map(`claims[${itemName}]`)
        .reduce(sum);
}

function toggleSharing(state, {itemName, flag}) {
    const newState = _.cloneDeep(state);
    newState.items[itemName].shared = flag;
    return newState;
}