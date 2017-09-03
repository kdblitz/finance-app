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

function update(state, data) {
    console.log(data);
    return state;
}