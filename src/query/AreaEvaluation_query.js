import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getEvaluationData(application_no) {
  console.log('application_no', application_no);
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Area_evaluation WHERE application_no = ? ',
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

export const storeAreaEvaluation = async data => {
  console.log('data', data);
  const user_id = await AsyncStorage.getItem('user_id');
  return new Promise(async (resolve, reject) => {
    try {
      global.db.transaction(trans => {
        trans.executeSql(
          `INSERT INTO Area_evaluation (serial_no,area_evaluation_no,status_code,create_datetime,create_user_id,update_datetime,update_user_id,delete_datetime,delete_user_id,area_evaluation_date,application_no,township_name,village_name,auth_name,contract_no,street_text,households_text,population_text,house_text,house_own_text,house_rent_text,property_text,property_docm_text,occupation,mf_num_flag,mfi_remark,pastdue_sts_flag,pastdue_sta_remark,trnsrt_sts_flag,trnsrt_sts_remark,chnl_device_type,area_security_flag,area_security_remark,cmnc_sts_flag,cmnc_sts_remark,economy_sts_flag,economy_sts_remark,income_sts_flag,income_sts_remark,households_sts_flag,households_sts_remark,local_auth_sprt_flag,local_auth_sprt_rmrk,total_sts_flag,total_sts_remark,total_remark,prepare_empl_nm,check_empl_nm,summary,tablet_sync_sts,sync_sts,err_msg
) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            null, //serialNo
            data.area_evaluation_no,
            '01', //status code
            null, //create_datetime
            null, //create_user_id
            null, //update date time
            null, //update user id
            null, //delete_datetime
            null, //delete_user_id
            data.area_evaluation_date, //tablet aplic no //10
            data.application_no, //11
            data.township_name,
            data.village_name,
            data.auth_name,
            data.contract_no,
            data.street_text,
            data.households_text,
            data.population_text,
            data.house_text,
            data.house_own_text, //20
            data.house_rent_text,
            data.property_text,
            data.property_docm_text,
            data.occupation,
            data.mf_num_flag,
            data.mfi_remark,
            data.pastdue_sts_flag,
            data.pastdue_sta_remark,
            data.trnsrt_sts_flag,
            data.trnsrt_sts_remark, //30
            data.chnl_device_type,
            data.area_security_flag,
            data.area_security_remark,
            data.cmnc_sts_flag,
            data.cmnc_sts_remark,
            data.economy_sts_flag,
            data.economy_sts_remark,
            data.income_sts_flag,
            data.income_sts_remark, //39
            data.households_sts_flag, //40
            data.households_sts_remark,
            data.local_auth_sprt_flag,
            data.total_sts_flag, //44
            data.total_sts_remark,
            data.total_remark,
            data.prepare_empl_nm,
            data.check_empl_nm, //48
            data.summary,
            '00',
            '00',
            data.err_msg, //52
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
// export async function deleteGuarantor_ByID(guarantee_no) {
//   try {
//     return new Promise((resolve, reject) => {
//       global.db.transaction(tx => {
//         tx.executeSql(
//           'DELETE FROM Guarantee WHERE guarantee_no = ?',
//           [guarantee_no],
//           (txObj, resultSet) => {
//             console.log('resultSet', resultSet);
//             resolve('success');
//             // Delete query successful
//             console.log('Delete successful');
//           },
//           (txObj, error) => {
//             // Error occurred while executing the delete query
//             console.error('Delete error:', error);
//             reject(error);
//           },
//         );
//       });
//     });
//   } catch (error) {
//     console.error('Error deleting loan:', error);
//     throw error;
//   }
// }
