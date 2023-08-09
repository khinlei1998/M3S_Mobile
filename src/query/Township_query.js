import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
export function get_Township() {
  return new Promise(async (resolve, reject) => {
    let ip = await AsyncStorage.getItem('ip');
    let port = await AsyncStorage.getItem('port');
    const batchSize = 100;
    global.db.transaction(tx => {
      tx.executeSql('DELETE FROM Township', [], (tx, results) => {
        axios
          .get(`https://${ip}:${port}/skylark-m3s/api/townships.m3s`)
          .then(({ data }) => {
            if (data.length > 0) {
              let insertedRows = 0;
              global.db.transaction(tx => {
                for (let i = 0; i < data.length; i += batchSize) {
                  const records = data.slice(i, i + batchSize);
                  records.forEach(item => {
                    tx.executeSql(
                      'INSERT INTO Township (ts_code,ts_name,city_code,city_name) VALUES (?,?,?,?)',
                      [
                        item.townshipCode,
                        item.townshipName,
                        item.cityCode,
                        item.cityName,
                      ],
                      (tx, results) => {
                        insertedRows += results.rowsAffected;
                        if (insertedRows === data.length) {
                          resolve('success');
                          console.log(
                            'All Township records inserted successfully',
                          );
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

export async function filterTownship(selectedColumn, searchTerm, city_code) {
  let sql;
  if (selectedColumn && searchTerm) {
    sql = `SELECT * FROM Township  WHERE ${selectedColumn} LIKE '%${searchTerm}%' AND city_code = '${city_code}'`;
  } else {
    sql = `SELECT * FROM Township WHERE city_code = '${city_code}'`

  }
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, results) => {
          console.log('tsp', results.rows.raw());
          resolve(results.rows.raw());
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
}

