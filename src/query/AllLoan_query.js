export async function getAllLoan() {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT Individual_application.loan_type, Individual_application.application_no,Individual_application.borrower_name, Individual_application.application_amt,Individual_application.sync_sts FROM Individual_application ',
        [],
        (tx, results) => {
          resolve(results.rows.raw());
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
}
