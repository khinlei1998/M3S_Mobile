export async function getAllGroupLoan() {
    return new Promise((resolve, reject) => {
        global.db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Group_application ',
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
export const storeGroupData = async data => {
    const user_id = await AsyncStorage.getItem('user_id');
    return new Promise(async (resolve, reject) => {
        try {
            global.db.transaction(trans => {
                trans.executeSql(
                    `INSERT INTO Group_application (serial_no,group_aplc_no,status_code,create_datetime,create_user_id,delete_datetime,delete_user_id,update_datetime,update_user_id,product_type,open_branch_code,open_user_id,mngt_branch_code,mngt_user_id,application_date,in_charge,township_name,customer_no,leader_name,resident_rgst_id,father_name,addr,tablet_sync_sts,sync_sts,err_msg) VALUES (?,?,?,?,?,)`,
                    [
                        null, //serialNo
                        null, //group_aplc_no
                        '01', //statusCode
                        '2020-09-09', //create Date Time
                        user_id,
                        null, //deleteDatetime
                        null, //delet usr id
                        null, //updateDatetime
                        user_id, //updateUserID
                        data.product_type, //loanStatusCode
                        //
                        data.open_branch_code, //Decison No
                        data.open_user_id, //contract no
                        data.mngt_branch_code, // product type
                        data.mngt_user_id, //Channel Device type
                        data.application_date, //open branch code
                        data.in_charge, //Open user id
                        data.township_name, //mngt_branch_code
                        data.customer_no, //mngt_user_id
                        data.leader_name, //20
                        data.resident_rgst_id,
                        data.father_name,
                        data.addr,
                        data.tablet_sync_sts, //application_date,
                        data.sync_sts,
                        data.err_msg //25
                    ],
                    (trans, results) => {
                        resolve('success');
                        console.log('success', results);
                    },
                    error => {
                        reject(error);
                        alert(error);
                    },
                );
            });
        } catch (error) {
            reject(error);
        }
    });
};
