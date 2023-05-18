export const SET_INITIAL_VALUES = 'SET_INITIAL_VALUES';

const customer = {
    cus_initialValues: {},
};


export const setCusFormInitialValues = props => {
  return {
    type: 'SET_INITIAL_VALUES',
    payload: props,
  };
};

export default function CustomerReducer(state = customer, action) {
  switch (action.type) {
    case SET_INITIAL_VALUES:
      return {...state, cus_initialValues: action.payload};
   
    default:
      return state;
  }
}