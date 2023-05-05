import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../common';
export const getEemployee_info = () => {
  return new Promise(async (resolve, reject) => {
    let ip = await AsyncStorage.getItem('ip');
    let port = await AsyncStorage.getItem('port');

    const batchSize = 100;
    let count = 0;

    global.db.transaction((tx) => {
      tx.executeSql('DELETE FROM Employee', [], (tx, results) => {
        // If delete query succeeds, execute insert query
        axios
          // .get(`https://${ip}`, {})
          .get(`${BASE_URL}skylark-m3s/api/employees.m3s`)
          .then(({ data }) => {
            if (data.length > 0) {
              const total = data.length;
              console.log('em length', data.length);
              // for (let i = 0; i < data.length; i += 200) {
              //   // Get the next 100 records
              //   let records = data.slice(i, i + 200);
              for (let i = 0; i < total; i += batchSize) {
                const records = data.slice(i, i + batchSize);
                // console.log('record length', records.length);
                global.db.transaction(tx => {

                  records.forEach(item => {
                    tx.executeSql('INSERT INTO Employee (serial_no,employee_no,employee_name,employee_local_name,user_id,password,user_kind,resident_rgst_id,entry_date,tel_no,cell_phone_no,employee_type_code,branch_code,branch_name,local_branch_name,department_code,department_name,department_local_name,team_code,team_name,team_local_name,position_title_code,position_title_nm,position_title_lcl_nm,err_msg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
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

                       
                        // If insert query succeeds, resolve the promise
                        console.log('Employee Insert success', results);
                        console.log('count', count);
                        console.log('length', data.length);

                      }, (error) => {
                        // If insert query fails, rollback the transaction and reject the promise
                        tx.executeSql('ROLLBACK', [], () => {
                          reject(error);
                        });
                      });
                    console.log('reach');
                  })

                  count += batchSize;
                  if (count % 100 == 0) {
                    console.log('finale count',count);
                    // Resolve Promise every 500 rows inserted
                    resolve('success');
                  }
                })
              }
            }
          })
          .catch(error => {
            console.log('axios error', error);
            reject(error);
          });

      },
        (error) => {
          // If delete query fails, rollback the transaction and reject the promise
          tx.executeSql('ROLLBACK', [], () => {
            reject(error);
          });
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
