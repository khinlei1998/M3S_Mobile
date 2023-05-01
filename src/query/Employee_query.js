import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function getEemployee_info() {
  return new Promise(async (resolve, reject) => {
    let ip = await AsyncStorage.getItem('ip');
    let port = await AsyncStorage.getItem('port');
    axios
      // .get(`https://${ip}`, {})
      .get(`https://api.thedogapi.com/v1/breeds?limit=10&page=0`)
      .then(({data}) => {
        if (data.length > 0) {
          console.log('kk');
          global.db.transaction(txn => {
            txn.executeSql(
              `INSERT INTO Employee (serial_no,employee_no,employee_name,employee_local_name,user_id,password,user_kind,resident_rgst_id,entry_date,tel_no,cell_phone_no,employee_type_code,branch_code,branch_name,local_branch_name,department_code,department_name,department_local_name,team_code,team_name,team_name,team_local_name,position_title_code,position_titile_nm,position_title_lcl_nm,err_msg,) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
              [
                '131',
                'M00172',
                'Khaing Su Mon',
                'ခိုင္စုမြန္',
                'M00172',
                '6B86B273FF34FCE19D6B804EFF5A3F5747ADA4EAA22F1D49C01E52DDB7875B4B',
                null,
                null,
                '2018-11-15',
                '0988',
                '09877',
                '400',
                '00001',
                'branch name',
                'local branch',
                '01212',
                'Sales Operation Division',
                'dept local name',
                '214T1',
                'MDY Team B',
                'MDY Team B',
                'LOO',
                'Loan Officer',
                'ချေးငွေအရာရှိ',
                'erro msg',
     
              ],
              (tx, results) => {
                console.log('Employee Insert success', results);
                resolve('success');
              },
              (tx, error) => {
                console.log('error',error);
                reject(error);
              },
            );
          });
        }
      })
      .catch(error => reject(error));
  });
}

export const selectUser = async (user_id, password) => {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM employee_info WHERE user_id = ? AND password = ?',
        // [user_id, password],
        [
          'M00172',
          '6B86B273FF34FCE19D6B804EFF5A3F5747ADA4EAA22F1D49C01E52DDB7875B4B',
        ],
        (tx, results) => {
          if (results.rows.length > 0) {
            const user = results.rows.item(0);
            resolve(user);
          } else {
            reject('Invalid email or password');
          }
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
};

export const fetchEmpName = async () => {
  const user_id = await AsyncStorage.getItem('user_id');
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT employee_name FROM employee_info WHERE user_id = ? ',
        [user_id],
        (tx, results) => {
          const rows = results.rows.raw();
          resolve(rows);
        },
        error => {
          reject(error);
        },
      );
    });
  });
};
