import _ from 'lodash';
import { UPDATE_COMPUTATIONS, UPDATE_COMPUTATION_FOR_KEY } from '../actions/computation_actions';

export default (state = {}, action) => {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_COMPUTATIONS:
            return update(state, payload);
        case UPDATE_COMPUTATION_FOR_KEY:
            return updateForKey(state, payload);
        default:
            return state;
    }
}

function update(state, {key, computations}) {
    const newState = _.cloneDeep(state);
    newState[key] = computations;
    return newState;
}

function updateForKey(state, {key, user, value}) {
    const newState = _.cloneDeep(state);
    newState[key].users[user] = value;
    return newState;
}