import {combineReducers, createStore} from 'redux';
import {reducer as formReducer} from 'redux-form';
import EmployeeReducer from './EmployeeReducer';
const rootReducer = combineReducers({
  form: formReducer,
  employees: EmployeeReducer,
});
export default rootReducer;
