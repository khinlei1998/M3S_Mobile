const validate = values => {
  const errors = {};
  if (!values.resident_rgst_id) {
    errors.resident_rgst_id = 'NRC is required.';
  }

  return errors;
};

export default validate;
