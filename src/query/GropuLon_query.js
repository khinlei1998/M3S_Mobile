import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';
import moment from 'moment';
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
  const date = moment().format();

  return new Promise(async (resolve, reject) => {
    try {
      global.db.transaction(trans => {
        trans.executeSql(
          `INSERT INTO Group_application (serial_no,group_aplc_no,status_code,create_datetime,create_user_id,delete_datetime,delete_user_id,update_datetime,update_user_id,open_branch_code,product_type,open_user_id,mngt_branch_code,mngt_user_id,application_date,in_charge,township_name,customer_no,leader_name,resident_rgst_id,father_name,addr,tablet_sync_sts,sync_sts,err_msg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            null, //serialNo
            data.group_aplc_no, //group_aplc_no
            '01', //statusCode
            date, //create Date Time
            user_id,
            null, //deleteDatetime
            null, //delet usr id
            null, //updateDatetime
            user_id, //updateUserID
            //
            data.branch_code,
            data.product_type,
            user_id, //open user id
            '', // mng branch
            '', //mngt user id
            data.application_date,
            data.in_charge,
            data.township_name, //mngt_branch_code
            data.customer_no, //mngt_user_id
            data.leader_name, //20
            data.resident_rgst_id,
            data.father_name,
            data.addr,
            '00', //application_date,
            '00',
            data.err_msg, //25
          ],
          (trans, results) => {
            resolve('success');
          },
          error => {
            alert(error.message);
            reject(error);
          },
        );
      });
    } catch (error) {
      reject(error);
    }
  });
};
export async function getLoan_By_GroupID(group_aplc_no) {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        `SELECT *
        FROM Individual_application where group_aplc_no=?`,
        [group_aplc_no],
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

export async function deleteGroup_LoanID(data) {
  try {
    return new Promise((resolve, reject) => {
      global.db.transaction(tx => {
        let deletedApplicationNo;

        tx.executeSql(
          'DELETE FROM Group_application WHERE group_aplc_no = ?',
          [data.group_aplc_no],
          (txObj, resultSet) => {
            // Check if group_aplc_no exists in Individual_application table
            tx.executeSql(
              'SELECT application_no FROM Individual_application WHERE group_aplc_no = ?',
              [data.group_aplc_no],
              (txObj, resultSet) => {
                if (resultSet.rows.length > 0) {
                  deletedApplicationNo = resultSet.rows.item(0).application_no;
                  // Delete from Individual_application table
                  tx.executeSql(
                    'DELETE FROM Individual_application WHERE group_aplc_no = ?',
                    [data.group_aplc_no],
                    (txObj, resultSet) => {
                      tx.executeSql(
                        'DELETE FROM Area_evaluation WHERE application_no = ?',
                        [deletedApplicationNo],
                        (txObj, resultSet) => {
                          tx.executeSql(
                            'DELETE FROM Relation_info WHERE application_no = ?',
                            [deletedApplicationNo],
                            (txObj, resultSet) => {
                              tx.executeSql(
                                'DELETE FROM Guarantee WHERE application_no = ?',
                                [deletedApplicationNo],
                                (txObj, resultSet) => {
                                  tx.executeSql(
                                    'DELETE FROM Exception_aprv WHERE application_no = ?',
                                    [deletedApplicationNo],
                                    (txObj, resultSet) => {
                                      ToastAndroid.show(
                                        'Delete Success!',
                                        ToastAndroid.SHORT,
                                      );
                                      resolve('success');
                                    },
                                    (txObj, error) => {
                                      console.error(
                                        'Delete from Exception_aprv error:',
                                        error,
                                      );
                                      reject(error);
                                    },
                                  );
                                },
                                (txObj, error) => {
                                  console.error(
                                    'Delete from Guarantee error:',
                                    error,
                                  );
                                  reject(error);
                                },
                              );
                            },
                            (txObj, error) => {
                              console.error(
                                'Delete from Relation_info error:',
                                error,
                              );
                              reject(error);
                            },
                          );
                        },
                        (txObj, error) => {
                          console.error(
                            'Delete from Area_evaluation error:',
                            error,
                          );
                          reject(error);
                        },
                      );
                    },
                    (txObj, error) => {
                      console.error(
                        'Delete from Individual_application error:',
                        error,
                      );
                      reject(error);
                    },
                  );
                } else {
                  ToastAndroid.show(
                    'No matching records found in Individual_application',
                    ToastAndroid.SHORT,
                  );
                  resolve('success');
                }
              },
              (txObj, error) => {
                console.error(
                  'Select from Individual_application error:',
                  error,
                );
                reject(error);
              },
            );
          },
          (txObj, error) => {
            console.error('Delete from Group_application error:', error);
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
export const updateGroupData = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      global.db.transaction(trans => {
        trans.executeSql(
          `UPDATE Group_application SET serial_no=?,group_aplc_no=?,status_code=?,create_datetime=?,create_user_id=?,delete_datetime=?,delete_user_id=?,update_datetime=?,update_user_id=?,open_branch_code=?,product_type=?,open_user_id=?,mngt_branch_code=?,mngt_user_id=?,application_date=?,in_charge=?,township_name=?,customer_no=?,leader_name=?,resident_rgst_id=?,father_name=?,addr=?,tablet_sync_sts=?,sync_sts=?,err_msg=? WHERE group_aplc_no=?`,
          [
            data.serial_no,
            data.group_aplc_no,
            data.status_code,
            data.create_datetime,
            data.create_user_id,
            data.delete_datetime,
            data.delete_user_id,
            data.update_datetime,
            data.update_user_id,
            data.open_branch_code,
            data.product_type,
            data.open_user_id,
            data.mngt_branch_code,
            data.mngt_user_id,
            data.application_date,
            data.in_charge,
            data.township_name,
            data.customer_no,
            data.leader_name,
            data.resident_rgst_id,
            data.father_name,
            data.addr,
            data.tablet_sync_sts,
            data.sync_sts,
            data.err_msg,
            data.group_aplc_no,
          ],
          (trans, results) => {
            resolve('success');
          },
          error => {
            reject(error);
          },
        );
      });
    } catch (error) {
      reject(error);
    }
  });
};
