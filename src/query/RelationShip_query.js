import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getRelationData(application_no) {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Relation_info WHERE application_no = ?',
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

export const storeRelation = async data => {
  const user_id = await AsyncStorage.getItem('user_id');
  return new Promise(async (resolve, reject) => {
    try {
      global.db.transaction(trans => {
        trans.executeSql(
          `INSERT INTO Relation_info (serial_no,relation_no,status_code,create_datetime,create_user_id,delete_datetime,delete_user_id,update_datetime,update_user_id,application_no,transaction_date,borrower_name,addr,resident_rgst_id,co_brwer_name,co_brwer_rgst_id,grandparent_yn,parent_yn,brother_sister_yn,husband_wife_yn,son_daughter_yn,tablet_sync_sts,sync_sts,relation_name,err_msg)
 VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            //25
            null, //serialNo
            data.relation_no, //org code
            '01', //status code
            null, //create_datetime
            null, //create_user_id
            null, //deleteDatetime
            null, //delet usr id
            null, //updateDatetime
            user_id, //updateUserID
            data.application_no,
            data.transaction_date,
            data.borrower_name,
            data.addr,
            data.resident_rgst_id,
            data.co_brwer_name,
            data.co_brwer_rgst_id,
            data.grandparent_yn,
            data.parent_yn,
            data.brother_sister_yn,
            data.husband_wife_yn,
            data.son_daughter_yn,
            data.tablet_sync_sts,
            data.sync_sts,
            data.relation_name,
            data.err_msg
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

export async function deleteRelation_ByID(relation_no) {
  console.log('relationNo',relation_no);
  try {
    return new Promise((resolve, reject) => {
      global.db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Relation_info WHERE relation_no = ?',
          [relation_no],
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
