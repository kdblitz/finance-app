import _ from 'lodash';
import { ADD_USER } from '../actions/user_actions';

const defaultUser = [
    {name:'aaa', email:'aaa@aaa.com'}
];

export default (state = defaultUser, action) => {
    switch (action.type) {
        case ADD_USER:
            return _.concat(...state, action.payload);
        default:
            return state;
    }
}