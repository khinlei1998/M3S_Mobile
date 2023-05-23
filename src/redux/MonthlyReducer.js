export const UPDATE_TOTAL_SUM = 'UPDATE_TOTAL_SUM';
export const UPDATE_TOTAL_INCOME = 'UPDATE_TOTAL_INCOME';
export const UPDATE_TOTAL_EXPENSE = 'UPDATE_TOTAL_EXPENSE';
export const UPDATE_FAMILY_EXPENSE = 'UPDATE_FAMILY_EXPENSE';
export const UPDATE_FAMILY_INCOME = 'UPDATE_FAMILY_INCOME';
export const TOTAL_NET_BUSINESS = 'TOTAL_NET_BUSINESS';
export const TOTAL_NET_FAMILY = 'TOTAL_NET_FAMILY';

const initialState = {
  totalSum: 0,
  totalincome: 0,
  totalexpense: 0,
  totalfamilyexpense: 0,
  totalincomeexpense: 0,
  totalnetbusiness: 0,
  totalnetfamily: 0,
};

export const updateTotalSum = props => {
  return {
    type: 'UPDATE_TOTAL_SUM',
    payload: props,
  };
};

export const totalIncome = props => {
  return {
    type: 'UPDATE_TOTAL_INCOME',
    payload: props,
  };
};

export const totalExpense = props => {
  return {
    type: 'UPDATE_TOTAL_EXPENSE',
    payload: props,
  };
};

export const totalFamilyExpense = props => {
  return {
    type: 'UPDATE_FAMILY_EXPENSE',
    payload: props,
  };
};

export const totalFamilyIncome = props => {
  return {
    type: 'UPDATE_FAMILY_INCOME',
    payload: props,
  };
};
export const totalNetBusiness = props => {
  return {
    type: 'TOTAL_NET_BUSINESS',
    payload: props,
  };
};

export const totalNetFamily = props => {
  return {
    type: 'TOTAL_NET_FAMILY',
    payload: props,
  };
};

export default function MonthlyReducder(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TOTAL_SUM:
      return {...state, totalSum: action.payload};
    case UPDATE_TOTAL_INCOME:
      return {...state, totalincome: action.payload};
    case UPDATE_TOTAL_EXPENSE:
      return {...state, totalexpense: action.payload};
    case UPDATE_FAMILY_EXPENSE:
      return {...state, totalfamilyexpense: action.payload};
    case UPDATE_FAMILY_INCOME:
      return {...state, totalincomeexpense: action.payload};
    case TOTAL_NET_BUSINESS:
      return {...state, totalnetbusiness: action.payload};
    case TOTAL_NET_FAMILY:
      return {...state, totalnetfamily: action.payload};

    default:
      return state;
  }
}