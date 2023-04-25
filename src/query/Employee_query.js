import axios from "axios";

const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    global.db.transaction((trans) => {
        trans.executeSql(sql, params, (trans, results) => {
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

        axios.get(`https://cat-fact.herokuapp.com/facts/`, {

        })
            .then(({ data }) => {
                if (data.length > 0) {
                    insertUser()
                }
                // Resolve the promise with the result
                resolve(data);

            })
            .catch(error => console.log("get_Ward_mb error :: ", error));


    });
};

function insertUser() {
    let query = "INSERT OR IGNORE INTO employee_info (serial_no,employee_no,employee_name,employee_local_name,user_id,password,user_kind,employee_type_code,branch_code,dept_name,dept_local_name,team_code,team_name,team_local_name,position_title_code,position_titile_nm,position_title_lclnm,entry_date,resident_rgst_id,tel_no,cell_phone_no,branch_name,local_branch_name,department_code) VALUES('117','M00243','Khaing Su Mon','ခိုင္စုမြန္','M00243','a4ayc/80/OGda4BO/1o/V0etpOqiLx1JwB5S3beHW0s=','400','00001','2001','21400','Sales Operation Division','214T1','MDY Team B','MDY Team B','LOO','Loan Officer','ချေးငွေအရာရှိ','2018-11-15',null,null,null,null,null,null)";

    // let query = "INSERT OR IGNORE INTO users (serial_no,employee_no,employee_name,employee_local_name,user_id,password,user_kind,employee_type_code,branch_code,dept_name,dept_local_name,team_code,team_name,team_local_name,position_title_code,position_titile_nm,position_title_lclnm,entry_date,resident_rgst_id,tel_no,cell_phone_no,branch_name,local_branch_name,department_code) VALUES";

    // for (let i = 0; i < data.length; ++i) {
    //     // console.log('data[i]', data[i]);
    //     query = query + "("
    //         + data.serialNo //id
    //         + ",'"
    //         + data.employeeNo //first_name
    //         + "','"
    //         + data.employeeName //last_name
    //         + "','"
    //         + data.employeeLocalName //is_deleted
    //         + "','"
    //         + data.password
    //         + "','"
    //         + encrypt_pass
    //         + "','"
    //         + data.userKind
    //         + "','"
    //         + data.employeeTypeCode
    //         + "','"
    //         + data.branchCode
    //         + "','"
    //         + data.departmentCode
    //         + "','"
    //         + data.departmentName
    //         + "','"
    //         + data.departmentLocalName
    //         + "','"
    //         + data.teamCode
    //         + "','"
    //         + data.teamName
    //         + "','"
    //         + data.teamLocalName
    //         + "','"
    //         + data.positionTitleCode
    //         + "','"
    //         // + data.remember_token
    //         // + "',"
    //         + data.positionTitleNm
    //         + "','"
    //         + data.positionTitleLclNm
    //         + "','"
    //         + data.entryDate
    //         + "','"
    //         + data.resident_rgst_id
    //         + "','"
    //         + data.tel_no
    //         + "','"
    //         + data.cell_phone_no
    //         + "','"
    //         + data.branch_name
    //         + "','"
    //         + data.local_branch_name
    //         + "','"
    //         + department_codes
    //         + "'"
    //         + ")";
    //     // if (i != data.length - 1) {
    //     //     query = query + ",";
    //     // }
    // }
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
                ['M00243', 'a4ayc/80/OGda4BO/1o/V0etpOqiLx1JwB5S3beHW0s='],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        const user = results.rows.item(0);
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