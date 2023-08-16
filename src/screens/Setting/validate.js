const validate = values => {
  const errors = {};
  if (!values.ip) {
    errors.ip = 'IP is required.';
  }
  if (!values.port) {
    errors.port = 'Port is required.';
  }

  return errors;
};

export default validate;
