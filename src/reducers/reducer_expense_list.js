import {
  FETCH_EXPENSE_LIST
} from '../actions/expense_list_actions';

export default function(state = {}, { type, payload }) {
  switch (type) {
    case FETCH_EXPENSE_LIST:
      return payload;
    default:
      return state;
  }
}