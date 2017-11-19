export const UPDATE_COMPUTATIONS = 'update_computations';

export function updateComputation(data) {
    return {
        type: UPDATE_COMPUTATIONS,
        payload: data
    };
}

export const UPDATE_COMPUTATION_FOR_KEY = 'update_computation_for_key';

export function updateComputationForKey(payload) {
    return {
        type: UPDATE_COMPUTATION_FOR_KEY,
        payload
    }
}

export const REMOVE_COMPUTATION_FOR_KEY = 'remove_computation_for_key';

export function removeComputationForKey(payload) {
    return {
        type: REMOVE_COMPUTATION_FOR_KEY,
        payload
    }
}

export const CLEAR_COMPUTATION = 'clear_computation';

export function clearComputation() {
    return {
        type: CLEAR_COMPUTATION
    }
}