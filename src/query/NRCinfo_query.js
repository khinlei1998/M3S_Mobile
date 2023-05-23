import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../common';

export const getNRC_info = () => {
  return new Promise(async (resolve, reject) => {
    let ip = await AsyncStorage.getItem('ip');
    let port = await AsyncStorage.getItem('port');

    global.db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM Nrc_prefix',
        [],
        (tx, results) => {
          axios
            // .get(`https://${ip}`, {})
            .get(`https://${ip}:${port}/skylark-m3s/api/nrcCodeInfo.m3s`)
            .then(({data}) => {
              console.log('nrc data length', data.length);
              if (data.length > 0) {
                global.db.transaction(tx => {
                  data.forEach(item => {
                    tx.executeSql(
                      'INSERT INTO Nrc_prefix (serial_no,create_datetime,create_user_id,update_datetime,update_user_id,status_code,state_code,state_name,township_name,nrc_prefix_code,err_msg) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
                      [
                        item.serialNo,
                        null,
                        item.createUserId,
                        null,
                        item.updateUserId,
                        item.statusCode,
                        item.stateCode,
                        item.stateName,
                        item.townshipName,
                        item.nrcPrefixCode,
                        null,
                      ],
                      (tx, results) => {
                        // If insert query succeeds, resolve the promise
                        console.log('NRC INFO Insert success', results);
                        resolve('success');
                      },
                      error => {
                        // If insert query fails, rollback the transaction and reject the promise
                        tx.executeSql('ROLLBACK', [], () => {
                          reject(error);
                        });
                      },
                    );
                  });
                });
              }
            })
            .catch(error => {
              console.log('error', error);
              reject(error);
            });
        },
        error => {
          // If delete query fails, rollback the transaction and reject the promise
          tx.executeSql('ROLLBACK', [], () => {
            reject(error);
          });
        },
      );
    });
  });
};

export const fetchNRCinfo = async () => {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Nrc_prefix ',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            const collection = {};

            for (let i = 0; i < results.rows.length; i++) {
              const obj = results.rows.item(i);
              const key = obj.state_code + obj.state_name;

              if (!collection[key]) {
                collection[key] = [];
              }

              collection[key].push(obj.nrc_prefix_code);
            }

            const nrc_state_code = Object.entries(collection).map(([name]) => ({
              ['id']: name,
              ['label']: name,
              ['value']: name,
            }));


            const nrc_prefixdata = Object.entries(collection).reduce(
              (result, [id, values]) => {
                const transformedValues = values.map(value => ({
                  id,
                  label: value,
                  value,
                }));

                return result.concat(transformedValues);
              },
              [],
            );

            resolve([nrc_state_code,nrc_prefixdata]);
          } else {
            reject('No Data');
          }
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
};
