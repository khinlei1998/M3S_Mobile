const validate = values => {
    const errors = {};

    console.log('update vaues',values);

    if (!values.customer_nm) {
      errors.customer_nm = 'CustomerName is required.';
    }
    if (!values.resident_rgst_id) {
      errors.resident_rgst_id = 'resident_rgst_id is required.';
    }

    if (!values.tel_no) {
      errors.tel_no = 'Telno is required.';
    }

    if (!values.nrc_no) {
      errors.nrc_no = 'NRC is required.';
    }

    return errors;
  };

  export default validate;
