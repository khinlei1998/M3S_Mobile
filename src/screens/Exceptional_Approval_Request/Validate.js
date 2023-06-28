const validate = (values) => {
    const errors = {};
    if (!values.exception_reason) {
        errors.exception_reason = "Exception Reason is required.";
    }

    return errors;
};

export default validate;