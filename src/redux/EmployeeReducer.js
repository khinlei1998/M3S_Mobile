export const ADD_EMP_FILTER = 'ADD_EMP_FILTER';

const get_employee = {
  employee_filter_data: [],
};

export const addEmpFilter = (props) => {
  return {
      type: "ADD_EMP_FILTER",
      payload: props
  }
}

export default function EmployeeReducer(state = get_employee, action) {
  switch (action.type) {
    case ADD_EMP_FILTER:
      return {...state, employee_filter_data: action.payload};

    default:
      return state;
  }
}
