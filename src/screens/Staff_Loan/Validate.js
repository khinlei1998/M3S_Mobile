const validate = (values) => {
    const errors = {};
    // if (!values.employeeNo) {
    //     errors.employeeNo = "UserName is required.";
    // }
    if (!values.application_no) {
        errors.application_no = "Application Number is required.";
    }
   
    if (!values.application_amt) {
        errors.application_amt = "Loan Apply Amount is required.";
    }
    if (!values.employee_no) {
        errors.employee_no = "Employee Number is required.";
    }
    if (!values.borrower_name) {
        errors.borrower_name = "Borrower Name is required.";
    }
    if (!values.resident_rgst_id) {
        errors.resident_rgst_id = "NRC is required.";
    }
    

    return errors;
};

export default validate;