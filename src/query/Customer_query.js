import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../common';
import moment from 'moment';
import {fetchEmpName} from './Employee_query';

const ExecuteQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    global.db.transaction(trans => {
      trans.executeSql(
        sql,
        params,
        (trans, results) => {
          resolve(results);
          console.log('success', results);
        },
        error => {
          reject(error);
          console.log('error', error);
        },
      );
    });
  });
export async function getAllCustomer() {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Customer  WHERE ${selectedColumn} LIKE '%${searchTerm}%'`,
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

export async function filterCustomer(selectedColumn, searchTerm) {
  let sql;
  if (selectedColumn && searchTerm) {
    sql = `SELECT * FROM Customer  WHERE ${selectedColumn} LIKE '%${searchTerm}%'`;
  } else {
    sql = 'SELECT * FROM Customer';
  }
  //20201116057
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        // `SELECT * FROM Customer WHERE ${selectedColumn} = ?`,
        // [searchTerm],
        sql,
        [],
        (tx, results) => {
          console.log('result query', results);
          resolve(results.rows.raw());
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
}

// export function getCustomer_info() {
//   return new Promise(async (resolve, reject) => {
//     let ip = await AsyncStorage.getItem('ip');
//     let port = await AsyncStorage.getItem('port');
//     const batchSize = 100;
//     global.db.transaction(tx => {
//       tx.executeSql('DELETE FROM Customer', [], (tx, results) => {
//         axios
//           // .get(`https://${ip}`, {})
//           .get(`${BASE_URL}api/customers.m3s`)
//           .then(({data}) => {
//             if (data.length > 0) {
//               global.db.transaction(txn => {
//                 for (let i = 0; i < data.length; i += batchSize) {
//                   const records = data.slice(i, i + batchSize);
//                   records.forEach(item => {
//                     //88 columns
//                     txn.executeSql(
//                       `INSERT INTO Customer (serial_no,customer_no,customer_nm,status_code,create_datetime,create_user_id,delete_datetime,delete_user_id,update_datetime,update_user_id,resident_rgst_id,employee_no,branch_code,entry_date,position_title_nm,salary_rating_code,gender,birth_date,marital_status,saving_acct_num,tel_no,mobile_tel_no,addr,curr_resident_perd,occupation,father_name,family_num,hghschl_num,university_num,house_ocpn_type,remark,business_own_type,prop_apartment_yn,prop_house_yn,prop_car_yn,prop_motorcycle_yn,prop_machines_yn,prop_farmland_yn,prop_other_yn,tot_prop_estmtd_val,ohtr_own_property,otr_prop_estmtd_val,workplace_name,workplace_type,workplace_period,employee_num,workplace_addr,curr_workplace_perd,business_sttn_flg,land_scale,land_own_type,otr_income,tot_sale_income,tot_sale_expense,rawmaterial_expans,wrkp_rent_expns,employee_expns,prmn_empl_expns,tmpy_empl_expns,trnsrt_expns,bus_utlbil_expns,tel_expns,tax_expns,goods_loss_expns,othr_expns_1,othr_expns_2,tot_bus_net_income,fmly_tot_income,fmly_tot_expense,food_expns,house_mngt_expns,utlbil_expns,edct_expns,healthy_expns,fmly_tax_expns,fmly_trnsrt_expns,finance_expns,fmly_otr_expns,fmly_tot_net_income,tablet_sync_sts,sync_sts,nrc_state_code,nrc_prefix_code,nrc_no,curr_resident_date,workplace_date,curr_workplace_date,err_msg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
//                       [
//                         item.serialNo,
//                         item.customerNo,
//                         item.customerNm,
//                         item.statusCode,
//                         item.createDatetime,
//                         item.createUserId,
//                         item.deleteDatetime,
//                         item.deleteUserId,
//                         item.updateDatetime,
//                         item.updateUserId,
//                         item.residentRgstId,
//                         item.employeeNo,
//                         item.branchCode,
//                         item.entryDate,
//                         item.positionTitleNm,
//                         item.salaryRatingCode,
//                         item.gender,
//                         item.birthDate,
//                         item.maritalStatus,
//                         item.savingAcctNum,
//                         item.telNo,
//                         item.mobileTelNo,
//                         item.addr, //23
//                         item.currResidentPerd,
//                         item.occupation,
//                         null,
//                         item.familyNum,
//                         item.hghschlNum,
//                         item.universityNum,
//                         item.houseOcpnType,
//                         item.remark,
//                         item.businessOwnType,
//                         item.propApartmentYn,
//                         item.propHouseYn,
//                         item.propCarYn,
//                         item.propMotorcycleYn,
//                         item.propMachinesYn,
//                         item.propFarmlandYn,
//                         item.propOtherYn,
//                         item.totPropEstmtdVal,
//                         item.ohtrOwnProperty,
//                         item.otrPropEstmtdVal, //43
//                         item.workplaceName,
//                         item.workplaceType,
//                         item.workplacePeriod,
//                         item.employeeNum,
//                         item.workplaceAddr,
//                         item.currWorkplacePerd,
//                         item.businessSttnFlg,
//                         item.landScale,
//                         item.landOwnType,
//                         item.otrIncome,
//                         item.totSaleIncome,
//                         item.totSaleExpense,
//                         item.rawmaterialExpans,
//                         item.wrkpRentExpns,
//                         item.employeeExpns,
//                         item.prmnEmplExpns, //59
//                         item.tmpyEmplExpns,
//                         item.trnsrtExpns,
//                         item.busUtlbilExpns,
//                         item.telExpnsitem,
//                         item.taxExpnsitem,
//                         item.goodsLossExpnsitem,
//                         item.othrExpns1item,
//                         item.othrExpns2item,
//                         item.totBusNetIncomeitem,
//                         item.fmlyTotIncomeitem,
//                         item.fmlyTotExpenseitem,
//                         item.foodExpnsitem, //71
//                         item.houseMngtExpnsitem,
//                         item.utlbilExpns,
//                         item.edctExpnsitem,
//                         item.healthyExpnsitem,
//                         item.fmlyTaxExpnsitem,
//                         item.fmlyTrnsrtExpnsitem,
//                         item.financeExpnsitem,
//                         item.fmlyOtrExpnsitem,
//                         item.fmlyTotNetIncomeitem,
//                         item.tabletSyncStsitem, //81
//                         item.syncStsitem,
//                         item.nrcStateCode,
//                         item.nrcPrefixCode,
//                         item.nrcNo,
//                         null,
//                         item.workplaceDate,
//                         null,
//                         null,
//                       ],

//                       (tx, results) => {
//                         resolve('success');
//                       },
//                       error => {
//                         alert('Customer Insert Error', error);
//                         reject(error);
//                       },
//                     );
//                   });
//                 }
//               });
//             }
//           })
//           .catch(error => reject(error));
//       });
//     });
//   });
// }

export function getCustomer_info() {
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

    // global.db.transaction(tx => {
    //   tx.executeSql('DELETE FROM Customer', [], (tx, results) => {
    //     console.log('Delete success');
    //     axios
    //       // .get(`https://${newIP}/skylark-m3s/api/employees.m3s`)
    //       .get(`https://${ip}:${port}/skylark-m3s/api/customers.m3s`)
    //       .then(({ data }) => {
    //         console.log('data', data.length);
    //         if (data.length > 0) {
    //           let insertedRows = 0;
    //           global.db.transaction(tx => {
    //             for (let i = 0; i < data.length; i += batchSize) {
    //               const records = data.slice(i, i + batchSize);
    //               console.log('records>>>>>>', records.length);
    //               records.forEach(item => {
    //                 tx.executeSql(
    //                   `INSERT INTO Customer (serial_no,customer_no,customer_nm,status_code,create_datetime,create_user_id,delete_datetime,delete_user_id,update_datetime,update_user_id,resident_rgst_id,employee_no,branch_code,entry_date,position_title_nm,salary_rating_code,gender,birth_date,marital_status,saving_acct_num,tel_no,mobile_tel_no,addr,curr_resident_perd,occupation,father_name,family_num,hghschl_num,university_num,house_ocpn_type,remark,business_own_type,prop_apartment_yn,prop_house_yn,prop_car_yn,prop_motorcycle_yn,prop_machines_yn,prop_farmland_yn,prop_other_yn,tot_prop_estmtd_val,ohtr_own_property,otr_prop_estmtd_val,workplace_name,workplace_type,workplace_period,employee_num,workplace_addr,curr_workplace_perd,business_sttn_flg,land_scale,land_own_type,otr_income,tot_sale_income,tot_sale_expense,rawmaterial_expans,wrkp_rent_expns,employee_expns,prmn_empl_expns,tmpy_empl_expns,trnsrt_expns,bus_utlbil_expns,tel_expns,tax_expns,goods_loss_expns,othr_expns_1,othr_expns_2,tot_bus_net_income,fmly_tot_income,fmly_tot_expense,food_expns,house_mngt_expns,utlbil_expns,edct_expns,healthy_expns,fmly_tax_expns,fmly_trnsrt_expns,finance_expns,fmly_otr_expns,fmly_tot_net_income,tablet_sync_sts,sync_sts,nrc_state_code,nrc_prefix_code,nrc_no,curr_resident_date,workplace_date,curr_workplace_date,err_msg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    //                   [
    //                     item.serialNo,
    //                     item.customerNo,
    //                     item.customerNm,
    //                     item.statusCode,
    //                     item.createDatetime,
    //                     item.createUserId,
    //                     item.deleteDatetime,
    //                     item.deleteUserId,
    //                     item.updateDatetime,
    //                     item.updateUserId,
    //                     item.residentRgstId,
    //                     item.employeeNo,
    //                     item.branchCode,
    //                     item.entryDate,
    //                     item.positionTitleNm,
    //                     item.salaryRatingCode,
    //                     item.gender,
    //                     item.birthDate,
    //                     item.maritalStatus,
    //                     item.savingAcctNum,
    //                     item.telNo,
    //                     item.mobileTelNo,
    //                     item.addr, //23
    //                     item.currResidentPerd,
    //                     item.occupation,
    //                     null,
    //                     item.familyNum,
    //                     item.hghschlNum,
    //                     item.universityNum,
    //                     item.houseOcpnType,
    //                     item.remark,
    //                     item.businessOwnType,
    //                     item.propApartmentYn,
    //                     item.propHouseYn,
    //                     item.propCarYn,
    //                     item.propMotorcycleYn,
    //                     item.propMachinesYn,
    //                     item.propFarmlandYn,
    //                     item.propOtherYn,
    //                     item.totPropEstmtdVal,
    //                     item.ohtrOwnProperty,
    //                     item.otrPropEstmtdVal, //43
    //                     item.workplaceName,
    //                     item.workplaceType,
    //                     item.workplacePeriod,
    //                     item.employeeNum,
    //                     item.workplaceAddr,
    //                     item.currWorkplacePerd,
    //                     item.businessSttnFlg,
    //                     item.landScale,
    //                     item.landOwnType,
    //                     item.otrIncome,
    //                     item.totSaleIncome,
    //                     item.totSaleExpense,
    //                     item.rawmaterialExpans,
    //                     item.wrkpRentExpns,
    //                     item.employeeExpns,
    //                     item.prmnEmplExpns, //59
    //                     item.tmpyEmplExpns,
    //                     item.trnsrtExpns,
    //                     item.busUtlbilExpns,
    //                     item.telExpnsitem,
    //                     item.taxExpnsitem,
    //                     item.goodsLossExpnsitem,
    //                     item.othrExpns1item,
    //                     item.othrExpns2item,
    //                     item.totBusNetIncomeitem,
    //                     item.fmlyTotIncomeitem,
    //                     item.fmlyTotExpenseitem,
    //                     item.foodExpnsitem, //71
    //                     item.houseMngtExpnsitem,
    //                     item.utlbilExpns,
    //                     item.edctExpnsitem,
    //                     item.healthyExpnsitem,
    //                     item.fmlyTaxExpnsitem,
    //                     item.fmlyTrnsrtExpnsitem,
    //                     item.financeExpnsitem,
    //                     item.fmlyOtrExpnsitem,
    //                     item.fmlyTotNetIncomeitem,
    //                     item.tabletSyncStsitem, //81
    //                     item.syncStsitem,
    //                     item.nrcStateCode,
    //                     item.nrcPrefixCode,
    //                     item.nrcNo,
    //                     null,
    //                     item.workplaceDate,
    //                     null,
    //                     null,
    //                   ],
    //                   (tx, results) => {
    //                     // If insert query succeeds, resolve the promise
    //                     console.log('Customer Insert success', results.rowsAffected);
    //                     console.log('length', data.length);

    //                     insertedRows += results.rowsAffected;
    //                     console.log('insertedRows>>>>', insertedRows);
    //                     if (insertedRows === data.length) {
    //                       resolve('success');
    //                       console.log('All records inserted successfully');
    //                     }
    //                   },
    //                   error => {
    //                     console.log('query error', error);
    //                     // If insert query fails, rollback the transaction and reject the promise
    //                     tx.executeSql('ROLLBACK', [], () => {
    //                       reject(error);
    //                     });
    //                   },
    //                 );
    //               });
    //             }
    //           });

    //         }
    //       })
    //       .catch(error => {
    //         alert(error);
    //         reject(error);
    //       });
    //   });
    // });
    const testdat = [
      {
        serialNo: 1,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '1',
        password:
          'NkI4NkIyNzNGRjM0RkNFMTlENkI4MDRFRkY1QTNGNTc0N0FEQTRFQUEyMkYxRDQ5QzAxRTUyRERCNzg3NUI0Qg==',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
      {
        serialNo: 2,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '4',
        password: '323',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
      {
        serialNo: 3,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '4',
        password: '323',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
      {
        serialNo: 4,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '4',
        password: '323',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
      {
        serialNo: 5,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '4',
        password: '323',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
      {
        serialNo: 6,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '4',
        password: '323',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
      {
        serialNo: 7,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '4',
        password: '323',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
      {
        serialNo: 8,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '4',
        password: '323',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
      {
        serialNo: 9,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '4',
        password: '323',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
      {
        serialNo: 10,
        employeeNo: 2,
        employeeName: 'mgmg',
        employeeLocalName: 'd',
        userId: '4',
        password: '323',
        userKind: 'dsd',
        resident_rgst_id: 'sa',
        entryDate: '434',
        tel_no: '44',
        cell_phone_no: '43',
        employeeTypeCode: '434',
        branchCode: '32',
        branch_name: '323',
        local_branch_name: '434',
        departmentCode: '888',
        departmentName: '443',
        departmentLocalName: '43',
        teamCode: '434',
        teamName: 'wew',
        teamLocalName: '434',
        positionTitleCode: '43',
        positionTitleNm: 'rer',
        positionTitleLclNm: 'aew',
        err_msg: 'fdf',
      },
    ];
    global.db.transaction(tx => {
      tx.executeSql('DELETE FROM Customer', [], (tx, results) => {
        axios
          .get(
            // `https://sample-rest.onrender.com:443/skylark-m3s/api/customers.m3s`
            `https://${ip}:${port}/skylark-m3s/api/customers.m3s`,
            // { responseType: 'json' }
          )
          .then(({data}) => {
            if (data.length > 0) {
              let insertedRows = 0;
              global.db.transaction(tx => {
                for (let i = 0; i < data.length; i += batchSize) {
                  const records = data.slice(i, i + batchSize);

                  records.forEach(item => {
                    tx.executeSql(
                      `INSERT INTO Customer (serial_no,customer_no,customer_nm,status_code,create_datetime,create_user_id,delete_datetime,delete_user_id,update_datetime,update_user_id,resident_rgst_id,employee_no,branch_code,entry_date,position_title_nm,salary_rating_code,gender,birth_date,marital_status,saving_acct_num,tel_no,mobile_tel_no,addr,curr_resident_perd,occupation,father_name,family_num,hghschl_num,university_num,house_ocpn_type,remark,business_own_type,prop_apartment_yn,prop_house_yn,prop_car_yn,prop_motorcycle_yn,prop_machines_yn,prop_farmland_yn,prop_other_yn,tot_prop_estmtd_val,ohtr_own_property,otr_prop_estmtd_val,workplace_name,workplace_type,workplace_period,employee_num,workplace_addr,curr_workplace_perd,business_sttn_flg,land_scale,land_own_type,otr_income,tot_sale_income,tot_sale_expense,rawmaterial_expans,wrkp_rent_expns,employee_expns,prmn_empl_expns,tmpy_empl_expns,trnsrt_expns,bus_utlbil_expns,tel_expns,tax_expns,goods_loss_expns,othr_expns_1,othr_expns_2,tot_bus_net_income,fmly_tot_income,fmly_tot_expense,food_expns,house_mngt_expns,utlbil_expns,edct_expns,healthy_expns,fmly_tax_expns,fmly_trnsrt_expns,finance_expns,fmly_otr_expns,fmly_tot_net_income,tablet_sync_sts,sync_sts,nrc_state_code,nrc_prefix_code,nrc_no,curr_resident_date,workplace_date,curr_workplace_date,err_msg,postal_code,total_net,city_code,city_name,township_code,township_name,village_code,village_name,ward_code,ward_name,address_type) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                      [
                        item.serialNo,
                        item.customerNo,
                        item.customerNm,
                        item.statusCode,
                        item.createDatetime,
                        item.createUserId,
                        item.deleteDatetime,
                        item.deleteUserId,
                        item.updateDatetime,
                        item.updateUserId,
                        item.residentRgstId,
                        item.employeeNo,
                        item.branchCode,
                        item.entryDate,
                        item.positionTitleNm,
                        item.salaryRatingCode,
                        item.gender,
                        item.birthDate,
                        item.maritalStatus,
                        item.savingAcctNum,
                        item.telNo,
                        item.mobileTelNo,
                        item.addr, //23
                        item.currResidentPerd,
                        item.occupation,
                        null,
                        item.familyNum,
                        item.hghschlNum,
                        item.universityNum,
                        item.houseOcpnType,
                        item.remark,
                        item.businessOwnType,
                        item.propApartmentYn,
                        item.propHouseYn,
                        item.propCarYn,
                        item.propMotorcycleYn,
                        item.propMachinesYn,
                        item.propFarmlandYn,
                        item.propOtherYn,
                        item.totPropEstmtdVal,
                        item.ohtrOwnProperty,
                        item.otrPropEstmtdVal, //43
                        item.workplaceName,
                        item.workplaceType,
                        item.workplacePeriod,
                        item.employeeNum,
                        item.workplaceAddr,
                        item.currWorkplacePerd,
                        item.businessSttnFlg,
                        item.landScale,
                        item.landOwnType,
                        item.otrIncome,
                        item.totSaleIncome,
                        item.totSaleExpense,
                        item.rawmaterialExpans,
                        item.wrkpRentExpns,
                        item.employeeExpns,
                        item.prmnEmplExpns, //59
                        item.tmpyEmplExpns,
                        item.trnsrtExpns,
                        item.busUtlbilExpns,
                        item.telExpnsitem,
                        item.taxExpnsitem,
                        item.goodsLossExpnsitem,
                        item.othrExpns1item,
                        item.othrExpns2item,
                        item.totBusNetIncomeitem,
                        item.fmlyTotIncomeitem,
                        item.fmlyTotExpenseitem,
                        item.foodExpnsitem, //71
                        item.houseMngtExpnsitem,
                        item.utlbilExpns,
                        item.edctExpnsitem,
                        item.healthyExpnsitem,
                        item.fmlyTaxExpnsitem,
                        item.fmlyTrnsrtExpnsitem,
                        item.financeExpnsitem,
                        item.fmlyOtrExpnsitem,
                        item.fmlyTotNetIncomeitem,
                        item.tabletSyncStsitem, //81
                        item.syncStsitem,
                        item.nrcStateCode,
                        item.nrcPrefixCode,
                        item.nrcNo,
                        null,
                        item.workplaceDate,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null, //address type
                      ],
                      (tx, results) => {
                        // If insert query succeeds, resolve the promise
                        insertedRows += results.rowsAffected;
                        if (insertedRows === data.length) {
                          resolve('success');

                          console.log(
                            'All Customer records inserted successfully',
                          );
                        }
                      },
                      error => {
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
          });
      });
    });
  });
}

export function storeCustomerData(cus_data) {
  return new Promise(async (resolve, reject) => {
    global.db.transaction(trans => {
      trans.executeSql(
        `INSERT INTO Customer (serial_no,customer_no,customer_nm,status_code,create_datetime,create_user_id,delete_datetime,delete_user_id,update_datetime,update_user_id,resident_rgst_id,employee_no,branch_code,entry_date,position_title_nm,salary_rating_code,gender,birth_date,marital_status,saving_acct_num,tel_no,mobile_tel_no,addr,curr_resident_perd,occupation,father_name,family_num,hghschl_num,university_num,house_ocpn_type,remark,business_own_type,prop_apartment_yn,prop_house_yn,prop_car_yn,prop_motorcycle_yn,prop_machines_yn,prop_farmland_yn,prop_other_yn,tot_prop_estmtd_val,ohtr_own_property,otr_prop_estmtd_val,workplace_name,workplace_type,workplace_period,employee_num,workplace_addr,curr_workplace_perd,business_sttn_flg,land_scale,land_own_type,otr_income,tot_sale_income,tot_sale_expense,rawmaterial_expans,wrkp_rent_expns,employee_expns,prmn_empl_expns,tmpy_empl_expns,trnsrt_expns,bus_utlbil_expns,tel_expns,tax_expns,goods_loss_expns,othr_expns_1,othr_expns_2,tot_bus_net_income,fmly_tot_income,fmly_tot_expense,food_expns,house_mngt_expns,utlbil_expns,edct_expns,healthy_expns,fmly_tax_expns,fmly_trnsrt_expns,finance_expns,fmly_otr_expns,fmly_tot_net_income,tablet_sync_sts,sync_sts,nrc_state_code,nrc_prefix_code,nrc_no,curr_resident_date,workplace_date,curr_workplace_date,err_msg,postal_code,total_net,city_code,city_name,township_code,township_name,village_code,village_name,ward_code,ward_name,address_type) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          28, //cus_data.serialNo
          // cus_data.employeeNo,
          cus_data.CustomerNo,
          cus_data.employeeName, //customerNM
          '02', //statusCode
          '2020-09-09', //create Date Time
          cus_data.createUserId,
          null, //deleteDatetime
          null, //deleteUserId
          null, //updateDatetime
          cus_data.createUserId, //updateUserID
          cus_data.residentRgstId,
          //
          cus_data.employeeNo,
          cus_data.branchCode,
          cus_data.entryDate,
          cus_data.positionTitleNm,
          cus_data.salaryRatingCode,
          // Customer Base
          cus_data.gender,
          cus_data.birthDate,
          cus_data.maritalStatus,
          cus_data.savingAcctNum,
          cus_data.telNo,
          cus_data.mobileTelNo,
          cus_data.addr, //23
          cus_data.currResidentPerd,
          // 4,
          cus_data.occupation,
          null, //father name
          cus_data.familyNum,
          cus_data.hghschlNum,
          cus_data.universityNum,
          cus_data.houseOcpnType,
          cus_data.remark, //Monthly Income remark
          cus_data.businessOwnType,
          //Property Info
          cus_data.propApartmentYn,
          cus_data.propHouseYn,
          cus_data.propCarYn,
          cus_data.propMotorcycleYn,
          cus_data.propMachinesYn,
          cus_data.propFarmlandYn,
          cus_data.propOtherYn,
          cus_data.totPropEstmtdVal,
          cus_data.ohtrOwnProperty,
          cus_data.otrPropEstmtdVal, //43
          //Business
          cus_data.workplaceName,
          cus_data.wokplaceType, //workplaceType
          cus_data.workplacePeriod,
          cus_data.employeeNum, //employeeNum
          cus_data.workplaceAddr,
          cus_data.currWorkplacePerd,
          cus_data.businessSttnFlg,
          cus_data.landScale,
          cus_data.landOwnType,
          //Monthly Income
          null, //otrIncome
          cus_data.totSaleIncome,
          cus_data.totSaleExpense,
          cus_data.rawmaterialExpans,
          cus_data.wrkpRentExpns,
          cus_data.employeeExpns,
          null, //59 //prmnEmplExpns
          null, //tmpyEmplExpns
          cus_data.trnsrtExpns,
          cus_data.busutlbilexpns,
          cus_data.telExpns, //telExpnsitem
          cus_data.taxExpns, //taxExpnsitem
          cus_data.goodsLossExpns, //goodsLossExpnsitem
          cus_data.othrExpns1, //othrExpns1item
          cus_data.othrExpns2, //othrExpns2item
          cus_data.totBusNetIncomeitem, //totBusNetIncomeitem
          cus_data.fmlyTotIncome, //fmlyTotIncomeitem
          cus_data.fmlyTotExpense, //fmlyTotExpenseitem
          cus_data.foodExpns, //71 //foodExpnsitem
          cus_data.houseMngtExpns, //houseMngtExpnsitem
          cus_data.utlbilExpns,
          cus_data.edctExpns, //edctExpnsitem
          cus_data.healthyExpns, //healthyExpnsitem
          cus_data.fmlyTaxExpns, //fmlyTaxExpnsitem
          cus_data.fmlyTaxExpns, //fmlyTrnsrtExpnsitem
          cus_data.financeExpns, //financeExpnsitem
          cus_data.fmlyOtrExpns, //fmlyOtrExpnsitem
          cus_data.fmlyTotNetIncome, //fmlyTotNetIncomeitem
          '00', //81 //tabletSyncStsitem
          null, //syncStsitem
          cus_data.nrc_statecode,
          cus_data.nrc_prefix,
          cus_data.nrcNo,
          null,
          cus_data.entryDate,
          null,
          null,
          cus_data.postal_code,
          cus_data.totalnet,
          cus_data.city_code,
          cus_data.city_name,
          cus_data.township_code,
          cus_data.township_name,
          cus_data.village_code,
          cus_data.village_name,
          cus_data.ward_code,
          cus_data.ward_name,
          cus_data.address_type,

          //VillageName
        ],
        (trans, results) => {
          resolve('success');
          console.log('success', results);
        },
        error => {
          reject(error);
          console.log('error', error);
        },
      );
    });
  });
}

export async function fetchAllCustomerNum() {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Customer`,
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

export function updateCustomerData(cus_data) {
  return new Promise(async (resolve, reject) => {
    global.db.transaction(trans => {
      trans.executeSql(
        'UPDATE Customer SET serial_no=?,customer_no =?,customer_nm =?,status_code=?,create_datetime =?,create_user_id =?,delete_datetime =?,delete_user_id =?,update_datetime =?,update_user_id =?,resident_rgst_id =?,employee_no =?,branch_code =?,entry_date =?,position_title_nm =?,salary_rating_code =?,gender =?,birth_date =?,marital_status =?,saving_acct_num =?,tel_no =?,mobile_tel_no =?,addr =?,curr_resident_perd =?,occupation =?,father_name =?,family_num =?,hghschl_num =?,university_num =?,house_ocpn_type =?,remark =?,business_own_type =?,prop_apartment_yn =?,prop_house_yn =?,prop_car_yn =?,prop_motorcycle_yn =?,prop_machines_yn =?,prop_farmland_yn =?,prop_other_yn =?,tot_prop_estmtd_val =?,ohtr_own_property =?,otr_prop_estmtd_val =?,workplace_name =?,workplace_type =?,workplace_period =?,employee_num =?,workplace_addr =?,curr_workplace_perd =?,business_sttn_flg =?,land_scale =?,land_own_type =?,otr_income =?,tot_sale_income =?,tot_sale_expense =?,rawmaterial_expans =?,wrkp_rent_expns =?,employee_expns =?,prmn_empl_expns =?,tmpy_empl_expns =?,trnsrt_expns =?,bus_utlbil_expns =?,tel_expns =?,tax_expns =?,goods_loss_expns =?,othr_expns_1 =?,othr_expns_2 =?,tot_bus_net_income =?,fmly_tot_income =?,fmly_tot_expense =?,food_expns =?,house_mngt_expns =?,utlbil_expns =?,edct_expns =?,healthy_expns =?,fmly_tax_expns =?,fmly_trnsrt_expns =?,finance_expns =?,fmly_otr_expns =?,fmly_tot_net_income =?,tablet_sync_sts =?,sync_sts =?,nrc_state_code =?,nrc_prefix_code =?,nrc_no =?,curr_resident_date =?,workplace_date =?,curr_workplace_date =?,err_msg =?,postal_code =?,total_net =?,city_code =?,city_name =?,township_code =?,township_name =?,village_code =?,village_name =?,ward_code =?,ward_name =?,address_type =?  WHERE id = ?',
        [
          28, //cus_data.serialNo
          // cus_data.employeeNo,
          cus_data.customer_no,
          cus_data.customer_nm, //customerNM
          '02', //statusCode
          '2020-09-09', //create Date Time
          cus_data.createUserId,
          null, //deleteDatetime
          null, //deleteUserId
          null, //updateDatetime
          cus_data.createUserId, //updateUserID
          cus_data.residentRgstId,
          //
          cus_data.employee_no,
          cus_data.branch_code,
          cus_data.entry_date,
          cus_data.position_title_nm,
          cus_data.salary_rating_code,
          // Customer Base
          cus_data.gender,
          cus_data.birth_date,
          cus_data.marital_status,
          cus_data.saving_acct_num,
          cus_data.tel_no,
          cus_data.mobile_tel_no,
          cus_data.addr, //23
          cus_data.curr_resident_perd,
          // 4,
          cus_data.occupation,
          null, //father name
          cus_data.family_num,
          cus_data.hghschl_num,
          cus_data.university_num,
          cus_data.house_ocpn_type,
          cus_data.remark, //Monthly Income remark
          cus_data.business_own_type,
          //Property Info
          cus_data.prop_apartment_yn,
          cus_data.prop_house_yn,
          cus_data.prop_car_yn,
          cus_data.prop_motorcycle_yn,
          cus_data.prop_machines_yn,
          cus_data.prop_farmland_yn,
          cus_data.propOtherYn,
          cus_data.tot_prop_estmtd_val,
          cus_data.ohtr_own_property,
          cus_data.otr_prop_estmtd_val, //43
          //Business
          cus_data.workplace_name,
          cus_data.workplace_type, //workplaceType
          cus_data.workplace_period,
          cus_data.employee_num, //employeeNum
          cus_data.workplace_addr,
          cus_data.curr_workplace_perd,
          cus_data.business_sttn_flg,
          cus_data.land_scale,
          cus_data.land_own_type,
          //Monthly Income
          null, //otrIncome
          cus_data.tot_sale_income,
          cus_data.tot_sale_expense,
          cus_data.rawmaterial_expans,
          cus_data.wrkp_rent_expns,
          cus_data.employee_expns,
          null, //59 //prmnEmplExpns
          null, //tmpyEmplExpns
          cus_data.trnsrt_expns,
          cus_data.bus_utlbil_expns,
          cus_data.tel_expns, //telExpnsitem
          cus_data.tax_expns, //taxExpnsitem
          cus_data.goods_loss_expns, //goodsLossExpnsitem
          cus_data.othr_expns_1, //othrExpns1item
          cus_data.othr_expns_2, //othrExpns2item
          cus_data.totBusNetIncomeitem, //totBusNetIncomeitem
          cus_data.fmly_tot_income, //fmlyTotIncomeitem
          cus_data.fmly_tot_expense, //fmlyTotExpenseitem
          cus_data.food_expns, //71 //foodExpnsitem
          cus_data.house_mngt_expns, //houseMngtExpnsitem
          cus_data.utlbil_expns,
          cus_data.edct_expns, //edctExpnsitem
          cus_data.healthy_expns, //healthyExpnsitem
          cus_data.fmly_tax_expns, //fmlyTaxExpnsitem
          cus_data.fmly_trnsrt_expns, //fmlyTrnsrtExpnsitem
          cus_data.finance_expns, //financeExpnsitem
          cus_data.fmly_otr_expns, //fmlyOtrExpnsitem
          cus_data.fmlyTotNetIncome, //fmlyTotNetIncomeitem
          '00', //81 //tabletSyncStsitem
          null, //syncStsitem
          cus_data.nrc_statecode,
          cus_data.nrc_prefix,
          cus_data.nrc_no,
          null,
          cus_data.entry_date,
          null,
          null,
          cus_data.postal_code,
          cus_data.totalnet,
          cus_data.city_code,
          cus_data.city_name,
          cus_data.township_code,
          cus_data.township_name,
          cus_data.village_code,
          cus_data.village_name,
          cus_data.ward_code,
          cus_data.ward_name,
          cus_data.address_type,
          cus_data.id,

          //VillageName
        ],
        (trans, results) => {
          resolve('success');
          console.log('success', results);
        },
        error => {
          reject(error);
          console.log('error', error);
        },
      );
    });
  });
}
