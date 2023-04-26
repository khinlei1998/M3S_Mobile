const validate = (values) => {
    const errors = {};
    if (!values.user_id) {
        errors.user_id = "UserName is required.";
    }
    if (!values.password) {
        errors.password = "Password is required.";
    }


    return errors;
};

export default validate;