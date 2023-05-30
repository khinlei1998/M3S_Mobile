import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../common';

export function getCodeInfo() {
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
                console.log('Delete success');
                axios
                    // .get(`https://${newIP}/skylark-m3s/api/employees.m3s`)
                    .get(`https://${ip}:${port}/skylark-m3s/api/codes.m3s`)
                    .then(({ data }) => {
                        console.log('data', data.length);
                        if (data.length > 0) {
                            let insertedRows = 0;
                            global.db.transaction(tx => {
                                for (let i = 0; i < data.length; i += batchSize) {
                                    const records = data.slice(i, i + batchSize);
                                    console.log('records>>>>>>', records.length);
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
                                                item.sortSeq


                                            ],
                                            (tx, results) => {
                                                // If insert query succeeds, resolve the promise
                                                // console.log('Employee Insert success', results.rowsAffected);
                                                console.log('length', data.length);

                                                insertedRows += results.rowsAffected;
                                                console.log('insertedRows>>>>', insertedRows);
                                                if (insertedRows === data.length) {
                                                    resolve('success');
                                                    console.log('All code info records inserted successfully');
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

