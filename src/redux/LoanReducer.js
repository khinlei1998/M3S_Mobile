export const INQUIRY_LOAN_DATA = 'INQUIRY_LOAN_DATA';
const customer = {
    edit_loandata: {},
};

export const addInquiryLoanData = props => {
    return {
        type: 'INQUIRY_LOAN_DATA',
        payload: props,
    };
};


export default function LoanReducder(state = customer, action) {
    switch (action.type) {
        case INQUIRY_LOAN_DATA:
            return { ...state, edit_loandata: action.payload };

        default:
            return state;
    }
}
