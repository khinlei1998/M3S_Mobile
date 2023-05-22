export const SET_INITIAL_VALUES = 'SET_INITIAL_VALUES';
export const SET_UPDATE_STATUS = 'SET_UPDATE_STATUS';
const customer = {
  cus_initialValues: {},
  update_status: 'false',
};

export const setCusFormInitialValues = props => {
  return {
    type: 'SET_INITIAL_VALUES',
    payload: props,
  };
};

export const setUpdateStatus = props => {
  return {
    type: 'SET_UPDATE_STATUS',
    payload: props,
  };
};

export default function CustomerReducer(state = customer, action) {
  switch (action.type) {
    case SET_INITIAL_VALUES:
      return {...state, cus_initialValues: action.payload};
    case SET_UPDATE_STATUS:
      return {...state, update_status: action.payload};

    default:
      return state;
  }
}
