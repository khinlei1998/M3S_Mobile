import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../common';

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
  console.log('selectedColumn',selectedColumn);
  console.log('searchTerm',searchTerm);

  let sql;
  if (selectedColumn && searchTerm) {
    sql = `SELECT * FROM Customer  WHERE ${selectedColumn} LIKE '%${searchTerm}%'`
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
        serialNo: 1, employeeNo: 2,
        employeeName: 'mgmg', employeeLocalName: 'd',
        userId: '1', password: 'NkI4NkIyNzNGRjM0RkNFMTlENkI4MDRFRkY1QTNGNTc0N0FEQTRFQUEyMkYxRDQ5QzAxRTUyRERCNzg3NUI0Qg==', userKind: 'dsd', resident_rgst_id: 'sa', entryDate: '434', tel_no: '44', cell_phone_no: '43', employeeTypeCode: '434', branchCode: '32', branch_name: '323', local_branch_name: '434', departmentCode: '888', departmentName: '443', departmentLocalName: '43', teamCode: '434', teamName: 'wew', teamLocalName: '434', positionTitleCode: '43', positionTitleNm: 'rer', positionTitleLclNm: 'aew', err_msg: 'fdf'
      },
      {
        serialNo: 2, employeeNo: 2,
        employeeName: 'mgmg', employeeLocalName: 'd',
        userId: '4', password: '323', userKind: 'dsd', resident_rgst_id: 'sa', entryDate: '434', tel_no: '44', cell_phone_no: '43', employeeTypeCode: '434', branchCode: '32', branch_name: '323', local_branch_name: '434', departmentCode: '888', departmentName: '443', departmentLocalName: '43', teamCode: '434', teamName: 'wew', teamLocalName: '434', positionTitleCode: '43', positionTitleNm: 'rer', positionTitleLclNm: 'aew', err_msg: 'fdf'
      },
      {
        serialNo: 3, employeeNo: 2,
        employeeName: 'mgmg', employeeLocalName: 'd',
        userId: '4', password: '323', userKind: 'dsd', resident_rgst_id: 'sa', entryDate: '434', tel_no: '44', cell_phone_no: '43', employeeTypeCode: '434', branchCode: '32', branch_name: '323', local_branch_name: '434', departmentCode: '888', departmentName: '443', departmentLocalName: '43', teamCode: '434', teamName: 'wew', teamLocalName: '434', positionTitleCode: '43', positionTitleNm: 'rer', positionTitleLclNm: 'aew', err_msg: 'fdf'
      },
      {
        serialNo: 4, employeeNo: 2,
        employeeName: 'mgmg', employeeLocalName: 'd',
        userId: '4', password: '323', userKind: 'dsd', resident_rgst_id: 'sa', entryDate: '434', tel_no: '44', cell_phone_no: '43', employeeTypeCode: '434', branchCode: '32', branch_name: '323', local_branch_name: '434', departmentCode: '888', departmentName: '443', departmentLocalName: '43', teamCode: '434', teamName: 'wew', teamLocalName: '434', positionTitleCode: '43', positionTitleNm: 'rer', positionTitleLclNm: 'aew', err_msg: 'fdf'
      },
      {
        serialNo: 5, employeeNo: 2,
        employeeName: 'mgmg', employeeLocalName: 'd',
        userId: '4', password: '323', userKind: 'dsd', resident_rgst_id: 'sa', entryDate: '434', tel_no: '44', cell_phone_no: '43', employeeTypeCode: '434', branchCode: '32', branch_name: '323', local_branch_name: '434', departmentCode: '888', departmentName: '443', departmentLocalName: '43', teamCode: '434', teamName: 'wew', teamLocalName: '434', positionTitleCode: '43', positionTitleNm: 'rer', positionTitleLclNm: 'aew', err_msg: 'fdf'
      },
      {
        serialNo: 6, employeeNo: 2,
        employeeName: 'mgmg', employeeLocalName: 'd',
        userId: '4', password: '323', userKind: 'dsd', resident_rgst_id: 'sa', entryDate: '434', tel_no: '44', cell_phone_no: '43', employeeTypeCode: '434', branchCode: '32', branch_name: '323', local_branch_name: '434', departmentCode: '888', departmentName: '443', departmentLocalName: '43', teamCode: '434', teamName: 'wew', teamLocalName: '434', positionTitleCode: '43', positionTitleNm: 'rer', positionTitleLclNm: 'aew', err_msg: 'fdf'
      },
      {
        serialNo: 7, employeeNo: 2,
        employeeName: 'mgmg', employeeLocalName: 'd',
        userId: '4', password: '323', userKind: 'dsd', resident_rgst_id: 'sa', entryDate: '434', tel_no: '44', cell_phone_no: '43', employeeTypeCode: '434', branchCode: '32', branch_name: '323', local_branch_name: '434', departmentCode: '888', departmentName: '443', departmentLocalName: '43', teamCode: '434', teamName: 'wew', teamLocalName: '434', positionTitleCode: '43', positionTitleNm: 'rer', positionTitleLclNm: 'aew', err_msg: 'fdf'
      },
      {
        serialNo: 8, employeeNo: 2,
        employeeName: 'mgmg', employeeLocalName: 'd',
        userId: '4', password: '323', userKind: 'dsd', resident_rgst_id: 'sa', entryDate: '434', tel_no: '44', cell_phone_no: '43', employeeTypeCode: '434', branchCode: '32', branch_name: '323', local_branch_name: '434', departmentCode: '888', departmentName: '443', departmentLocalName: '43', teamCode: '434', teamName: 'wew', teamLocalName: '434', positionTitleCode: '43', positionTitleNm: 'rer', positionTitleLclNm: 'aew', err_msg: 'fdf'
      },
      {
        serialNo: 9, employeeNo: 2,
        employeeName: 'mgmg', employeeLocalName: 'd',
        userId: '4', password: '323', userKind: 'dsd', resident_rgst_id: 'sa', entryDate: '434', tel_no: '44', cell_phone_no: '43', employeeTypeCode: '434', branchCode: '32', branch_name: '323', local_branch_name: '434', departmentCode: '888', departmentName: '443', departmentLocalName: '43', teamCode: '434', teamName: 'wew', teamLocalName: '434', positionTitleCode: '43', positionTitleNm: 'rer', positionTitleLclNm: 'aew', err_msg: 'fdf'
      },
      {
        serialNo: 10, employeeNo: 2,
        employeeName: 'mgmg', employeeLocalName: 'd',
        userId: '4', password: '323', userKind: 'dsd', resident_rgst_id: 'sa', entryDate: '434', tel_no: '44', cell_phone_no: '43', employeeTypeCode: '434', branchCode: '32', branch_name: '323', local_branch_name: '434', departmentCode: '888', departmentName: '443', departmentLocalName: '43', teamCode: '434', teamName: 'wew', teamLocalName: '434', positionTitleCode: '43', positionTitleNm: 'rer', positionTitleLclNm: 'aew', err_msg: 'fdf'
      },
    ]
    global.db.transaction(tx => {
      tx.executeSql('DELETE FROM Customer', [], (tx, results) => {
        axios
          .get(
            // `https://sample-rest.onrender.com:443/skylark-m3s/api/customers.m3s`
            `https://${ip}:${port}/skylark-m3s/api/customers.m3s`,
            // { responseType: 'json' }
          )
          .then(({ data }) => {
            console.log('Customer Total lenght>>>>.', data.length);
            console.log('Customer Length>>>>>>', data[0]);
            console.log('Customer Length>>>>>>', data[1]);
            console.log('Customer Length>>>>>>', data[2]);
            console.log('Customer Length>>>>>>', data[3]);
            console.log('Customer Length>>>>>>', data[4]);
            console.log('Customer Length>>>>>>', data[5]);
            console.log('Customer Length>>>>>>', data[6]);
            console.log('Customer Length>>>>>>', data[7]);
            if (data.length > 0) {

              let insertedRows = 0;
              global.db.transaction(tx => {

                for (let i = 0; i < data.length; i += batchSize) {
                  const records = data.slice(i, i + batchSize);
                  console.log('records>>>>>>', records);

                  records.forEach(item => {
                    console.log('item', item);
                    tx.executeSql(
                      `INSERT INTO Customer (serial_no,customer_no,customer_nm,status_code,create_datetime,create_user_id,delete_datetime,delete_user_id,update_datetime,update_user_id,resident_rgst_id,employee_no,branch_code,entry_date,position_title_nm,salary_rating_code,gender,birth_date,marital_status,saving_acct_num,tel_no,mobile_tel_no,addr,curr_resident_perd,occupation,father_name,family_num,hghschl_num,university_num,house_ocpn_type,remark,business_own_type,prop_apartment_yn,prop_house_yn,prop_car_yn,prop_motorcycle_yn,prop_machines_yn,prop_farmland_yn,prop_other_yn,tot_prop_estmtd_val,ohtr_own_property,otr_prop_estmtd_val,workplace_name,workplace_type,workplace_period,employee_num,workplace_addr,curr_workplace_perd,business_sttn_flg,land_scale,land_own_type,otr_income,tot_sale_income,tot_sale_expense,rawmaterial_expans,wrkp_rent_expns,employee_expns,prmn_empl_expns,tmpy_empl_expns,trnsrt_expns,bus_utlbil_expns,tel_expns,tax_expns,goods_loss_expns,othr_expns_1,othr_expns_2,tot_bus_net_income,fmly_tot_income,fmly_tot_expense,food_expns,house_mngt_expns,utlbil_expns,edct_expns,healthy_expns,fmly_tax_expns,fmly_trnsrt_expns,finance_expns,fmly_otr_expns,fmly_tot_net_income,tablet_sync_sts,sync_sts,nrc_state_code,nrc_prefix_code,nrc_no,curr_resident_date,workplace_date,curr_workplace_date,err_msg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
                      ],
                      (tx, results) => {
                        // If insert query succeeds, resolve the promise
                        console.log('Customer Insert success', results);
                        console.log('insertedRows', insertedRows);
                        console.log('length', data.length);
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
