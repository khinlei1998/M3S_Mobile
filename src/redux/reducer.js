import {combineReducers, createStore} from 'redux';
import {reducer as formReducer} from 'redux-form';
import EmployeeReducer from './EmployeeReducer';
import CustomerReducer from './CustomerReducer';
import MonthlyReducder from './MonthlyReducer';
import LoanReducder from './LoanReducer';
import SynchronizationReducer from './SynchronizationReducer';
const rootReducer = combineReducers({
  form: formReducer,
  employees: EmployeeReducer,
  customers:CustomerReducer,
  monthly:MonthlyReducder,
  loan:LoanReducder,
  sync:SynchronizationReducer
});
export default rootReducer;
