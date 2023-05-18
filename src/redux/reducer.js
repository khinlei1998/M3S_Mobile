import {combineReducers, createStore} from 'redux';
import {reducer as formReducer} from 'redux-form';
import EmployeeReducer from './EmployeeReducer';
import CustomerReducer from './CustomerReducer';
const rootReducer = combineReducers({
  form: formReducer,
  employees: EmployeeReducer,
  customers:CustomerReducer
});
export default rootReducer;
