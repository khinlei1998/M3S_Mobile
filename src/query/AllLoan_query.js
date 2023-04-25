const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    global.db.transaction((trans) => {
        trans.executeSql(sql, params, (trans, results) => {
            resolve(results);
        },
            (error) => {
                reject(error);
                console.log('error', error);
            });
    });
});
export async function getAllLoan() {

    let selectQuery = await ExecuteQuery(`SELECT * FROM m3t_application`, []);
    var rows = selectQuery.rows;
    var all_loans = [];
    for (let i = 0; i < rows.length; i++) {
        var item = rows.item(i);
        console.warn(item);

    }

    return all_loans;
}
// export const getData = () => {
//     return new Promise((resolve, reject) => {
//         db.transaction((tx) => {
//             tx.executeSql(
//                 'SELECT * FROM table_name',
//                 [],
//                 (_, { rows: { _array } }) => resolve(_array),
//                 (tx, error) => reject(error)
//             );
//         });
//     });
// };