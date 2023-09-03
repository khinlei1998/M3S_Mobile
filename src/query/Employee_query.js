import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connection_name} from '../common';
import {createCancelTokenSource} from '../components/CancelUtils';

export function getEemployee_info(tokensource) {
  return new Promise(async (resolve, reject) => {
    let ip = await AsyncStorage.getItem('ip');
    let port = await AsyncStorage.getItem('port');
    const batchSize = 100;
    global.db.transaction(tx => {
      tx.executeSql('DELETE FROM Employee', [], (tx, results) => {
        axios
          .get(
            `${connection_name}://${ip}:${port}/skylark-m3s/api/employees.m3s`,
            {
              cancelToken: tokensource.token,
            },
          )
          .then(response => {
            const sizeInBytes = response.headers['content-length'] || '0';
            if (response.data.length > 0) {
              let insertedRows = 0;
              global.db.transaction(tx => {
                for (let i = 0; i < response.data.length; i += batchSize) {
                  const records = response.data.slice(i, i + batchSize);
                  records.forEach(item => {
                    tx.executeSql(
                      'INSERT INTO Employee (serial_no,employee_no,employee_name,employee_local_name,user_id,password,user_kind,resident_rgst_id,entry_date,tel_no,cell_phone_no,employee_type_code,branch_code,branch_name,local_branch_name,department_code,department_name,department_local_name,team_code,team_name,team_local_name,position_title_code,position_title_nm,position_title_lcl_nm,err_msg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
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
                        insertedRows += results.rowsAffected;
                        if (insertedRows === data.length) {
                          // resolve('success');
                          resolve({response:'success',sizeInBytes})
                          console.log(
                            'All Employee records inserted successfully',
                          );
                        }
                      },
                      error => {
                        console.log('query error', error);
                        // If insert query fails, rollback the transaction and reject the promise
                        // tx.executeSql('ROLLBACK', [], () => {
                        reject(error);
                        // });
                      },
                    );
                  });
                }
              });
            }
          })
          .catch(error => {
            if (axios.isCancel(error)) {
              reject('Request canceled by user');
            } else {
              reject(error);
            }
          });
      });
    });
  });
}

export const selectUser = async (user_id, password) => {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Employee WHERE user_id = ? AND password = ?',
        [user_id, password],
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

export const get_loged_branch_code = async () => {
  const user_id = await AsyncStorage.getItem('user_id');
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT branch_code FROM Employee WHERE user_id = ? ',
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

export async function filterEmp(selectedColumn, searchTerm) {
  let sql;
  if (selectedColumn && searchTerm) {
    sql = `SELECT * FROM Employee  WHERE ${selectedColumn} LIKE '%${searchTerm}%'`;
  } else {
    sql = 'SELECT * FROM Employee';
  }
  //20201116057
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        sql,
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
