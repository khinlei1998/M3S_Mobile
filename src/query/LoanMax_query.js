import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../common';
import {connection_name} from '../common';
export function getLoanMax(tokensource) {
  return new Promise(async (resolve, reject) => {
    let ip = await AsyncStorage.getItem('ip');
    let port = await AsyncStorage.getItem('port');
    const batchSize = 100;
    global.db.transaction(tx => {
      tx.executeSql('DELETE FROM Application_limit', [], (tx, results) => {
        console.log('Delete success');
        axios
          .get(
            `${connection_name}://${ip}:${port}/skylark-m3s/api/maxInfo.m3s`,
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
                      'INSERT INTO Application_limit (serial_no,organization_code,create_datetime,create_user_id,delete_datetime,delete_user_id,update_datetime,update_user_id,status_code,product_type,loan_type,loan_cycle,calculate_type,start_month_num,end_month_num,loan_limit_amount,loan_limit_rate,err_msg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                      [
                        item.serialNo,
                        item.organizationCode,
                        null,
                        item.createUserId,
                        null,
                        item.deleteUserId,
                        null,
                        item.updateUserId,
                        item.statusCode,
                        item.productType,
                        item.loanType,
                        item.loanCycle,
                        item.calculateType,
                        item.startMonthNum,
                        item.endMonthNum,
                        item.loanLimitAmount,
                        item.loanLimitRate,
                        null,
                      ],
                      (tx, results) => {
                        insertedRows += results.rowsAffected;
                        if (insertedRows === data.length) {
                          resolve('success');
                          console.log(
                            'All loan max records inserted successfully',
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

export async function getAllLoanMax() {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Application_limit `,
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
