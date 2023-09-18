export const INQUIRY_LOAN_DATA = 'INQUIRY_LOAN_DATA';
export const SET_UPDATE_STATUS = 'SET_UPDATE_STATUS';
export const SET_Staff_Loan_UPDATE_STATUS = 'SET_Staff_Loan_UPDATE_STATUS';
export const SET_EXCEPTIONAL_APPROVAL_STATUS =
  'SET_EXCEPTIONAL_APPROVAL_STATUS';
export const SET_BORROWER_MAP_PATH = 'SET_BORROWER_MAP_PATH';
export const SET_EXCEPTIONAL_UPDATE_STATUS = 'SET_EXCEPTIONAL_UPDATE_STATUS';
export const SET_GUARANTOR_UPDATE_STATUS = 'SET_GUARANTOR_UPDATE_STATUS';
export const SET_RELATION_UPDATE_STATUS = 'SET_RELATION_UPDATE_STATUS';
export const SET_EVALUATION_SCORE = 'SET_EVALUATION_SCORE';
export const SET_AREA_UPDATE_STATUS = 'SET_AREA_UPDATE_STATUS';
export const SET_GROUP_UPDATE_STATUS = 'SET_GROUP_UPDATE_STATUS';
export const SET_COVER_UPDATE_STATUS = 'SET_COVER_UPDATE_STATUS';
export const SET_RELOAN_UPDATE_STATUS = 'SET_RELOAN_UPDATE_STATUS';
export const SET_LOAN_EXPAND = 'SET_LOAN_EXPAND';
export const SET_LOAN_DATA = 'SET_LOAN_DATA';
export const SET_LOAN_MAX_DATA = 'SET_LOAN_MAX_DATA';
export const SET_PRODUCT_TYPE = 'SET_PRODUCT_TYPE';
export const SET_BORROWER_MODAL = 'SET_BORROWER_MODAL';
export const SET_CITY_MODAL = 'SET_CITY_MODAL';
export const SET_TOWNSHIP_MODAL = 'SET_TOWNSHIP_MODAL';
export const SET_LOCATION_MODAL = 'SET_LOCATION_MODAL';
export const SET_VILLAGE_MODAL = 'SET_VILLAGE_MODAL';
export const SET_WARD_MODAL = 'SET_WARD_MODAL';
const loan = {
  edit_loandata: {},
  update_status: 'false',
  staff_loan_update_status: 'false',
  except_app_status: 0,
  borrower_map_path: '',
  exceptional_update_status: 'false',
  gurantor_update_status: 'false',
  relation_update_status: 'false',
  evaluation_score: 0,
  area_update_status: 'false',
  group_update_status: 'false',
  cover_update_status: 'false',
  reloan_update_status: 'false',
  loan_expand: 'false',
  loan_all_data: [],
  loan_max_data: [],
  p_type: '',
  borrower_modal_visible: false,
  city_modal_visible: false,
  township_modal_visible: false,
  village_modal_visible: false,
  location_modal_visible: false,
  ward_modal_visible: false,

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
export const setEvaluation_Score = props => {
  return {
    type: 'SET_EVALUATION_SCORE',
    payload: props,
  };
};
export const setAREA_UpdateStatus = props => {
  return {
    type: 'SET_AREA_UPDATE_STATUS',
    payload: props,
  };
};
export const setGroup_UpdateStatus = props => {
  return {
    type: 'SET_GROUP_UPDATE_STATUS',
    payload: props,
  };
};
export const setCover_UpdateStatus = props => {
  return {
    type: 'SET_COVER_UPDATE_STATUS',
    payload: props,
  };
};
export const setReloan_UpdateStatus = props => {
  return {
    type: 'SET_RELOAN_UPDATE_STATUS',
    payload: props,
  };
};
export const setloan_Expand = props => {
  return {
    type: 'SET_LOAN_EXPAND',
    payload: props,
  };
};
export const setLoan_Data = props => {
  return {
    type: 'SET_LOAN_DATA',
    payload: props,
  };
};
export const setLoan_Max_Data = props => {
  return {
    type: 'SET_LOAN_MAX_DATA',
    payload: props,
  };
};
export const setProductType = props => {
  return {
    type: 'SET_PRODUCT_TYPE',
    payload: props,
  };
};
export const setBorrowerModalVisible = props => {
  return {
    type: 'SET_BORROWER_MODAL',
    payload: props,
  };
};
export const setCityModalVisible = props => {
  return {
    type: 'SET_CITY_MODAL',
    payload: props,
  };
};
export const setTownshipModalVisible = props => {
  return {
    type: 'SET_TOWNSHIP_MODAL',
    payload: props,
  };
};
export const setLocationModalVisible = props => {
  return {
    type: 'SET_LOCATION_MODAL',
    payload: props,
  };
};
export const setVillageModalVisible = props => {
  return {
    type: 'SET_VILLAGE_MODAL',
    payload: props,
  };
};
export const setWardModalVisible = props => {
  return {
    type: 'SET_WARD_MODAL',
    payload: props,
  };
};
export default function LoanReducder(state = loan, action) {
  switch (action.type) {
    case INQUIRY_LOAN_DATA:
      return { ...state, edit_loandata: action.payload };
    case SET_UPDATE_STATUS:
      return { ...state, update_status: action.payload };
    case SET_Staff_Loan_UPDATE_STATUS:
      return { ...state, staff_loan_update_status: action.payload };
    case SET_EXCEPTIONAL_APPROVAL_STATUS:
      return { ...state, except_app_status: action.payload };
    case SET_EXCEPTIONAL_UPDATE_STATUS:
      return { ...state, exceptional_update_status: action.payload };
    case SET_BORROWER_MAP_PATH:
      return { ...state, borrower_map_path: action.payload };
    case SET_GUARANTOR_UPDATE_STATUS:
      return { ...state, gurantor_update_status: action.payload };
    case SET_RELATION_UPDATE_STATUS:
      return { ...state, relation_update_status: action.payload };
    case SET_EVALUATION_SCORE:
      return { ...state, evaluation_score: action.payload };
    case SET_AREA_UPDATE_STATUS:
      return { ...state, area_update_status: action.payload };
    case SET_GROUP_UPDATE_STATUS:
      return { ...state, group_update_status: action.payload };
    case SET_COVER_UPDATE_STATUS:
      return { ...state, cover_update_status: action.payload };
    case SET_RELOAN_UPDATE_STATUS:
      return { ...state, reloan_update_status: action.payload };
    case SET_LOAN_EXPAND:
      return { ...state, loan_expand: action.payload };
    case SET_LOAN_DATA:
      return { ...state, loan_all_data: action.payload };
    case SET_LOAN_MAX_DATA:
      return { ...state, loan_max_data: action.payload };
    case SET_PRODUCT_TYPE:
      return { ...state, p_type: action.payload };
    case SET_BORROWER_MODAL:
      return { ...state, borrower_modal_visible: action.payload };
    case SET_CITY_MODAL:
      return { ...state, city_modal_visible: action.payload };
    case SET_TOWNSHIP_MODAL:
      return { ...state, township_modal_visible: action.payload };
    case SET_LOCATION_MODAL:
      return { ...state, location_modal_visible: action.payload };
    case SET_VILLAGE_MODAL:
      return { ...state, village_modal_visible: action.payload };
    case SET_WARD_MODAL:
      return { ...state, ward_modal_visible: action.payload };
    default:
      return state;
  }
}
