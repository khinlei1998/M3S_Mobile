import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../common';

export function getEemployee_info() {
  return new Promise(async (resolve, reject) => {
    console.log('call function');
    let ip = await AsyncStorage.getItem('ip');
    let port = await AsyncStorage.getItem('port');
    const batchSize = 100;
    let totalRowsAffected = 0;
    const searchWord = '/skylark-m3s';
    const newIP = ip.replace(
      new RegExp(searchWord, 'g'),
      ':' + port + searchWord,
    );

    const testdat = [
      {
        serialNo: 1,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '1',
        password:
          'NkI4NkIyNzNGRjM0RkNFMTlENkI4MDRFRkY1QTNGNTc0N0FEQTRFQUEyMkYxRDQ5QzAxRTUyRERCNzg3NUI0Qg==',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
      {
        serialNo: 2,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '4',
        password: '323',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
      {
        serialNo: 3,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '4',
        password: '323',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
      {
        serialNo: 4,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '4',
        password: '323',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
      {
        serialNo: 5,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '4',
        password: '323',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
      {
        serialNo: 6,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '4',
        password: '323',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
      {
        serialNo: 7,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '4',
        password: '323',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
      {
        serialNo: 8,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '4',
        password: '323',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
      {
        serialNo: 9,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '4',
        password: '323',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
      {
        serialNo: 10,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '4',
        password: '323',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
    ];
    global.db.transaction(tx => {
      tx.executeSql('DELETE FROM Employee', [], (tx, results) => {
        console.log('Delete success');
        axios
          // .get(`https://${newIP}/skylark-m3s/api/employees.m3s`)
          .get(`https://${ip}:${port}/skylark-m3s/api/employees.m3s`)
          .then(({data}) => {
            console.log('data', data.length);
            if (data.length > 0) {
              let insertedRows = 0;
              global.db.transaction(tx => {
                for (let i = 0; i < data.length; i += batchSize) {
                  const records = data.slice(i, i + batchSize);
                  console.log('records>>>>>>', records.length);
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
                        // If insert query succeeds, resolve the promise
                        // console.log('Employee Insert success', results.rowsAffected);
                        console.log('length', data.length);

                        insertedRows += results.rowsAffected;
                        console.log('insertedRows>>>>', insertedRows);
                        if (insertedRows === data.length) {
                          resolve('success');
                          console.log('All records inserted successfully');
                        }
                      },
                      error => {
                        console.log('query error', error);
                        // If insert query fails, rollback the transaction and reject the promise
                        tx.executeSql('ROLLBACK', [], () => {
                          reject(error);
                        });
                      },
                    );
                  });
                }
              });
            }
          })
          .catch(error => {
            alert(error);
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
        // `SELECT * FROM Customer WHERE ${selectedColumn} = ?`,
        // [searchTerm],
        sql,
        [],
        (tx, results) => {
          console.log('result query', results);
          resolve(results.rows.raw());
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
}
