export const UPDATE_COMPUTATIONS = 'update_computations';

export function updateComputation(data) {
    return {
        type: UPDATE_COMPUTATIONS,
        payload: data
    };
}