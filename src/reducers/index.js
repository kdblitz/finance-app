import { combineReducers } from 'redux';
import Users from './reducer_users';
import CurrentExpense from './reducer_current_expense';

const rootReducer = combineReducers({
    CurrentExpense,
    Users
});

export default rootReducer;