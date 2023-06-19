const validate = (values) => {
    const errors = {};
    if (!values.loan_type) {
        errors.loan_type = "Loan Type is required.";
    }
    if (!values.loan_cycle) {
        errors.loan_cycle = "Loan Cycle is required.";
    }
    if (!values.application_amt) {
        errors.application_amt = "Loan Apply Amount is required.";
    }
    if (!values.borrower_name) {
        errors.borrower_name = "Borrower Name is required.";
    }
    // if (!values.tel_no) {
    //     errors.tel_no = "Tel Number is required.";
    // }
    if (!values.product_type) {
        errors.product_type = "Product Type is required.";
    }
    if (!values.loanterm_cnt) {
        errors.loanterm_cnt = "Loan Term CNT is required.";
    }




    return errors;
};

export default validate;