export async function getAllLoan() {
  // let selectQuery = await ExecuteQuery(`SELECT * FROM m3t_application`, []);
  // var rows = selectQuery.rows;
  // var all_loans = [];
  // for (let i = 0; i < rows.length; i++) {
  //     var item = rows.item(i);
  //     console.warn(item);

  // }

  // return all_loans;
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT m3t_application.loan_type, m3t_application.application_no,m3t_application.borrower_name, m3t_application.application_amt,m3t_application.sync_sts FROM m3t_application ',
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
