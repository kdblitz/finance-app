import _ from 'lodash';
import { ADD_USER, FETCH_USER, LOGIN, LOGOUT } from '../actions/user_actions';

const defaultUser = {
  users: [
    {name:'aaa', email:'aaa@aaa.com'}
  ]
};

export default (state = defaultUser, action) => {
  switch (action.type) {
    // case ADD_USER:
    //   return addUser(state, action.payload);
    case FETCH_USER:
      return fetchUser(state, action.payload);
    default:
      return state;
  }
}

function addUser() {
  // return _.concat(...state, action.payload);
}

function fetchUser(state, user) {
  const newState = _.cloneDeep(state);
  newState.user = user;
  return newState;
}