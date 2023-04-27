import axios from "axios";

const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    global.db.transaction((trans) => {
        trans.executeSql(sql, params, (trans, results) => {
            console.log('emp result',results);
            resolve(results);
        },
            (error) => {
                reject(error);
                console.log('error', error);
            });
    });
});

export function getEemployee_info() {
    return new Promise((resolve, reject) => {

        // axios.get(`https://cat-fact.herokuapp.com/facts/`, {
            axios.get(`https://802f-103-231-92-46.ngrok-free.app:443/skylark-m3s/api/employees.m3s`, {

        })
            .then(({ data }) => {
                console.log('emp data',data.length);
                if (data.length > 0) {
                     insertUser(data)
                }
                // Resolve the promise with the result
                resolve(data);

            })
            .catch(error => console.log("Employee error:: ", error));


    });
};

function insertUser(data) {
    // let query = "INSERT OR IGNORE INTO employee_info (serial_no,employee_no,employee_name,employee_local_name,user_id,password,user_kind,employee_type_code,branch_code,dept_name,dept_local_name,team_code,team_name,team_local_name,position_title_code,position_titile_nm,position_title_lclnm,entry_date,resident_rgst_id,tel_no,cell_phone_no,branch_name,local_branch_name,department_code) VALUES('117','M00243','Khaing Su Mon','ခိုင္စုမြန္','M00243','a4ayc/80/OGda4BO/1o/V0etpOqiLx1JwB5S3beHW0s=','400','00001','2001','21400','Sales Operation Division','214T1','MDY Team B','MDY Team B','LOO','Loan Officer','ချေးငွေအရာရှိ','2018-11-15',null,null,null,null,null,null)";

    let query = "INSERT OR IGNORE INTO employee_info (serial_no,employee_no,employee_name,employee_local_name,user_id,password,user_kind,employee_type_code,branch_code,dept_code,dept_name,dept_local_name,team_code,team_name,team_local_name,position_title_code,position_titile_nm,position_title_lclnm,entry_date,resident_rgst_id,tel_no,cell_phone_no,branch_name,local_branch_name,department_code) VALUES";

    for (let i = 0; i < data.length; ++i) {
        //  console.log('data[i]', data[i]);
        query = query + "("
            + data[i].serialNo //id
            + ",'"
            + data[i].employeeNo //first_name
            + "','"
            + data[i].employeeName //last_name
            + "','"
            + data[i].employeeLocalName //is_deleted
            + "','"
            + data[i].userId //is_deleted
            + "','"
            + data[i].password
            + "','"
            // + encrypt_pass
            // + "','"
            + data[i].userKind
            + "','"
            + data[i].employeeTypeCode
            + "','"
            + data[i].branchCode
            + "','"
            + data[i].departmentCode
            + "','"
            + data[i].departmentName
            + "','"
            + data[i].departmentLocalName
            + "','"
            + data[i].teamCode
            + "','"
            + data[i].teamName
            + "','"
            + data[i].teamLocalName
            + "','"
            + data[i].positionTitleCode
            + "','"
            // + data[i].remember_token
            // + "',"
            + data[i].positionTitleNm
            + "','"
            + data[i].positionTitleLclNm
            + "','"
            + data[i].entryDate
            + "','"
            + null
            + "','"
            + null
            + "','"
            + null
            + "','"
            + null
            + "','"
            + null
            + "','"
            +null
            + "'"
            + ")";
        if (i != data.length - 1) {
            query = query + ",";
        }
    }
    ExecuteQuery(query, []);
    // this.SelectQuery()


}

// export async function selectUser() {
//     let selectQuery = await ExecuteQuery('SELECT * FROM employee_info WHERE user_id = ? AND password = ?', ['M00243', 'a4ayc/80/OGda4BO/1o/V0etpOqiLx1JwB5S3beHW0s=']);
//     var rows = selectQuery.rows;
//     console.log('rows', rows);
// }

export const selectUser = async(email, password) => {
    // let selectQuery = await ExecuteQuery('SELECT * FROM employee_info WHERE user_id = ? AND password = ?', ['M00243', 'a4ayc/80/OGda4BO/1o/V0etpOqiLx1JwB5S3beHW0s=']);
    // console.log('selectQuery',selectQuery);
    // selectQuery {"insertId": undefined, "rows": {"item": [Function item], "length": 1, "raw": [Function raw]}, "rowsAffected": 0}
    return new Promise((resolve, reject) => {
        global.db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM employee_info WHERE user_id = ? AND password = ?',
                ['M00247', 'a4ayc/80/OGda4BO/1o/V0etpOqiLx1JwB5S3beHW0s='],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        const user = results.rows.item(0);
                        console.log('user',user);
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