export const ADD_USER_TO_EXPENSE_FORM = 'add_user_to_expense';

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