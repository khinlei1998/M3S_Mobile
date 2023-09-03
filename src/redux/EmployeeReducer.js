export const ADD_EMP_FILTER = 'ADD_EMP_FILTER';
export const GET_ADDRESS_DATA = 'GET_ADDRESS_DATA';
export const ADD_SAVE_LOGIN = 'ADD_SAVE_LOGIN';
const get_employee = {
  employee_filter_data: [],
  all_address: [],
  save_login: false,
};

export const addEmpFilter = props => {
  return {
    type: 'ADD_EMP_FILTER',
    payload: props,
  };
};
export const saveLogin = props => {
  return {
    type: 'ADD_SAVE_LOGIN',
    payload: props,
  };
};
export const TestAction = props => {
  return {
    type: 'GET_ADDRESS_DATA',
    payload: props,
  };
};

export default function EmployeeReducer(state = get_employee, action) {
  switch (action.type) {
    case ADD_EMP_FILTER:
      return {...state, employee_filter_data: action.payload};
    case GET_ADDRESS_DATA:
      return {...state, all_address: action.payload};
    case ADD_SAVE_LOGIN:
      return {...state, save_login: action.payload};
    default:
      return state;
  }
}
