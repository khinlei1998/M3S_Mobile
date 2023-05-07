import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../common';

export function getEemployee_info() {
  return new Promise(async (resolve, reject) => {
    let ip = await AsyncStorage.getItem('ip');
    let port = await AsyncStorage.getItem('port');

    const batchSize = 100;
    global.db.transaction(tx => {
      tx.executeSql('DELETE FROM Employee', [], (tx, results) => {
        axios
          // .get(`https://${ip}`, {})
          .get(`${BASE_URL}api/employees.m3s`)
          .then(({data}) => {
            console.log('emp data length', data.length);
            if (data.length > 0) {
              const total = data.length;

              global.db.transaction(txn => {
                for (let i = 0; i < data.length; i += batchSize) {
                  const records = data.slice(i, i + batchSize);
                  records.forEach(item => {
                    txn.executeSql(
                      `INSERT INTO Employee (serial_no,employee_no,employee_name,employee_local_name,user_id,password,user_kind,resident_rgst_id,entry_date,tel_no,cell_phone_no,employee_type_code,branch_code,branch_name,local_branch_name,department_code,department_name,department_local_name,team_code,team_name,team_local_name,position_title_code,position_title_nm,position_title_lcl_nm,err_msg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                      [
                        item.serialNo,
                        item.employeeNo,
                        item.employeeName,
                        item.employeeLocalName,
                        item.userId,
                        item.password,
                        item.userKind,
                        null,
                        item.entryDate,
                        null,
                        null,
                        item.employeeTypeCode,
                        item.branchCode,
                        null,
                        null,
                        item.departmentCode,
                        item.departmentName,
                        item.departmentLocalName,
                        item.teamCode,
                        item.teamName,
                        item.teamLocalName,
                        item.positionTitleCode,
                        item.positionTitleNm,
                        item.positionTitleLclNm,
                        null,
                      ],
                      (tx, results) => {
                        console.log('Employee Insert success', results);
                        resolve('success');
                      },
                      (tx, error) => {
                        console.log('query error', error);
                        reject(error);
                      },
                    );
                  });
                }
              });
            }
          })
          .catch(error => reject(error));
      });
    });
  });
}

export const selectUser = async (user_id, password) => {
  console.log(user_id, password);
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Employee WHERE user_id = ? AND password = ?',
        [user_id, password],
        (tx, results) => {
          console.log('results', results);
          // if (results.rows.length > 0) {
          //   const user = results.rows.item(0);
          //   resolve(user);
          // } else {
          //   reject('Invalid email or password');
          // }
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
        'SELECT employee_name FROM Employee WHERE user_id = ? ',
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
