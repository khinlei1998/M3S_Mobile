import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connection_name} from '../common';

export function getSurvey_Item(tokensource) {
  return new Promise(async (resolve, reject) => {
    let ip = await AsyncStorage.getItem('ip');
    let port = await AsyncStorage.getItem('port');
    const batchSize = 100;
    global.db.transaction(tx => {
      tx.executeSql('DELETE FROM survey_item', [], (tx, results) => {
        axios
          .get(
            `${connection_name}://${ip}:${port}/skylark-m3s/api/surveyItems.m3s`,
            {
              cancelToken: tokensource.token,
            },
          )
          .then((response) => {
            const sizeInBytes = response.headers['content-length'] || '0';
            if (response.data.length > 0) {
              let insertedRows = 0;
              global.db.transaction(tx => {
                for (let i = 0; i < response.data.length; i += batchSize) {
                  const records = response.data.slice(i, i + batchSize);
                  records.forEach(item => {
                    tx.executeSql(
                      'INSERT INTO survey_item (serial_no,survey_group_no,survey_item_no,survey_item_content,survey_item_content_eng,err_msg) VALUES (?,?,?,?,?,?)',
                      [
                        item.serialNo,
                        item.surveyGroupNo,
                        item.surveyItemNo,
                        item.surveyItemContent,
                        item.surveyItemContentEng,
                        null,
                      ],
                      (tx, results) => {
                        insertedRows += results.rowsAffected;
                        if (insertedRows === response.data.length) {
                          // resolve('success');
                          resolve({response:'success',sizeInBytes})
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
              // alert(error);
              reject(error);
            }
          });
      });
    });
  });
}
export async function getSurveyData() {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM survey_item',
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
export async function getSurveyResult() {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM survey_result',
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

export async function fetchAllSurvey() {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM survey_item`,
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
export const storeSurveyResult = async data => {
  const user_id = await AsyncStorage.getItem('user_id');

  return new Promise(async (resolve, reject) => {
    try {
      global.db.transaction(trans => {
        for (let i = 0; i < data.length; i++) {
          trans.executeSql(
            `INSERT INTO survey_result (serial_no,survey_result_no,survey_group_no,survey_item_no,create_datetime,create_user_id,delete_datetime,delete_user_id,branch_code,transaction_date,survey_answer_yn,err_msg
) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
              null, //serialNo
              data[i].survey_result_no,
              data[i].survey_group_no,
              data[i].survey_item_no,
              data[i].create_datetime,
              user_id,
              moment().format('YYYY-MM-DD'),
              data[i].delete_user_id,
              data[i].branch_code, //login user branch code
              moment().format('YYYY-MM-DD'),
              data[i].survey_answer_yn,
              data[i].err_msg,
            ],
            (trans, results) => {
              resolve('success');
            },
            error => {
              reject(error);
            },
          );
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export async function UploadSurveyData(all_survey) {
  const failedData = [];
  let ip = await AsyncStorage.getItem('ip');
  let port = await AsyncStorage.getItem('port');
  let user_id = await AsyncStorage.getItem('user_id');

  try {
    for (var i = 0; i < all_survey.length; i++) {
      const data = [all_survey[i]];

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${connection_name}://${ip}:${port}/skylark-m3s/api/surveyResult.m3s`,
        data: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json', // Set the content type as JSON
          'cache-control': 'no-cache',
        },
      };
      const response = await axios.request(config);
      if (response.data[0].errMsg) {
        const error = {
          message: response.data[0].errMsg,
        };
        failedData.push(error);
      } else {
        await new Promise((resolve, reject) => {
          global.db.transaction(tx => {
            tx.executeSql(
              `DELETE  FROM survey_result WHERE survey_result_no = ?  `,
              [all_survey[i].survey_result_no],
              (txObj, resultSet) => {
                resolve();
              },
              (txObj, error) => {
                reject(error);
              },
            );
          });
        });
      }
    }

    if (failedData.length > 0) {
      return failedData;
    } else {
      return 'success';
    }
  } catch (error) {
    return error;
  }
}
