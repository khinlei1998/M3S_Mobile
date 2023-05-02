export async function getAllCustomer() {
    return new Promise((resolve, reject) => {
        global.db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Customer ',
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

export function getCustomer_info() {
    return new Promise(async (resolve, reject) => {
      let ip = await AsyncStorage.getItem('ip');
      let port = await AsyncStorage.getItem('port');
      axios
        // .get(`https://${ip}`, {})
        .get(`https://8c98-103-231-92-159.ngrok-free.app/skylark-m3s/api/customers.m3s`)
        .then(({ data }) => {
          console.log('data length', data.length);
          if (data.length > 0) {
            global.db.transaction(txn => {
              data.forEach(item => {
                txn.executeSql(
                  `INSERT INTO Customer (serial_no,employee_no,employee_name,employee_local_name,user_id,password,user_kind,resident_rgst_id,entry_date,tel_no,cell_phone_no,employee_type_code,branch_code,branch_name,local_branch_name,department_code,department_name,department_local_name,team_code,team_name,team_local_name,position_title_code,position_title_nm,position_title_lcl_nm,err_msg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
                    console.log('Employee Insert success', results);
                    resolve('success');
                  },
                  (tx, error) => {
                    console.log('query error', error);
                    reject(error);
                  },
                );
              })
            });
          }
        })
        .catch(error => reject(error));
    });
  }
