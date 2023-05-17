const validate = (values) => {
    const errors = {};
    if (!values.employeeNo) {
        errors.employeeNo = "UserName is required.";
    }
   

    return errors;
};

export default validate;