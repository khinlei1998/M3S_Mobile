const validate = (values) => {
    const errors = {};
    // if (!values.employeeNo) {
    //     errors.employeeNo = "UserName is required.";
    // }
    if (!values.employeeName) {
        errors.employeeName = "CustomerName is required.";
    }
   
    if (!values.telNo) {
        errors.telNo = "Telno is required.";
    }




    return errors;
};

export default validate;