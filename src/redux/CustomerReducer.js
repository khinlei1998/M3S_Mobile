export const SET_INITIAL_VALUES = 'SET_INITIAL_VALUES';
export const SET_UPDATE_STATUS = 'SET_UPDATE_STATUS';
export const INQUIRY_CUS_DATA = 'INQUIRY_CUS_DATA';
export const ADD_CUSTOMER_INFO = 'ADD_CUSTOMER_INFO';

const customer = {
  cus_initialValues: {},
  update_status: 'false',
  inquiry_cusdata: {},
  customer_info: {},
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

export const getInquiryCusData = props => {
  return {
    type: 'INQUIRY_CUS_DATA',
    payload: props,
  };
};
export const addCustomerInfo = props => {
  return {
    type: 'ADD_CUSTOMER_INFO',
    payload: props,
  };
};

export default function CustomerReducer(state = customer, action) {
  switch (action.type) {
    case SET_INITIAL_VALUES:
      return {...state, cus_initialValues: action.payload};
    case SET_UPDATE_STATUS:
      return {...state, update_status: action.payload};
    case INQUIRY_CUS_DATA:
      return {...state, inquiry_cusdata: action.payload};
    case ADD_CUSTOMER_INFO:
      return {...state, customer_info: action.payload};

    default:
      return state;
  }
}
