import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../common';
import {connection_name} from '../common';

export function getCodeInfo(tokensource) {
  return new Promise(async (resolve, reject) => {
    let ip = await AsyncStorage.getItem('ip');
    let port = await AsyncStorage.getItem('port');
    const batchSize = 100;
    let totalRowsAffected = 0;
    const searchWord = '/skylark-m3s';
    const newIP = ip.replace(
      new RegExp(searchWord, 'g'),
      ':' + port + searchWord,
    );

    global.db.transaction(tx => {
      tx.executeSql('DELETE FROM Code', [], (tx, results) => {
        axios
          // .get(`https://${newIP}/skylark-m3s/api/employees.m3s`)
          .get(`${connection_name}://${ip}:${port}/skylark-m3s/api/codes.m3s`, {
            cancelToken: tokensource.token,
          })
          .then(({data}) => {
            if (data.length > 0) {
              let insertedRows = 0;
              global.db.transaction(tx => {
                for (let i = 0; i < data.length; i += batchSize) {
                  const records = data.slice(i, i + batchSize);
                  records.forEach(item => {
                    tx.executeSql(
                      'INSERT INTO Code (serial_no,category_id,category_desc,language_code,code_value,code_short_desc,code_desc,sort_seq) VALUES (?,?,?,?,?,?,?,?)',
                      [
                        item.serialNo,
                        item.categoryId,
                        item.categoryDesc,
                        item.languageCode,
                        item.codeValue,
                        item.codeShortDesc,
                        item.code_desc,
                        item.sortSeq,
                      ],
                      (tx, results) => {
                        insertedRows += results.rowsAffected;
                        if (insertedRows === data.length) {
                          resolve('success');
                          console.log(
                            'All code info records inserted successfully',
                          );
                        }
                      },
                      error => {
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

export const getCityData = async () => {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Code WHERE category_id = ? ',
        ['CITY_CODE'],
        (tx, results) => {
          if (results.rows.length > 0) {
            const city_data = results.rows.raw();
            resolve(city_data);
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
export const fetchCityName = async city_code => {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Code WHERE code_value = ? ',
        [city_code],
        (tx, results) => {
          console.log('ctuomer result', results);
          if (results.rows.length > 0) {
            resolve(results.rows.raw());
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

export async function filterCity(selectedColumn, searchTerm) {
  let sql;
  if (selectedColumn && searchTerm) {
    sql = `SELECT * FROM Code  WHERE ${selectedColumn} LIKE '%${searchTerm}%' AND category_id = 'CITY_CODE'`;
  } else {
    sql = "SELECT * FROM Code WHERE category_id = 'CITY_CODE'";
  }
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, results) => {
          console.log('city', results.rows.raw());
          resolve(results.rows.raw());
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
}
export async function filterLocation(selectedColumn, searchTerm) {
  let sql;
  if (selectedColumn && searchTerm) {
    sql = `SELECT * FROM Code  WHERE ${selectedColumn} LIKE '%${searchTerm}%' AND category_id = 'LOCATION_CODE'`;
  } else {
    sql = "SELECT * FROM Code WHERE category_id = 'LOCATION_CODE'";
  }
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, results) => {
          console.log('city', results.rows.raw());
          resolve(results.rows.raw());
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
}
export const fetchLocationName = async location_code => {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Code WHERE code_value = ? ',
        [location_code],
        (tx, results) => {
          if (results.rows.length > 0) {
            resolve(results.rows.raw());
          } else {
            reject('LOCATION code error');
          }
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
};
