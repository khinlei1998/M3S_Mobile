import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeExceptionalApproval = async data => {
    const user_id = await AsyncStorage.getItem('user_id');
    return new Promise(async (resolve, reject) => {
        try {
            global.db.transaction(trans => {
                trans.executeSql(
                    `INSERT INTO Exception_aprv (serial_no,excpt_aprv_rqst_no,status_code,create_datetime,create_user_id,delete_datetime,delete_user_id,update_datetime,update_user_id,group_aplc_no,application_no,exception_rqst_date,borrower_name,application_amt,birth_date,borrower_age,group_member_num,occupation,net_income,excpt_aprv_rsn_1,excpt_aprv_rsn_2,excpt_aprv_rsn_3,exception_reason,recommend_nm,tablet_sync_sts,sync_sts,err_msg
) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [
                        null, //serialNo
                        data.excpt_aprv_rqst_no,
                        '01', //status code
                        null, //create_datetime
                        null,//create_user_id
                        null, //deleteDatetime
                        null, //delet usr id
                        null, //updateDatetime
                        user_id, //updateUserID
                        data.group_aplc_no,
                        data.application_no,
                        data.exception_rqst_date,
                        data.borrower_name,
                        data.application_amt,
                        data.birth_date,
                        data.borrower_age,
                        data.group_member_num,
                        data.occupation,
                        data.net_income,
                        data.excpt_aprv_rsn_1,
                        data.excpt_aprv_rsn_2,
                        data.excpt_aprv_rsn_3,
                        data.exception_reason,
                        data.recommend_nm,
                        data.tablet_sync_sts,
                        data.sync_sts,
                        data.err_msg //27

                    ],
                    (trans, results) => {
                        resolve('success');
                        console.log('success', results);
                    },
                    error => {
                        reject(error);
                        console.log('error', error);
                    },
                );
            });
        } catch (error) {
            reject(error);
        }
    });
};

export async function getExceptionalApproval(application_no) {
    return new Promise((resolve, reject) => {
        global.db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Exception_aprv WHERE application_no = ?',
                [application_no],
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

export async function deleteExceptional_approval_ByID(excpt_aprv_rqst_no) {
    try {

        return new Promise((resolve, reject) => {
            global.db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM Exception_aprv WHERE excpt_aprv_rqst_no = ?',
                    [excpt_aprv_rqst_no],
                    (txObj, resultSet) => {
                        resolve('success');
                        // Delete query successful
                        console.log('Delete successful');
                    },
                    (txObj, error) => {
                        // Error occurred while executing the delete query
                        console.error('Delete error:', error);
                        reject(error);
                    },
                );
            });
        });
    } catch (error) {
        console.error('Error deleting loan:', error);
        throw error;
    }
}

export async function getAllExceptionalApproval() {
    return new Promise((resolve, reject) => {
        global.db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Exception_aprv ',
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

export const updateExceptionalApproval = async data => {
    const user_id = await AsyncStorage.getItem('user_id');
    return new Promise(async (resolve, reject) => {
        try {
            global.db.transaction(trans => {
                trans.executeSql(
                    `UPDATE  Exception_aprv SET serial_no=?,excpt_aprv_rqst_no=?,status_code=?,create_datetime=?,create_user_id=?,delete_datetime=?,delete_user_id=?,update_datetime=?,update_user_id=?,group_aplc_no=?,application_no=?,exception_rqst_date=?,borrower_name=?,application_amt=?,birth_date=?,borrower_age=?,group_member_num=?,occupation=?,net_income=?,excpt_aprv_rsn_1=?,excpt_aprv_rsn_2=?,excpt_aprv_rsn_3=?,exception_reason=?,recommend_nm=?,tablet_sync_sts=?,sync_sts=?,err_msg=? WHERE excpt_aprv_rqst_no = ?`,
                    [
                        data.serial_no, //serialNo
                        data.excpt_aprv_rqst_no,
                        data.status_code, //status code
                        data.create_datetime, //create_datetime
                        data.create_user_id,//create_user_id
                        data.delete_datetime, //deleteDatetime
                        data.delete_user_id, //delet usr id
                        data.update_datetime, //updateDatetime
                        data.update_user_id, //updateUserID
                        data.group_aplc_no,
                        data.application_no,
                        data.exception_rqst_date,
                        data.borrower_name,
                        data.application_amt,
                        data.birth_date,
                        data.borrower_age,
                        data.group_member_num,
                        data.occupation,
                        data.net_income,
                        data.excpt_aprv_rsn_1,
                        data.excpt_aprv_rsn_2,
                        data.excpt_aprv_rsn_3,
                        data.exception_reason,
                        data.recommend_nm,
                        data.tablet_sync_sts,
                        data.sync_sts,
                        data.err_msg ,//27
                        data.excpt_aprv_rqst_no

                    ],
                    (trans, results) => {
                        resolve('success');
                        console.log('success', results);
                    },
                    error => {
                        reject(error);
                        console.log('error', error);
                    },
                );
            });
        } catch (error) {
            reject(error);
        }
    });
};