const validate = values => {
  const errors = {};
  if (
    (values.brother_sister_yn && (values.grandparent_yn || values.parent_yn)) ||
    (values.grandparent_yn && (values.brother_sister_yn || values.parent_yn)) ||
    (values.parent_yn && (values.brother_sister_yn || values.grandparent_yn)) ||
    (values.husband_wife_yn &&
      (values.brother_sister_yn || values.grandparent_yn || values.parent_yn || values.son_daughter_yn)) ||
    (values.son_daughter_yn &&
      (values.brother_sister_yn || values.grandparent_yn || values.parent_yn || values.husband_wife_yn))
  ) {
    errors.parent_yn = '***Only one column must select';
  }

  return errors;
};

export default validate;
