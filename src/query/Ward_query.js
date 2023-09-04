import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connection_name} from '../common';
export function get_Ward(tokensource) {
  console.log('tokensource',tokensource);
  return new Promise(async (resolve, reject) => {
    let ip = await AsyncStorage.getItem('ip');
    let port = await AsyncStorage.getItem('port');
    const batchSize = 100;
    global.db.transaction(tx => {
      tx.executeSql('DELETE FROM Ward', [], (tx, results) => {
        axios
          // .get(`https://${newIP}/skylark-m3s/api/employees.m3s`)
          .get(`${connection_name}://${ip}:${port}/skylark-m3s/api/wards.m3s`, {
            cancelToken: tokensource.token,
          })

          .then((response) => {
            const sizeInBytes = response.headers['content-length'] || '0';
            if (response.data.length > 0) {
              let insertedRows = 0;
              global.db.transaction(tx => {
                for (let i = 0; i < response.data.length; i += batchSize) {
                  const records = response.data.slice(i, i + batchSize);
                  records.forEach(item => {
                    tx.executeSql(
                      'INSERT INTO Ward (ward_code,ward_name,ts_code,ts_name) VALUES (?,?,?,?)',
                      [
                        item.wardCode,
                        item.wardName,
                        item.townshipCode,
                        item.townshipName,
                      ],
                      (tx, results) => {
                        insertedRows += results.rowsAffected;
                        if (insertedRows === response.data.length) {
                          // resolve('success');
                          resolve({response:'success',sizeInBytes})
                          console.log('All Ward records inserted successfully');
                        }
                      },
                      error => {
                        console.log('query error', error);
                        // If insert query fails, rollback the transaction and reject the promise
                        reject(error);
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
              console.log('axios request cancelled');
            } else {
              reject(error);
            }
          });
      });
    });
  });
}

export async function filterWard(selectedColumn, searchTerm, ts_code) {
  let sql;
  if (selectedColumn && searchTerm) {
    sql = `SELECT * FROM Ward  WHERE ${selectedColumn} LIKE '%${searchTerm}%' AND ts_code = '${ts_code}'`;
  } else {
    sql = `SELECT * FROM Ward WHERE ts_code = '${ts_code}'`;
  }
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
export const fetchWardName = async ward_code => {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Ward WHERE ward_code = ? ',
        [ward_code],
        (tx, results) => {
          if (results.rows.length > 0) {
            resolve(results.rows.raw());
          } else {
            reject('ward_code not found');
          }
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
};
