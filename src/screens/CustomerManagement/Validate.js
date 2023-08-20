const validate = values => {
  const errors = {};
  // if (!values.employeeNo) {
  //     errors.employeeNo = "UserName is required.";
  // }
  if (!values.employeeName) {
    errors.employeeName = 'CustomerName is required.';
  }
  if (!values.resident_rgst_id) {
    errors.resident_rgst_id = 'resident_rgst_id is required.';
  }

  if (!values.telNo) {
    errors.telNo = 'Telno is required.';
  }
  if (!values.nrcNo) {
    errors.nrcNo = 'NRC is required.';
  }
  //Customer update form
  if (!values.nrc_no) {
    errors.nrc_no = 'NRC is required.';
  }
  if (!values.city_code) {
    errors.city_code = 'City Code is required.';
  }
  if (!values.ts_code) {
    errors.ts_code = 'Township Code is required.';
  }

  return errors;
};

export default validate;
