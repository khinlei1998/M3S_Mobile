export const ADD_EMP_FILTER = 'ADD_EMP_FILTER';
export const GET_ADDRESS_DATA = 'GET_ADDRESS_DATA';

const get_employee = {
  employee_filter_data: [],
  all_address: [],
};

export const addEmpFilter = props => {
  return {
    type: 'ADD_EMP_FILTER',
    payload: props,
  };
};
export const TestAction = props => {
  console.log('props', props);
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
    default:
      return state;
  }
}
