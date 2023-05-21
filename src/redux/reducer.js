import {combineReducers, createStore} from 'redux';
import {reducer as formReducer} from 'redux-form';
import EmployeeReducer from './EmployeeReducer';
import CustomerReducer from './CustomerReducer';
import MonthlyReducder from './MonthlyReducer';
import { Accountreducer } from './AccountReducer';
const rootReducer = combineReducers({
  form: formReducer,
  employees: EmployeeReducer,
  customers:CustomerReducer,
  monthly:MonthlyReducder,
  account:Accountreducer
});
export default rootReducer;
