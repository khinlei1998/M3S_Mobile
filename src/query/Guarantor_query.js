import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
export async function getGuarantorData(application_no) {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Guarantee WHERE application_no = ?',
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

export const storeGuarantor = async data => {
  const user_id = await AsyncStorage.getItem('user_id');
  const date = moment().format();
  return new Promise(async (resolve, reject) => {
    try {
      global.db.transaction(trans => {
        trans.executeSql(
          `INSERT INTO Guarantee (serial_no,organization_code,status_code,create_datetime,create_user_id,delete_datetime,delete_user_id,update_datetime,update_user_id,tablet_aplc_no,application_no,guarantee_no,tablet_guarantee_no,guarantee_date,guarantor_no,guarantor_nm,marital_status,gender,birth_date,resident_rgst_id,tel_no,addr,curr_resident_perd,borrower_rltn,relation_period,house_ocpn_type,business_own_type,workplace_name,workplace_type,workplace_period,employee_num,workplace_addr,curr_workplace_perd,land_scale,land_own_type,tablet_sync_sts,sync_sts,curr_resident_date,workplace_date,curr_workplace_date,relation_date,err_msg
) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            null, //serialNo
            null, //org code
            '01', //status code
            date, //create_datetime
            null, //create_user_id
            null, //deleteDatetime
            null, //delet usr id
            null, //updateDatetime
            user_id, //updateUserID
            data.tablet_aplc_no, //tablet aplic no //10
            data.application_no,
            data.guarantee_no,
            data.tablet_guarantee_no,
            data.guarantee_date,
            data.guarantor_no,
            data.guarantor_nm,
            data.marital_status,
            data.gender,
            data.birth_date, //20
            data.resident_rgst_id,
            data.tel_no,
            data.addr,
            data.curr_resident_perd,
            data.borrower_rltn,
            data.relation_period,
            data.house_ocpn_type,
            data.business_own_type,
            data.workplace_name,
            data.workplace_type,
            data.workplace_period,
            data.employee_num,
            data.workplace_addr,
            data.curr_workplace_perd,
            data.land_scale,
            data.land_own_type, //35
            '00', //tablet_sync_sts
            '00', //sync_sts
            data.curr_resident_date,
            data.workplace_date,
            data.curr_workplace_date,
            data.relation_date,
            data.err_msg, //42
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
export async function deleteGuarantor_ByID(guarantee_no) {
  try {
    return new Promise((resolve, reject) => {
      global.db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Guarantee WHERE guarantee_no = ?',
          [guarantee_no],
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
export const updateGuarantor = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      global.db.transaction(trans => {
        trans.executeSql(
          `UPDATE  Guarantee SET serial_no=?,organization_code=?,status_code=?,create_datetime=?,create_user_id=?,delete_datetime=?,delete_user_id=?,update_datetime=?,update_user_id=?,tablet_aplc_no=?,application_no=?,guarantee_no=?,tablet_guarantee_no=?,guarantee_date=?,guarantor_no=?,guarantor_nm=?,marital_status=?,gender=?,birth_date=?,resident_rgst_id=?,tel_no=?,addr=?,curr_resident_perd=?,borrower_rltn=?,relation_period=?,house_ocpn_type=?,business_own_type=?,workplace_name=?,workplace_type=?,workplace_period=?,employee_num=?,workplace_addr=?,curr_workplace_perd=?,land_scale=?,land_own_type=?,tablet_sync_sts=?,sync_sts=?,curr_resident_date=?,workplace_date=?,curr_workplace_date=?,relation_date=?,err_msg=? WHERE guarantee_no = ?
`,
          [
            data.serial_no, //serialNo
            data.organization_code, //org code
            data.status_code, //status code
            data.create_datetime, //create_datetime
            data.create_user_id, //create_user_id
            data.delete_datetime, //deleteDatetime
            data.delete_user_id, //delet usr id
            data.update_datetime, //updateDatetime
            data.update_user_id, //updateUserID
            data.tablet_aplc_no, //tablet aplic no //10
            data.application_no,
            data.guarantee_no,
            data.tablet_guarantee_no,
            data.guarantee_date,
            data.guarantor_no,
            data.guarantor_nm,
            data.marital_status,
            data.gender,
            data.birth_date, //20
            data.resident_rgst_id,
            data.tel_no,
            data.addr,
            data.curr_resident_perd,
            data.borrower_rltn,
            data.relation_period,
            data.house_ocpn_type,
            data.business_own_type,
            data.workplace_name,
            data.workplace_type,
            data.workplace_period,
            data.employee_num,
            data.workplace_addr,
            data.curr_workplace_perd,
            data.land_scale,
            data.land_own_type, //35
            data.tablet_sync_sts, //tablet_sync_sts
            data.sync_sts, //sync_sts
            data.curr_resident_date,
            data.workplace_date,
            data.curr_workplace_date,
            data.relation_date,
            data.err_msg, //42
            data.guarantee_no
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
