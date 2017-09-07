import _ from 'lodash';
import { FETCH_EXPENSE_DATA, TOGGLE_SHARING,
    UPDATE_CLAIM, UPDATE_PAYMENT,
    ADD_USER_TO_EXPENSE_FORM, REMOVE_USER_TO_EXPENSE_FORM, 
    ADD_ITEM_TO_EXPENSE_FORM, REMOVE_ITEM_TO_EXPENSE_FORM,
 } from '../actions/expense_actions';

import { sum } from '../utils';

export default function(state = {}, {type, payload}) {
    switch (type) {
        case FETCH_EXPENSE_DATA:
            return payload;
        case ADD_USER_TO_EXPENSE_FORM:
            return addUser(state, payload);
        case REMOVE_USER_TO_EXPENSE_FORM:
            return removeUser(state, payload);
        case ADD_ITEM_TO_EXPENSE_FORM:
            return addItem(state, payload);
        case REMOVE_ITEM_TO_EXPENSE_FORM:
            return removeItem(state, payload);
        case TOGGLE_SHARING:
            return toggleSharing(state, payload);
        case UPDATE_CLAIM:
            return updateClaim(state, payload);
        case UPDATE_PAYMENT:
            return updatePayment(state, payload);
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

function removeUser(state, userName) {
    const newState = _.cloneDeep(state);
    delete newState.users[userName];
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

function removeItem(state, item) {
    const newState = _.cloneDeep(state);

    delete newState.items[item.name];
    _.map(newState.users, user => {
        delete user.claims[item.name]; 
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

function updatePayment(state, paymentInfo) {
    return state;
}

function toggleSharing(state, {itemName, flag}) {
    const newState = _.cloneDeep(state);
    newState.items[itemName].shared = flag;
    return newState;
}