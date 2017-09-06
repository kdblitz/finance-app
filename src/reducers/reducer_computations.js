import _ from 'lodash';
import { UPDATE_COMPUTATIONS } from '../actions/computation_actions';

export default (state = {}, action) => {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_COMPUTATIONS:
            return update(state, payload);
        default:
            return state;
    }
}

function update(state, {key, computations}) {
    const newState = _.cloneDeep(state);
    newState[key] = computations;
    return newState;
}