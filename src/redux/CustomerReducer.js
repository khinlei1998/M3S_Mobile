export const SET_INITIAL_VALUES = 'SET_INITIAL_VALUES';
export const UPDATE_DATA = 'UPDATE_DATA';

const customer = {
  cus_initialValues: {},
};

export const setCusFormInitialValues = props => {
  return {
    type: 'SET_INITIAL_VALUES',
    payload: props,
  };
};

export const updateData = newData => ({
  type: UPDATE_DATA,
  payload: newData,
});

export default function CustomerReducer(state = customer, action) {
  switch (action.type) {
    case SET_INITIAL_VALUES:
      return {...state, cus_initialValues: action.payload};
    case UPDATE_DATA:
      return {...customer.cus_initialValues, cus_initialValues: action.payload};

    default:
      return state;
  }
}
