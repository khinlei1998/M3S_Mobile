import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connection_name} from '../common';
export function get_Village(tokensource) {
  return new Promise(async (resolve, reject) => {
    let ip = await AsyncStorage.getItem('ip');
    let port = await AsyncStorage.getItem('port');
    const batchSize = 100;
    global.db.transaction(tx => {
      tx.executeSql('DELETE FROM Village', [], (tx, results) => {
        axios
          .get(
            `${connection_name}://${ip}:${port}/skylark-m3s/api/villages.m3s`,
            {
              cancelToken: tokensource.token,
            },
          )
          .then(({data}) => {
            if (data.length > 0) {
              let insertedRows = 0;
              global.db.transaction(tx => {
                for (let i = 0; i < data.length; i += batchSize) {
                  const records = data.slice(i, i + batchSize);
                  records.forEach(item => {
                    tx.executeSql(
                      'INSERT INTO Village (village_code,village_name,ts_code,ts_name) VALUES (?,?,?,?)',
                      [
                        item.villageCode,
                        item.villageName,
                        item.townshipCode,
                        item.townshipName,
                      ],
                      (tx, results) => {
                        insertedRows += results.rowsAffected;
                        if (insertedRows === data.length) {
                          resolve('success');
                          console.log(
                            'All Village records inserted successfully',
                          );
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
            } else {
              reject(error);
            }
          });
      });
    });
  });
}

export async function filterVillage(selectedColumn, searchTerm, ts_code) {
  let sql;
  if (selectedColumn && searchTerm) {
    sql = `SELECT * FROM Village  WHERE ${selectedColumn} LIKE '%${searchTerm}%' AND ts_code = '${ts_code}'`;
  } else {
    sql = `SELECT * FROM Village WHERE ts_code = '${ts_code}'`;
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

export const fetchVillageName = async village_code => {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Village WHERE village_code = ? ',
        [village_code],
        (tx, results) => {
          if (results.rows.length > 0) {
            resolve(results.rows.raw());
          } else {
            reject('village_code not found');
          }
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
};
