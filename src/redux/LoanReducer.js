export const INQUIRY_LOAN_DATA = 'INQUIRY_LOAN_DATA';
export const SET_UPDATE_STATUS = 'SET_UPDATE_STATUS';
export const SET_Staff_Loan_UPDATE_STATUS = 'SET_Staff_Loan_UPDATE_STATUS';
export const SET_EXCEPTIONAL_APPROVAL_STATUS =
  'SET_EXCEPTIONAL_APPROVAL_STATUS';
export const SET_BORROWER_MAP_PATH = 'SET_BORROWER_MAP_PATH';
export const SET_EXCEPTIONAL_UPDATE_STATUS = 'SET_EXCEPTIONAL_UPDATE_STATUS';
export const SET_GUARANTOR_UPDATE_STATUS = 'SET_GUARANTOR_UPDATE_STATUS';
export const SET_RELATION_UPDATE_STATUS = 'SET_RELATION_UPDATE_STATUS';

const loan = {
  edit_loandata: {},
  update_status: 'false',
  staff_loan_update_status: 'false',
  except_app_status: 0,
  borrower_map_path: '',
  exceptional_update_status: 'false',
  gurantor_update_status: 'false',
  relation_update_status: 'false',
};

export const addInquiryLoanData = props => {
  return {
    type: 'INQUIRY_LOAN_DATA',
    payload: props,
  };
};
export const setUpdateStatus = props => {
  return {
    type: 'SET_UPDATE_STATUS',
    payload: props,
  };
};

export const setStaffLoanUpdateStatus = props => {
  return {
    type: 'SET_Staff_Loan_UPDATE_STATUS',
    payload: props,
  };
};
export const setExcept_ApprovalStatus = props => {
  return {
    type: 'SET_EXCEPTIONAL_APPROVAL_STATUS',
    payload: props,
  };
};
export const setExcept_UPDATEStatus = props => {
  return {
    type: 'SET_EXCEPTIONAL_UPDATE_STATUS',
    payload: props,
  };
};
export const setBorrowerMap_Path = props => {
  return {
    type: 'SET_BORROWER_MAP_PATH',
    payload: props,
  };
};
export const setGuarantor_UpdateStatus = props => {
  return {
    type: 'SET_GUARANTOR_UPDATE_STATUS',
    payload: props,
  };
};
export const setRelation_UpdateStatus = props => {
  return {
    type: 'SET_RELATION_UPDATE_STATUS',
    payload: props,
  };
};

export default function LoanReducder(state = loan, action) {
  switch (action.type) {
    case INQUIRY_LOAN_DATA:
      return {...state, edit_loandata: action.payload};
    case SET_UPDATE_STATUS:
      return {...state, update_status: action.payload};
    case SET_Staff_Loan_UPDATE_STATUS:
      return {...state, staff_loan_update_status: action.payload};
    case SET_EXCEPTIONAL_APPROVAL_STATUS:
      return {...state, except_app_status: action.payload};
    case SET_EXCEPTIONAL_UPDATE_STATUS:
      return {...state, exceptional_update_status: action.payload};
    case SET_BORROWER_MAP_PATH:
      return {...state, borrower_map_path: action.payload};
    case SET_GUARANTOR_UPDATE_STATUS:
      return {...state, gurantor_update_status: action.payload};
    case SET_RELATION_UPDATE_STATUS:
      return {...state, relation_update_status: action.payload};
    default:
      return state;
  }
}
