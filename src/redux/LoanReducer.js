export const INQUIRY_LOAN_DATA = 'INQUIRY_LOAN_DATA';
export const SET_UPDATE_STATUS = 'SET_UPDATE_STATUS';

const customer = {
    edit_loandata: {},
    update_status: 'false',
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


export default function LoanReducder(state = customer, action) {
    switch (action.type) {
        case INQUIRY_LOAN_DATA:
            return { ...state, edit_loandata: action.payload };
        case SET_UPDATE_STATUS:
            return { ...state, update_status: action.payload };
        default:
            return state;
    }
}
