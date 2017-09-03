import { combineReducers } from 'redux';
import Users from './reducer_users';
import CurrentExpense from './reducer_current_expense';
import Computations from './reducer_computations';

const rootReducer = combineReducers({
    CurrentExpense,
    Computations,
    Users
});

export default rootReducer;