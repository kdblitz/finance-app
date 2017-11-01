import { combineReducers } from 'redux';
import Users from './reducer_users';
import CurrentExpense from './reducer_current_expense';
import Computations from './reducer_computations';
import ExpenseList from './reducer_expense_list';

const rootReducer = combineReducers({
    CurrentExpense,
    Computations,
    ExpenseList,
    Users
});

export default rootReducer;