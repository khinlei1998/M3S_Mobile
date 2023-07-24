import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert, FileSystem } from 'react-native';
import RNFS from 'react-native-fs';

export async function getAllLoan() {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Individual_application ',
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
// Helper function to merge data from two tables
const mergeTablesData = (dataFromTable1, dataFromTable2) => {
  // Perform the data merging logic here
  // For example, you can concatenate the data or create a new array of merged objects.

  const mergedData = [];

  // Merge data from table1
  dataFromTable1.forEach(item => {
    mergedData.push(item);
  });

  // Merge data from table2
  // dataFromTable2.forEach(item => {
  //   mergedData.push(item);
  // });
  dataFromTable2.forEach(item => {
    mergedData.push(item);
    // mergedData.push({
    //   serial_no: item.serial_no, // Use a unique key for each item in the merged array.
    //   application_no: item.group_aplc_no,
    //   status_code: item.status_code,// Since table1 does not have column1, set it to null or any default value.
    //   create_datetime: item.create_datetime, // Since table1 does not have column2, set it to null or any default value.
    //   create_user_id: item.create_user_id,
    //   delete_datetime: item.delete_datetime,
    //   delete_user_id: item.delete_user_id,
    //   update_datetime: item.update_datetime,
    //   update_user_id: item.update_user_id,
    //   open_branch_code: item.open_branch_code,
    //   product_type: item.product_type,
    //   open_user_id: item.open_user_id,
    //   mngt_branch_code: item.mngt_branch_code,
    //   mngt_user_id: item.mngt_user_id,
    //   application_date: item.application_date,
    //   in_charge: item.in_charge,
    //   township_name: item.township_name,
    //   customer_no: item.customer_no,
    //   borrower_name: item.leader_name,
    //   resident_rgst_id: item.resident_rgst_id,
    //   father_name: item.father_name,
    //   addr: item.addr,
    //   tablet_sync_sts: item.tablet_sync_sts,
    //   sync_sts: item.sync_sts,
    // });
  });
  return mergedData;
};
export async function getAllLoanType() {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Individual_application WHERE group_aplc_no IS NULL',
        [],
        (tx, results) => {
          const dataFromTable1 = results.rows.raw();
          // Retrieve data from table2
          global.db.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM Group_application',
              [],
              (tx, results) => {
                const dataFromTable2 = results.rows.raw();
                // Merge the data from table1 and table2
                const mergedData = mergeTablesData(
                  dataFromTable1,
                  dataFromTable2,
                );
                console.log('mergedData', mergedData);
                resolve(mergedData);
              },
              error => {
                console.log('SELECT error from table2:', error);
              },
            );
          });
        },
        error => {
          console.log('SELECT error from table1:', error);
        },
      );
    });
  });
}

// export function getIndividual_loan() {
//   return new Promise(async (resolve, reject) => {
//     let ip = await AsyncStorage.getItem('ip');
//     let port = await AsyncStorage.getItem('port');
//     const batchSize = 100;
//     global.db.transaction(tx => {
//       tx.executeSql('DELETE FROM Individual_application', [], (tx, results) => {
//         axios
//           .get(`https://${ip}:${port}/skylark-m3s/api/individualLoans.m3s`)
//           .then(({data}) => {
//             if (data.length > 0) {
//               let insertedRows = 0;
//               global.db.transaction(tx => {
//                 for (let i = 0; i < data.length; i += batchSize) {
//                   const records = data.slice(i, i + batchSize);
//                   records.forEach(item => {
//                     tx.executeSql(
//                       `INSERT INTO Individual_application (serial_no,application_no,group_aplc_no,status_code,create_datetime,create_user_id,delete_datetime,delete_user_id,update_datetime,update_user_id,loan_status_code,decision_no,contract_no,product_type,channel_device_type,open_branch_code,open_user_id,mngt_branch_code,mngt_user_id,loan_type,cst_new_exist_flg,loan_cycle,application_amt,application_date,loanterm_cnt,borrower_name,customer_no,loan_code,saving_acct_num,gender,marital_status,resident_rgst_id,tel_no,mobile_tel_no,employee_no,entry_date,position_title_nm,position_title_code,branch_code,salary_rating_code,addr,family_num,hghschl_num,university_num,students_cnt,curr_resident_perd,house_ocpn_type,business_own_type,co_customer_no,co_brwer_name,co_brwer_birth_dt,co_brwer_rgst_id,co_brwer_tel_no,co_brwer_mble_tel_no,borrower_rltn,co_occupation,workplace_name,workplace_type,workplace_period,employee_num,workplace_addr,curr_workplace_perd,business_sttn_flg,land_scale,land_own_type,tot_sale_income,tot_sale_expense,rawmaterial_expans,wrkp_rent_expns,employee_expns,prmn_empl_expns,tmpy_empl_expns,trnsrt_expns,bus_utlbil_expns,tel_expns,tax_expns,goods_loss_expns,othr_expns_1,othr_expns_2,tot_bus_net_income,fmly_tot_income,fmly_tot_expense,food_expns,house_mngt_expns,utlbil_expns,edct_expns,healthy_expns,fmly_trnsrt_expns,fmly_tax_expns,finance_expns,fmly_otr_expns,fmly_tot_net_income,tot_net_income,otr_mfi_loan_cnt,otr_mfi_nm,remark,borrower_id_no,borrower_age,have_fixed_asset,co_brwer_business,co_brwer_net_income,property_kind,prop_apartment_yn,prop_house_yn,prop_car_yn,prop_motorcycle_yn,prop_machines_yn,prop_farmland_yn,ohtr_own_property,tot_prop_estmtd_val,own_property_estmtd_val,past_loan_cycle,pastdue_month_cnt,past_loan_rating,past_loan_amount,past_credit_empl_nm,check_phone_num_yn,reputation_yn,business_good_yn,real_property_yn,repayment_history_yn,loan_officer_cmnt,tablet_sync_sts,sync_sts,old_application_no,transaction_date,loan_limit_amt,curr_resident_date,workplace_date,curr_workplace_date,err_msg,interest_rates,loan_charges,city_code,city_name,township_code,township_name,village_code,village_name,ward_code,ward_name,location_code,location_name,
//                         borrower_sign,co_borrower_sign,borrower_map,address_type) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
//                       [
//                         item.serialNo,
//                         item.applicationNo,
//                         item.groupAplcNo,
//                         item.statusCode,
//                         item.createDatetime,
//                         item.createUserId,
//                         item.deleteDatetime,
//                         item.deleteUserId,
//                         item.updateDatetime,
//                         item.updateUserId,
//                         null,
//                         null,
//                         null, //13
//                         item.productType,
//                         item.channelDeviceType,

//                         item.openBranchCode,
//                         item.openUserId,
//                         item.mngtBranchCode,
//                         item.mngtUserId,
//                         item.loanType,
//                         item.cstNewExistFlg,
//                         item.loanCycle,
//                         item.applicationAmt,
//                         item.applicationDate,

//                         item.loantermCnt,
//                         item.borrowerName,
//                         item.customerNo, //27

//                         item.loanCode,
//                         item.savingAcctNum,
//                         item.gender,
//                         item.birthDate,
//                         item.maritalStatus,
//                         item.residentRgstId,
//                         item.telNo,
//                         item.mobileTelNo,
//                         null,
//                         item.entryDate,
//                         item.positionTitleNm,
//                         item.branchCode,
//                         item.salaryRatingCode, //40
//                         item.addr,
//                         null,
//                         item.hghschlNum,
//                         item.universityNum,
//                         item.studentCnt,
//                         item.currResidentPerd,
//                         item.houseOcpnType,
//                         item.businessOwnType,
//                         item.coCustomerNo,
//                         item.coBrwerName,
//                         item.coBrwerBirthDt,
//                         item.coBrwerBirthDt,
//                         item.coBrwerRgstId,
//                         item.coBrwerTelNo,
//                         item.coBrwerMbleTelNo,
//                         item.borrowerRltn,
//                         item.coOccupation,
//                         item.workplaceName,
//                         item.workplaceType,
//                         item.workplacePeriod,
//                         item.employeeNum,
//                         item.workplaceAddr,
//                         item.currWorkplacePerd,
//                         null,
//                         item.landScale,
//                         item.landOwnType,
//                         item.totSaleIncome,
//                         item.totSaleExpense,
//                         item.rawmaterialExpans,
//                         item.wrkpRentExpns,
//                         item.employeeExpns,
//                         null,
//                         null,
//                         item.trnsrtExpns,
//                         null,
//                         null,
//                         null,
//                         item.goodsLossExpns,
//                         item.othrExpns1,
//                         item.othrExpns2, //80
//                         item.totBusNetIncome,
//                         item.fmlyTotIncome,
//                         item.fmlyTotExpense,
//                         item.foodExpns,
//                         item.houseMngtExpns,
//                         item.utlbilExpns,
//                         item.edctExpns,
//                         item.healthyExpns,
//                         null,
//                         null,
//                         item.financeExpns,
//                         item.fmlyOtrExpns,
//                         item.totNetIncome,
//                         null,
//                         null,
//                         item.remark,
//                         null,
//                         item.age,
//                         null,
//                         null, //100
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         item.pastLoanCycle,
//                         item.pastdueMonthCnt,
//                         item.pastLoanRating,
//                         item.pastLoanAmount,
//                         item.pastCreditEmplNm,
//                         null,
//                         null,
//                         null,
//                         null, //120
//                         null,
//                         null,
//                         item.tabletSyncSts,
//                         item.syncSts,
//                         null,
//                         null,
//                         item.loanLimitAmt,
//                         null,
//                         null,
//                         null,
//                         null, //131
//                       ],
//                       (tx, results) => {
//                         // If insert query succeeds, resolve the promise
//                         // console.log('Employee Insert success', results.rowsAffected);
//                         console.log('length', data.length);

//                         insertedRows += results.rowsAffected;
//                         if (insertedRows === data.length) {
//                           resolve('success');
//                           console.log('All loan records inserted successfully');
//                         }
//                       },
//                       error => {
//                         console.log('query error', error);
//                         // If insert query fails, rollback the transaction and reject the promise
//                         tx.executeSql('ROLLBACK', [], () => {
//                           reject(error);
//                         });
//                       },
//                     );
//                   });
//                 }
//               });
//             }
//           })
//           .catch(error => {
//             alert(error);
//             reject(error);
//           });
//       });
//     });
//   });
// }

export const storeLoanData = async loan_data => {
  const user_id = await AsyncStorage.getItem('user_id');
  return new Promise(async (resolve, reject) => {
    try {
      global.db.transaction(trans => {
        trans.executeSql(
          `INSERT INTO Individual_application (serial_no,application_no,group_aplc_no,status_code,create_datetime,create_user_id,delete_datetime,delete_user_id,update_datetime,update_user_id,loan_status_code,decision_no,contract_no,product_type,channel_device_type,open_branch_code,open_user_id,mngt_branch_code,mngt_user_id,loan_type,cst_new_exist_flg,loan_cycle,application_amt,application_date,loanterm_cnt,borrower_name,customer_no,loan_code,saving_acct_num,gender,birth_date,marital_status,resident_rgst_id,tel_no,mobile_tel_no,employee_no,entry_date,position_title_nm,position_title_code,branch_code,salary_rating_code,addr,family_num,hghschl_num,university_num,students_cnt,curr_resident_perd,house_ocpn_type,business_own_type,co_customer_no,co_brwer_name,co_brwer_birth_dt,co_brwer_rgst_id,co_brwer_tel_no,co_brwer_mble_tel_no,borrower_rltn,co_occupation,workplace_name,workplace_type,workplace_period,employee_num,workplace_addr,curr_workplace_perd,business_sttn_flg,land_scale,land_own_type,tot_sale_income,tot_sale_expense,rawmaterial_expans,wrkp_rent_expns,employee_expns,prmn_empl_expns,tmpy_empl_expns,trnsrt_expns,bus_utlbil_expns,tel_expns,tax_expns,goods_loss_expns,othr_expns_1,othr_expns_2,tot_bus_net_income,fmly_tot_income,fmly_tot_expense,food_expns,house_mngt_expns,utlbil_expns,edct_expns,healthy_expns,fmly_trnsrt_expns,fmly_tax_expns,finance_expns,fmly_otr_expns,fmly_tot_net_income,tot_net_income,otr_mfi_loan_cnt,otr_mfi_nm,remark,borrower_id_no,borrower_age,have_fixed_asset,co_brwer_business,co_brwer_net_income,property_kind,prop_apartment_yn,prop_house_yn,prop_car_yn,prop_motorcycle_yn,prop_machines_yn,prop_farmland_yn,ohtr_own_property,tot_prop_estmtd_val,own_property_estmtd_val,past_loan_cycle,pastdue_month_cnt,past_loan_rating,past_loan_amount,past_credit_empl_nm,check_phone_num_yn,reputation_yn,business_good_yn,real_property_yn,
          repayment_history_yn,loan_officer_cmnt,tablet_sync_sts,sync_sts,old_application_no,transaction_date,loan_limit_amt,curr_resident_date,workplace_date,curr_workplace_date,err_msg,interest_rates,loan_charges,city_code,city_name,township_code,township_name,village_code,village_name,ward_code,ward_name,location_code,location_name,borrower_sign,co_borrower_sign,address_type) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,COALESCE(?,0),COALESCE(?,0),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),?,?,COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,COALESCE(?,0),?,?,?,?,?,?,?,?,?,?,?,COALESCE(?,0),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            null, //serialNo
            loan_data.application_no,
            loan_data.group_aplc_no, //group_aplc_no
            '01', //statusCode
            '2020-09-09', //create Date Time
            user_id,
            null, //deleteDatetime
            null, //delet usr id
            null, //updateDatetime
            user_id, //updateUserID
            null, //loanStatusCode
            //
            null, //Decison No
            null, //contract no
            loan_data.product_type, // product type
            '001100', //Channel Device type
            null, //open branch code
            null, //Open user id
            null, //mngt_branch_code
            null, //mngt_user_id
            loan_data.loan_type, //20
            loan_data.cst_new_exist_flg,
            loan_data.loan_cycle,
            loan_data.application_amt,
            loan_data.application_date, //application_date,
            loan_data.loanterm_cnt,
            //Borrowe Info
            loan_data.borrower_name,
            loan_data.customer_no,
            loan_data.loan_code,
            loan_data.saving_acct_num,
            loan_data.gender,
            loan_data.birth_date,
            loan_data.marital_status,
            loan_data.resident_rgst_id,
            loan_data.tel_no,
            null, //mobile tel no
            null, //employee_no,
            null, //entry_date,
            null, //position_title_nm,
            null, //position_title_code,
            null, //branch code //40
            null, //salary rating code
            loan_data.addr,
            loan_data.family_num,
            loan_data.hghschl_num, //hghschl_num,
            loan_data.university_num, //university_num,
            null, //students_cnt,
            loan_data.curr_resident_perd,
            loan_data.house_ocpn_type,
            loan_data.business_own_type,
            //Co Bower
            loan_data.co_customer_no,
            loan_data.co_brwer_name,
            loan_data.co_brwer_birth_dt,
            loan_data.co_brwer_rgst_id,
            loan_data.co_brwer_tel_no,
            null, //co_brwer_mble_tel_no
            loan_data.borrower_rltn,
            loan_data.co_occupation,
            //Business info
            loan_data.workplace_name,
            loan_data.workplace_type,
            loan_data.workplace_period, //60
            loan_data.employee_num,
            // loan_data.busutlbilexpns,
            loan_data.workplace_addr,
            loan_data.curr_workplace_perd,
            loan_data.business_sttn_flg,
            loan_data.land_scale,
            loan_data.land_own_type,
            //Monthly Income
            loan_data.totSaleIncome,
            loan_data.totSaleExpense,
            loan_data.rawmaterialExpans,
            loan_data.wrkpRentExpns,
            loan_data.employeeExpns,
            null, //prmn_empl_expns
            null, //tmpy_empl_expns
            loan_data.trnsrtExpns,
            loan_data.busutlbilexpns,
            loan_data.telExpns,
            loan_data.taxExpns,
            loan_data.goodsLossExpns,
            loan_data.othrExpns1,
            loan_data.othrExpns2, //80
            loan_data.totBusNetIncomeitem, //check
            loan_data.fmlyTotIncome,
            loan_data.fmlyTotExpense,
            loan_data.foodExpns,
            loan_data.houseMngtExpns,
            loan_data.utlbilExpns,
            loan_data.edctExpns,
            loan_data.healthyExpns,
            loan_data.fmlyTrnsrtExpns,
            loan_data.fmlyTaxExpns,
            loan_data.financeExpns,
            loan_data.fmlyOtrExpns,
            loan_data.fmlyTotNetIncome,
            loan_data.totalnet,
            null, //otr_mfi_loan_cnt
            null, //otr_mfi_nm
            loan_data.remark,
            null, //borrower_id_no
            null, //borrower_age
            null, //have_fixed_asset //100
            null, //co_brwer_business
            null, //co_brwer_net_income
            null, //property_kind
            null, //prop_apartment_yn
            null, //prop_house_yn
            null, //prop_car_yn
            null, //prop_motorcycle_yn
            null, //prop_machines_yn
            null, //prop_farmland_yn
            null, //ohtr_own_property
            null, //tot_prop_estmtd_val
            null, //own_property_estmtd_val
            null, //past_loan_cycle
            null, //pastdue_month_cnt
            null, //past_loan_rating
            null, //past_loan_amount
            null, //past_credit_empl_nm
            null, //check_phone_num_yn
            null, //reputation_yn
            null, //business_good_yn //120
            null, //real_property_yn
            null, //repayment_history_yn
            null, //loan_officer_cmnt
            '00', //tablet_sync_sts
            '00', //
            null, //old_application_no
            null, //transaction_date (Date)
            loan_data.loan_limit_amt,
            loan_data.curr_resident_date, //curr_resident_date
            null, //workplace_date //130
            null, //curr_workplace_date
            null, //132
            loan_data.interest_rates,
            loan_data.loan_charges,
            loan_data.city_code,
            loan_data.city_name,
            loan_data.township_code,
            loan_data.township_name,
            loan_data.village_code,
            loan_data.village_name,
            loan_data.ward_code,
            loan_data.ward_name,
            loan_data.location_code,
            loan_data.location_name,
            loan_data.borrower_sign, //borrower sign
            loan_data.co_borrower_sign,
            loan_data.address_type
            // loan_data.borrower_map,
            //146
          ],
          (trans, results) => {
            resolve('success');
            console.log('success', results);
          },
          error => {
            reject(error);
            alert(error);
          },
        );
      });
    } catch (error) {
      reject(error);
    }
  });
};

export async function deleteLoan_ByID(data) {
  try {
    const borrowerImagePath = data.borrower_sign;
    const coBorrowerImagePath = data.co_borrower_sign;

    // Delete the borrower image if it exists
    // if (borrowerImagePath) {
    //   try {
    //     // await deleteImageFile(borrowerImagePath);
    //     // await FileSystem.delete(borrowerImagePath);
    //     const exists = await RNFS.exists(borrowerImagePath);
    //     if (exists) {
    //       console.log('exist');
    //       await RNFS.unlink(borrowerImagePath);
    //       console.log('File deleted successfully');
    //     } else {
    //       console.log('File does not exist');
    //     }

    //     console.log('Borrower image deleted successfully:', borrowerImagePath);
    //   } catch (error) {
    //     console.error('Error deleting borrower image:', error);
    //     // Display an alert indicating the error
    //     alert('Error deleting borrower image');
    //   }
    // }

    // // Delete the co-borrower image if it exists
    // if (coBorrowerImagePath) {
    //   try {
    //     const exists = await RNFS.exists(coBorrowerImagePath);
    //     if (exists) {
    //       console.log('co borrower exist', exists);
    //       await RNFS.unlink(coBorrowerImagePath);
    //       console.log('File deleted successfully');
    //     } else {
    //       console.log('File does not exist');
    //     }
    //     console.log(
    //       'Co-borrower image deleted successfully:',
    //       coBorrowerImagePath,
    //     );
    //   } catch (error) {
    //     console.error('Error deleting co-borrower image:', error);
    //     // Display an alert indicating the error
    //     alert('Error deleting co-borrower image');
    //   }
    // }

    return new Promise((resolve, reject) => {
      global.db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Individual_application WHERE application_no = ?',
          [data.application_no],
          (txObj, resultSet) => {
            tx.executeSql(
              'DELETE FROM Exception_aprv WHERE application_no = ?',
              [data.application_no],
              (txObj, resultSet) => {
                tx.executeSql(
                  'DELETE FROM Area_evaluation WHERE application_no = ?',
                  [data.application_no],
                  (txObj, resultSet) => {
                    tx.executeSql(
                      'DELETE FROM Relation_info WHERE application_no = ?',
                      [data.application_no],
                      (txObj, resultSet) => {
                        tx.executeSql(
                          'DELETE FROM Guarantee WHERE application_no = ?',
                          [data.application_no],
                          (txObj, resultSet) => {
                            console.log('Delete from Guarantee successful');
                            resolve('success');
                          },
                          (txObj, error) => {
                            console.error(
                              'Delete from Guarantee error:',
                              error,
                            );
                            reject(error);
                          },
                        );
                      },
                      (txObj, error) => {
                        console.error(
                          'Delete from Relation_info error:',
                          error,
                        );
                        reject(error);
                      },
                    );
                  },
                  (txObj, error) => {
                    console.error('Delete from Area_evaluation error:', error);
                    reject(error);
                  },
                );
              },
              (txObj, error) => {
                console.error('Delete from Table2 error:', error);
                reject(error);
              },
            );
          },
          (txObj, error) => {
            // Error occurred while executing the delete query
            console.error('Delete error Individual_application:', error);
            reject(error);
          },
        );
      });
    });
  } catch (error) {
    console.error('Error deleting loan:', error);
    throw error;
  }
}

export async function getAllLoan_By_application_no(application_no) {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        `SELECT *
        FROM Individual_application where application_no=`,
        [application_no],
        (tx, results) => {
          resolve(results.rows.raw());
        },
        (tx, error) => {
          console.log('error', error);
          reject(error);
        },
      );
    });
  });
}

export const fetchDataForCheckedData = async (checkedItems, branch_code) => {
  console.log('checkedItems', checkedItems);
  const failedData = [];
  let successCount = 0;
  let success_id = [];
  let ip = await AsyncStorage.getItem('ip');
  let port = await AsyncStorage.getItem('port');
  let user_id = await AsyncStorage.getItem('user_id');
  try {
    for (const data of checkedItems) {
      if (data.product_type == 30) {
        let groupApplication = [
          {
            organizationCode: "",
            serialNo: "",
            statusCode: "01",
            productType: data.product_type,
            createUserId: data.create_user_id,
            updateUserId: data.update_user_id,
            tabletGroupAplcNo: "30M0123720230623002",
            groupAplcNo: data.group_aplc_no,
            openBranchCode: data.open_branch_code,
            openUserId: data.open_user_id,
            mngtBranchCode: data.mngt_branch_code,
            mngtUserId: data.mngt_user_id,
            applicationDate: data.application_date,
            inCharge: data.in_charge,
            townshipName: data.township_name,
            leaderName: data.leader_name,
            residentRgstId: data.resident_rgst_id,
            fatherName: data.father_name,
            addr: data.addr,
            tabletSyncSts: "00",
            syncSts: "00",
            customerNo: data.customer_no,
            transactionDate: "2023-06-28"
          }
        ]
        const indiLoanData = await fetchIndiloanData(data.group_aplc_no);
        console.log('indiLoanData', indiLoanData);

        for (const loan_data of indiLoanData) {
          let individual_loan_data = {
            id: loan_data.id,
            statusCode: '01',
            createUserId: user_id,
            updateUserId: loan_data.update_user_id,
            productType: loan_data.product_type, //not null
            channelDeviceType: '00110',
            openBranchCode: user_id, //not null
            openUserId: user_id, //not null
            mngtBranchCode: user_id, //not null
            mngtUserId: user_id,
            applicationNo: loan_data.application_no,
            groupAplcNo: '',
            tabletAplcNo: '',
            referAplcNo: '',
            loanType: loan_data.loan_type,
            cstNewExistFlg: loan_data.cst_new_exist_flg, //1==Y
            loanCycle: loan_data.loan_cycle,
            applicationAmt: 1000000.0,
            applicationDate: loan_data.application_date,
            loantermCnt: loan_data.loanterm_cnt, //not null
            borrowerName: 'jj', //loan_data.borrower_name
            customerNo: loan_data.customer_no,
            loanCode: loan_data.loan_code,
            savingAcctNum: loan_data.saving_acct_num,
            gender: loan_data.gender,
            birthDate: loan_data.birth_date,
            maritalStatus: loan_data.marital_status,
            residentRgstId: loan_data.resident_rgst_id,
            telNo: loan_data.tel_no,
            mobileTelNo: loan_data.mobile_tel_no,
            positionTitleNm: loan_data.position_title_nm,
            addr: loan_data.addr,
            businessOwnType: loan_data.business_own_type,
            coCustomerNo: loan_data.co_customer_no,
            coBrwerName: loan_data.co_brwer_name,
            workplaceName: loan_data.workplace_name,
            workplaceType: loan_data.workplace_type,
            workplaceAddr: loan_data.workplace_addr,
            landOwnType: '',
            totSaleIncome: loan_data.tot_sale_income,
            totSaleExpense: loan_data.tot_sale_expense,
            rawmaterialExpans: loan_data.rawmaterial_expans,
            wrkpRentExpns: loan_data.wrkp_rent_expns,
            employeeExpns: loan_data.employee_expns,
            trnsrtExpns: loan_data.trnsrt_expns,
            goodsLossExpns: loan_data.goods_loss_expns,
            othrExpns1: loan_data.othr_expns_1,
            othrExpns2: loan_data.othr_expns_2,
            totBusNetIncome: loan_data.tot_bus_net_income,
            fmlyTotIncome: loan_data.fmly_tot_income,
            fmlyTotExpense: loan_data.fmly_tot_expense,
            foodExpns: loan_data.fmly_tot_expense,
            houseMngtExpns: loan_data.house_mngt_expns,
            utlbilExpns: loan_data.utlbil_expns,
            edctExpns: loan_data.edct_expns,
            healthyExpns: loan_data.healthy_expns,
            financeExpns: loan_data.finance_expns,
            fmlyOtrExpns: loan_data.fmly_otr_expns,
            fmlyTotNetIncome: loan_data.fmly_tot_net_income,
            totNetIncome: loan_data.fmly_tot_net_income,
            remark: loan_data.remark,
            tabletSyncSts: '00',
            syncSts: '00',
            pastLoanAmount: loan_data.past_loan_amount,
            pastLoanRating: loan_data.past_loan_rating,
            pastCreditEmplNm: loan_data.past_credit_empl_nm,
            oldApplicationNo: loan_data.old_application_no,
            loanLimitAmt: loan_data.loan_limit_amt,
            sysOrganizationCode: '1000',
            organizationCode: '1000',
            restFlag: 'Y',
            transactionDate: '2023-05-07',
            serialNo: '',
            //not include to server
            birth_date: loan_data.birth_date,
            borrower_age: loan_data.borrower_age,
            borrower_id_no: loan_data.borrower_id_no,
            borrower_name: loan_data.borrowerf_name,
            borrower_rltn: loan_data.borrower_rltn,
            branch_code: loan_data.branch_code,
            bus_utlbil_expns: loan_data.bus_utlbil_expns,
            business_good_yn: loan_data.business_good_yn,
            business_sttn_flg: loan_data.business_sttn_flg,
            check_phone_num_yn: loan_data.check_phone_num_yn,
            city_code: loan_data.city_code,
            city_name: loan_data.city_name,
            co_brwer_birth_dt: loan_data.co_brwer_birth_dt,
            co_brwer_business: loan_data.co_brwer_business,
            co_brwer_mble_tel_no: loan_data.co_brwer_mble_tel_no,
            co_brwer_net_income: loan_data.co_brwer_net_income,
            co_brwer_rgst_id: loan_data.co_brwer_rgst_id,
            co_brwer_tel_no: loan_data.co_brwer_tel_no,
            co_occupation: loan_data.co_occupation,
            contract_no: loan_data.contract_no,
            create_datetime: loan_data.create_datetime,
            curr_resident_date: loan_data.curr_resident_date,
            curr_workplace_date: loan_data.curr_workplace_date,
            curr_workplace_perd: loan_data.curr_workplace_perd,
            decision_no: loan_data.decision_no,
            delete_datetime: loan_data.delete_datetime,
            delete_user_id: loan_data.delete_user_id,
            employee_no: loan_data.employee_no,
            employee_num: loan_data.employee_num,
            entry_date: loan_data.entry_date,
            family_num: loan_data.family_num,
            group_aplc_no: loan_data.group_aplc_no,
            have_fixed_asset: loan_data.have_fixed_asset,
            hghschl_num: loan_data.hghschl_num,
            house_ocpn_type: loan_data.house_ocpn_type,
            interest_rate: loan_data.interest_rates,
            loan_charge: loan_data.loan_charges,
            land_scale: loan_data.land_scale,
            loan_officer_cmnt: loan_data.loan_officer_cmnt,
            loan_status_code: loan_data.loan_status_code,
            location_code: loan_data.location_code,
            location_name: loan_data.location_name,
            // mngt_user_id: loan_data.mngt_user_id,
            ohtr_own_property: loan_data.ohtr_own_property,
            otr_mfi_nm: loan_data.otr_mfi_nm,
            own_property_estmtd_val: loan_data.own_property_estmtd_val,
            past_loan_cycle: loan_data.past_loan_cycle,
            pastdue_month_cnt: loan_data.pastdue_month_cnt,
            position_title_code: loan_data.position_title_code,
            prmn_empl_expns: loan_data.prmn_empl_expns,
            prop_apartment_yn: loan_data.prop_apartment_yn,
            prop_car_yn: loan_data.prop_car_yn,
            prop_farmland_yn: loan_data.prop_farmland_yn,
            prop_house_yn: loan_data.prop_house_yn,
            prop_machines_yn: loan_data.prop_machines_yn,
            prop_motorcycle_yn: loan_data.prop_motorcycle_yn,
            property_kind: loan_data.property_kind,
            address_type: loan_data.address_type
          };

          console.log('individual_loan_data', individual_loan_data);
          const loan_applicationNo = loan_data.application_no;



          let formData = new FormData();
          formData.append(
            'groupApplication',
            JSON.stringify(groupApplication),
          );
          formData.append(
            'individualApplication',
            JSON.stringify(individual_loan_data),
          );
          formData.append('guarantee', '[]');
          formData.append('areaEvaluation', '[]');
          formData.append('relationInfo', '[]');
          formData.append(
            'approvalRequests',
            '[]',
          );
          console.log('FormData', formData);
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://${ip}:${port}/skylark-m3s/api/groupLoan.m3s`,
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              'cache-control': 'no-cache',
              // processData: false,
              // contentType: false,
            },
          };
          const response = await axios.request(config);
          console.log('Group loan response ', response);
          if (
            response.data.groupApplication &&
            response.data.groupApplication[0].errMsg
          ) {
            const error = {
              form: 'Group Application',
              message: response.data.groupApplication[0].errMsg,
            };
            failedData.push(error);
          } else {
            //1
            successCount++;
            global.db.transaction(tx => {
              tx.executeSql(
                'UPDATE Group_application set tablet_sync_sts=? where group_aplc_no=?',
                ['01', data.group_aplc_no],
                (txObj, resultSet) => {
                  console.log('Update successful');
                },
                (txObj, error) => {
                  reject(error);
                  console.error('Update error:', error);
                },
              );
            });
          }
          if (
            response.data.individualApplication &&
            response.data.individualApplication[0].errMsg
          ) {
            const error = {
              form: 'individualApplication',
              message: response.data.individualApplication[0].errMsg,
            };
            failedData.push(error);
          } else {
            //1
            successCount++;
            global.db.transaction(tx => {
              tx.executeSql(
                'UPDATE Individual_application set tablet_sync_sts=? where application_no=?',
                ['01', data.application_no],
                (txObj, resultSet) => {
                  console.log('Update successful');
                },
                (txObj, error) => {
                  reject(error);
                  console.error('Update error:', error);
                },
              );
            });
          }
          if (response.data.guarantee) {
            if (response.data.guarantee[0] && response.data.guarantee[0].errMsg) {
              const error = {
                form: 'guarantee',
                message: response.data.guarantee[0].errMsg,
              };
              failedData.push(error);
            } else {
              //1
              global.db.transaction(tx => {
                tx.executeSql(
                  'UPDATE Guarantee set tablet_sync_sts=? where application_no=?',
                  ['01', response.data.guarantee[0].application_no],
                  (txObj, resultSet) => {
                    console.log('Update successful');
                  },
                  (txObj, error) => {
                    reject(error);
                    console.error('Update error:', error);
                  },
                );
              });
            }
          }

          if (response.data.approvalRequests) {
            if (
              response.data.approvalRequests[0] &&
              response.data.approvalRequests[0].errMsg
            ) {
              const error = {
                form: 'approvalRequests',
                message: response.data.approvalRequests[0].errMsg,
              };
              failedData.push(error);
            } else {
              //1
              global.db.transaction(tx => {
                tx.executeSql(
                  'UPDATE Exception_aprv set tablet_sync_sts=? where application_no=?',
                  ['01', response.data.approvalRequests[0].application_no],
                  (txObj, resultSet) => {
                    console.log('Update successful');
                  },
                  (txObj, error) => {
                    reject(error);
                    console.error('Update error:', error);
                  },
                );
              });
            }
          }
        }
      } else {
        const applicationNo = data.application_no;
        let individual_loan_data = {
          id: data.id,
          statusCode: '01',
          createUserId: user_id,
          updateUserId: data.update_user_id,
          productType: data.product_type, //not null
          channelDeviceType: '00110',
          openBranchCode: user_id, //not null
          openUserId: user_id, //not null
          mngtBranchCode: user_id, //not null
          mngtUserId: user_id,
          applicationNo: data.application_no,
          groupAplcNo: '',
          tabletAplcNo: '',
          referAplcNo: '',
          loanType: data.loan_type,
          cstNewExistFlg: data.cst_new_exist_flg, //1==Y
          loanCycle: data.loan_cycle,
          applicationAmt: 1000000.0,
          applicationDate: data.application_date,
          loantermCnt: data.loanterm_cnt, //not null
          borrowerName: 'jj', //data.borrower_name
          customerNo: data.customer_no,
          loanCode: data.loan_code,
          savingAcctNum: data.saving_acct_num,
          gender: data.gender,
          birthDate: data.birth_date,
          maritalStatus: data.marital_status,
          residentRgstId: data.resident_rgst_id,
          telNo: data.tel_no,
          mobileTelNo: data.mobile_tel_no,
          positionTitleNm: data.position_title_nm,
          addr: data.addr,
          businessOwnType: data.business_own_type,
          coCustomerNo: data.co_customer_no,
          coBrwerName: data.co_brwer_name,
          workplaceName: data.workplace_name,
          workplaceType: data.workplace_type,
          workplaceAddr: data.workplace_addr,
          landOwnType: '',
          totSaleIncome: data.tot_sale_income,
          totSaleExpense: data.tot_sale_expense,
          rawmaterialExpans: data.rawmaterial_expans,
          wrkpRentExpns: data.wrkp_rent_expns,
          employeeExpns: data.employee_expns,
          trnsrtExpns: data.trnsrt_expns,
          goodsLossExpns: data.goods_loss_expns,
          othrExpns1: data.othr_expns_1,
          othrExpns2: data.othr_expns_2,
          totBusNetIncome: data.tot_bus_net_income,
          fmlyTotIncome: data.fmly_tot_income,
          fmlyTotExpense: data.fmly_tot_expense,
          foodExpns: data.fmly_tot_expense,
          houseMngtExpns: data.house_mngt_expns,
          utlbilExpns: data.utlbil_expns,
          edctExpns: data.edct_expns,
          healthyExpns: data.healthy_expns,
          financeExpns: data.finance_expns,
          fmlyOtrExpns: data.fmly_otr_expns,
          fmlyTotNetIncome: data.fmly_tot_net_income,
          totNetIncome: data.fmly_tot_net_income,
          remark: data.remark,
          tabletSyncSts: '00',
          syncSts: '00',
          pastLoanAmount: data.past_loan_amount,
          pastLoanRating: data.past_loan_rating,
          pastCreditEmplNm: data.past_credit_empl_nm,
          oldApplicationNo: data.old_application_no,
          loanLimitAmt: data.loan_limit_amt,
          sysOrganizationCode: '1000',
          organizationCode: '1000',
          restFlag: 'Y',
          transactionDate: '2023-05-07',
          serialNo: '',
          //not include to server
          birth_date: data.birth_date,
          borrower_age: data.borrower_age,
          borrower_id_no: data.borrower_id_no,
          borrower_name: data.borrowerf_name,
          borrower_rltn: data.borrower_rltn,
          branch_code: data.branch_code,
          bus_utlbil_expns: data.bus_utlbil_expns,
          business_good_yn: data.business_good_yn,
          business_sttn_flg: data.business_sttn_flg,
          check_phone_num_yn: data.check_phone_num_yn,
          city_code: data.city_code,
          city_name: data.city_name,
          co_brwer_birth_dt: data.co_brwer_birth_dt,
          co_brwer_business: data.co_brwer_business,
          co_brwer_mble_tel_no: data.co_brwer_mble_tel_no,
          co_brwer_net_income: data.co_brwer_net_income,
          co_brwer_rgst_id: data.co_brwer_rgst_id,
          co_brwer_tel_no: data.co_brwer_tel_no,
          co_occupation: data.co_occupation,
          contract_no: data.contract_no,
          create_datetime: data.create_datetime,
          curr_resident_date: data.curr_resident_date,
          curr_workplace_date: data.curr_workplace_date,
          curr_workplace_perd: data.curr_workplace_perd,
          decision_no: data.decision_no,
          delete_datetime: data.delete_datetime,
          delete_user_id: data.delete_user_id,
          employee_no: data.employee_no,
          employee_num: data.employee_num,
          entry_date: data.entry_date,
          family_num: data.family_num,
          group_aplc_no: data.group_aplc_no,
          have_fixed_asset: data.have_fixed_asset,
          hghschl_num: data.hghschl_num,
          house_ocpn_type: data.house_ocpn_type,
          interest_rate: data.interest_rates,
          loan_charge: data.loan_charges,
          land_scale: data.land_scale,
          loan_officer_cmnt: data.loan_officer_cmnt,
          loan_status_code: data.loan_status_code,
          location_code: data.location_code,
          location_name: data.location_name,
          // mngt_user_id: data.mngt_user_id,
          ohtr_own_property: data.ohtr_own_property,
          otr_mfi_nm: data.otr_mfi_nm,
          own_property_estmtd_val: data.own_property_estmtd_val,
          past_loan_cycle: data.past_loan_cycle,
          pastdue_month_cnt: data.pastdue_month_cnt,
          position_title_code: data.position_title_code,
          prmn_empl_expns: data.prmn_empl_expns,
          prop_apartment_yn: data.prop_apartment_yn,
          prop_car_yn: data.prop_car_yn,
          prop_farmland_yn: data.prop_farmland_yn,
          prop_house_yn: data.prop_house_yn,
          prop_machines_yn: data.prop_machines_yn,
          prop_motorcycle_yn: data.prop_motorcycle_yn,
          property_kind: data.property_kind,
          address_type: data.address_type
        };

        console.log('individual_loan_data', individual_loan_data);

        const guaranteeData = await fetchGuaranteeData(applicationNo);

        let gurantor_data = guaranteeData.map(item => {
          return {
            organizationCode: item.organization_code,
            serialNo: item.serial_no,
            statusCode: '01',
            createUserId: user_id,
            updateUserId: item.update_user_id,
            tabletAplcNo: item.tablet_aplc_no,
            applicationNo: item.application_no,
            guaranteeNo: item.guarantee_no,
            tabletGuaranteeNo: item.tablet_guarantee_no,
            guaranteeDate: item.guarantee_date,
            guarantorNo: item.guarantor_no,
            guarantorNm: item.guarantor_nm,
            maritalStatus: item.marital_status,
            gender: item.gender,
            residentRgstId: item.resident_rgst_id,
            telNo: item.tel_no,
            addr: item.addr,
            borrowerRltn: item.borrower_rltn,
            relationPeriod: item.relation_period,
            houseOcpnType: item.house_ocpn_type,
            businessOwnType: item.business_own_type,
            workplaceName: item.workplace_name,
            workplaceType: item.workplace_type,
            workplacePeriod: item.workplace_period,
            employeeNum: item.employee_num,
            workplaceAddr: item.workplace_addr,
            landScale: item.land_scale,
            landOwnType: item.land_own_type,
            tabletSyncSts: '00',
            syncSts: '00',
          };
        });

        const areaevaluation = await fetchAreaEvaluation(applicationNo);
        let area_data = areaevaluation.map(item => {
          return {
            organizationCode: '',
            serialNo: '',
            statusCode: '01',
            createUserId: user_id,
            updateUserId: user_id,
            tabletAreaEvltNo: '',
            areaEvaluationNo: item.area_evaluation_no,
            areaEvaluationDate: item.area_evaluation_date,
            tabletAplcNo: '',
            applicationNo: item.application_no,
            townshipName: item.township_name,
            villageName: item.village_name,
            authName: item.auth_name,
            contractNo: item.contract_no,
            streetText: item.street_text,
            householdsText: item.households_text,
            populationText: item.population_text,
            houseText: item.house_text,
            houseOwnText: item.house_own_text,
            houseRentText: item.house_rent_text,
            propertyText: item.property_text,
            propertyDocmText: item.property_docm_text,
            occupation: item.occupation,
            mfiNumFlag: item.mf_num_flag,
            mfiRemark: item.mfi_remark,
            pastdueStsFlag: item.pastdue_sts_flag,
            pastdueStsRemark: item.pastdue_sta_remark,
            trnsrtStsFlag: item.trnsrt_sts_flag,
            trnsrtStsRemark: item.trnsrt_sts_remark,
            chnlDeviceType: '00110',
            tabletSyncSts: '00',
            syncSts: '',
            areaSecurityFlag: item.area_security_flag,
            areaSecurityRemark: item.area_security_remark,
            cmncStsFlag: item.cmnc_sts_flag,
            cmncStsRemark: item.cmnc_sts_remark,
            economyStsFlag: item.economy_sts_flag,
            economyStsRemark: item.economy_sts_remark,
            incomeStsFlag: item.income_sts_flag,
            incomeStsRemark: item.income_sts_remark,
            householdsStsFlag: item.households_sts_flag,
            householdsStsRemark: item.households_sts_remark,
            localAuthSprtFlag: item.local_auth_sprt_flag,
            localAuthSprtRmrk: item.local_auth_sprt_rmrk,
            totalStsFlag: item.total_sts_flag,
            totalStsRemark: item.total_sts_remark,
            totalRemark: item.total_remark,
            prepareEmplNm: item.prepare_empl_nm,
            checkEmplNm: item.check_empl_nm,
            summary: item.summary,
          };
        });
        const exception_aprv = await fetchExceptionAprv(applicationNo);
        let approval_request_data = exception_aprv.map(item => {
          return {
            organizationCode: '',
            serialNo: '',
            statusCode: '01',
            createUserId: user_id,
            updateUserId: user_id,
            tabletExcptAprvRqstNo: '',
            excptAprvRqstNo: item.excpt_aprv_rqst_no,
            tabletGroupAplcNo: '',
            groupAplcNo: item.group_aplc_no,
            tabletAplcNo: '',
            applicationNo: item.application_no,
            exceptionRqstDate: item.exception_rqst_date,
            borrowerName: item.borrower_name,
            applicationAmt: parseInt(item.application_amt),
            birthDate: item.birth_date,
            borrowerAge: parseInt(item.borrower_age),
            groupMemberNum: parseInt(item.group_member_num),
            occupation: item.occupation,
            netIncome: parseInt(item.net_income),
            excptAprvRsn1: item.excpt_aprv_rsn_1,
            excptAprvRsn2: item.excpt_aprv_rsn_2,
            excptAprvRsn3: item.excpt_aprv_rsn_3,
            exceptionReason: item.exception_reason,
            recommendNm: item.recommend_nm,
            tabletSyncSts: '00',
            syncSts: '00',
          };
        });

        const relation_info = await fetchRelationInfo(applicationNo);
        let relation_data = relation_info.map(item => {
          return {
            organizationCode: '',
            serialNo: '',
            statusCode: '01',
            createUserId: user_id,
            updateUserId: item.update_user_id,
            relationNo: item.relation_no,
            tabletGuaranteeNo: '',
            applicationNo: item.application_no,
            transactionDate: item.transaction_date,
            borrowerName: item.borrower_name,
            addr: item.addr,
            residentRgstId: item.resident_rgst_id,
            coBrwerName: item.co_brwer_name,
            coBrwerRgstId: item.co_brwer_rgst_id,
            grandparentYn: item.grandparent_yn == 1 ? 'Y' : 'N',
            parentYn: item.parent_yn == 1 ? 'Y' : 'N',
            brotherSisterYn: item.brother_sister_yn == 1 ? 'Y' : 'N',
            husbandWifeYn: item.husband_wife_yn == 1 ? 'Y' : 'N',
            sonDaughterYn: item.son_daughter_yn == 1 ? 'Y' : 'N',
            tabletSyncSts: '00',
            syncSts: '',
            relationName: item.relation_name,
          };
        });

        let formData = new FormData();
        formData.append(
          'individualApplication',
          JSON.stringify([individual_loan_data]),
        );
        formData.append('guarantee', JSON.stringify(gurantor_data));
        formData.append('areaEvaluation', JSON.stringify(area_data));
        formData.append('relationInfo', JSON.stringify(relation_data));
        formData.append(
          'approvalRequests',
          JSON.stringify(approval_request_data),
        );
        if (data.borrower_sign) {
          let borrower_sign_form_data = new FormData();
          borrower_sign_form_data.append('description', 'anything');
          borrower_sign_form_data.append('file', {
            uri: `file://${data.borrower_sign}`,
            type: 'image/jpg',
            name: data.borrower_sign,
          });
          console.log('borrower_sign_form_data', borrower_sign_form_data);
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://${ip}:${port}/skylark-m3s/file/upload.m3s`,
            headers: {
              Cookie:
                'JSESSIONID=0KelytuY8bGOetOcT9iWeIDnpb5zOeBR68hMOxG7.desktop-3jeqpa9',
              'Content-Type': 'multipart/form-data',
            },
            data: borrower_sign_form_data,
          };

          axios
            .request(config)
            .then(response => {
              console.log('img response', response.status);
              // console.log(JSON.stringify(response.data));
            })
            .catch(error => {
              // alert('Borrower Sign fail upload')
              const errorData = {
                form: 'individualApplication',
                message: 'Borrower Sign fail upload',
              };
              failedData.push(errorData);
              console.log(error);
            });
        }
        if (data.co_borrower_sign) {
          let co_borrower_sign_form_data = new FormData();
          co_borrower_sign_form_data.append('description', 'anything');
          co_borrower_sign_form_data.append('file', {
            uri: `file://${data.co_borrower_sign}`,
            type: 'image/jpg',
            name: data.co_borrower_sign,
          });

          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://${ip}:${port}/skylark-m3s/file/upload.m3s`,
            headers: {
              Cookie:
                'JSESSIONID=0KelytuY8bGOetOcT9iWeIDnpb5zOeBR68hMOxG7.desktop-3jeqpa9',
              'Content-Type': 'multipart/form-data',
            },
            data: co_borrower_sign_form_data,
          };

          axios
            .request(config)
            .then(response => {
              console.log('img response', response.status);
              // console.log(JSON.stringify(response.data));
            })
            .catch(error => {
              alert('Co Borrower Sign fail upload');
              console.log(error);
            });
        }
        const fileExists = await RNFS.exists(
          `/storage/emulated/0/Pictures/RNSketchCanvas/${data.application_no}MP01.jpg`,
        );
        if (fileExists) {
          let indi_borrower_map = new FormData();
          indi_borrower_map.append('description', 'anything');
          indi_borrower_map.append('file', {
            uri: `file:///storage/emulated/0/Pictures/RNSketchCanvas/${data.application_no}MP01.jpg`,
            type: 'image/jpg',
            name: `/storage/emulated/0/Pictures/RNSketchCanvas/${data.application_no}MP01.jpg`,
          });

          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://${ip}:${port}/skylark-m3s/file/upload.m3s`,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            data: indi_borrower_map,
          };

          axios
            .request(config)
            .then(response => {
              console.log('img response', response.status);
              // console.log(JSON.stringify(response.data));
            })
            .catch(error => {
              alert('Individual borrower map fail upload');
              console.log('image error', error);
              failedData.push('Individual borrower map fail upload');
            });
        }

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `https://${ip}:${port}/skylark-m3s/api/individualLoan.m3s`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            'cache-control': 'no-cache',
            // processData: false,
            // contentType: false,
          },
        };
        const response = await axios.request(config);

        if (
          response.data.individualApplication &&
          response.data.individualApplication[0].errMsg
        ) {
          const error = {
            form: 'individualApplication',
            message: response.data.individualApplication[0].errMsg,
          };
          failedData.push(error);
        } else {
          //1
          successCount++;
          global.db.transaction(tx => {
            tx.executeSql(
              'UPDATE Individual_application set tablet_sync_sts=? where application_no=?',
              ['01', data.application_no],
              (txObj, resultSet) => {
                console.log('Update successful');
              },
              (txObj, error) => {
                reject(error);
                console.error('Update error:', error);
              },
            );
          });
        }
        if (response.data.guarantee) {
          if (response.data.guarantee[0] && response.data.guarantee[0].errMsg) {
            const error = {
              form: 'guarantee',
              message: response.data.guarantee[0].errMsg,
            };
            failedData.push(error);
          } else {
            //1
            global.db.transaction(tx => {
              tx.executeSql(
                'UPDATE Guarantee set tablet_sync_sts=? where application_no=?',
                ['01', response.data.guarantee[0].application_no],
                (txObj, resultSet) => {
                  console.log('Update successful');
                },
                (txObj, error) => {
                  reject(error);
                  console.error('Update error:', error);
                },
              );
            });
          }
        }

        if (response.data.approvalRequests) {
          if (
            response.data.approvalRequests[0] &&
            response.data.approvalRequests[0].errMsg
          ) {
            const error = {
              form: 'approvalRequests',
              message: response.data.approvalRequests[0].errMsg,
            };
            failedData.push(error);
          } else {
            //1
            global.db.transaction(tx => {
              tx.executeSql(
                'UPDATE Exception_aprv set tablet_sync_sts=? where application_no=?',
                ['01', response.data.approvalRequests[0].application_no],
                (txObj, resultSet) => {
                  console.log('Update successful');
                },
                (txObj, error) => {
                  reject(error);
                  console.error('Update error:', error);
                },
              );
            });
          }
        }
      }


    }
    console.log('failedData', failedData);
    if (failedData.length > 0) {
      return failedData;
    } else {
      for (const data of checkedItems) {
        await new Promise((resolve, reject) => {
          global.db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM Individual_application WHERE application_no = ? AND tablet_sync_sts = '01'`,
              [data.application_no],
              (txObj, resultSet) => {
                console.log('Delete from Individual_application successful');
                resolve();
              },
              (txObj, error) => {
                console.error(
                  'Delete from Individual_application error:',
                  error,
                );
                reject(error);
              },
            );
          });
        });

        await new Promise((resolve, reject) => {
          global.db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM Exception_aprv WHERE application_no = ? AND tablet_sync_sts = '01'`,
              [data.application_no],
              (txObj, resultSet) => {
                console.log('Delete from Exception_aprv successful');
                resolve();
              },
              (txObj, error) => {
                console.error('Delete from Exception_aprv error:', error);
                reject(error);
              },
            );
          });
        });
        await new Promise((resolve, reject) => {
          global.db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM Guarantee WHERE application_no = ? AND tablet_sync_sts = '01'`,
              [data.application_no],
              (txObj, resultSet) => {
                console.log('Delete from Guarantee successful');
                resolve();
              },
              (txObj, error) => {
                console.error('Delete from Guarantee error:', error);
                reject(error);
              },
            );
          });
        });
        await new Promise((resolve, reject) => {
          global.db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM Relation_info WHERE application_no = ? AND tablet_sync_sts = '01'`,
              [data.application_no],
              (txObj, resultSet) => {
                console.log('Delete from Relation_info successful');
                resolve();
              },
              (txObj, error) => {
                console.error('Delete from Relation_info error:', error);
                reject(error);
              },
            );
          });
        });
      }
      return 'success';
    }
  } catch (error) {
    console.log('Axios error', error);
    return error;
    // Alert.alert('out Error', 'Axios error occurred.');
  }
};

const fetchGuaranteeData = async applicationNo => {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        `SELECT *
        FROM Guarantee WHERE application_no = ?`,
        [applicationNo],
        (tx, results) => {
          resolve(results.rows.raw());
        },
        (tx, error) => {
          console.log('error', error);
          reject(error);
        },
      );
    });
  });
};

const fetchIndiloanData = async group_aplc_no => {
  console.log('group_aplc_no', group_aplc_no);
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        `SELECT *
        FROM Individual_application WHERE group_aplc_no = ?`,
        [group_aplc_no],
        (tx, results) => {
          console.log('results', results);
          if (results.rows.length > 0) {
            resolve(results.rows.raw());
          } else {
            // Handle the case when no rows are found
            resolve([]); // You can resolve with an empty array or handle it differently based on your requirement
          }

        },
        (tx, error) => {
          console.log('error', error);
          reject(error);
        },
      );
    });
  });
};
const fetchAreaEvaluation = async applicationNo => {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        `SELECT *
      FROM Area_evaluation WHERE application_no = ? `,
        [applicationNo],
        (tx, results) => {
          resolve(results.rows.raw());
        },
        (tx, error) => {
          console.log('error', error);
          reject(error);
        },
      );
    });
  });
};

const fetchExceptionAprv = async applicationNo => {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        `SELECT *
      FROM Exception_aprv WHERE application_no = ? `,
        [applicationNo],
        (tx, results) => {
          resolve(results.rows.raw());
        },
        (tx, error) => {
          console.log('error', error);
          reject(error);
        },
      );
    });
  });
};
const fetchRelationInfo = async applicationNo => {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        `SELECT *
      FROM Relation_info WHERE application_no = ? `,
        [applicationNo],
        (tx, results) => {
          resolve(results.rows.raw());
        },
        (tx, error) => {
          console.log('error', error);
          reject(error);
        },
      );
    });
  });
};
export const updateLoanData = async loan_data => {
  const user_id = await AsyncStorage.getItem('user_id');
  return new Promise(async (resolve, reject) => {
    try {
      global.db.transaction(trans => {
        trans.executeSql(
          `UPDATE Individual_application set serial_no =?, application_no =?, group_aplc_no =?, status_code =?, create_datetime =?, create_user_id =?, delete_datetime =?, delete_user_id =?, update_datetime =?, update_user_id =?, loan_status_code =?, decision_no =?, contract_no =?, product_type =?, channel_device_type =?, open_branch_code =?, open_user_id =?, mngt_branch_code =?, mngt_user_id =?, loan_type =?, cst_new_exist_flg =?, loan_cycle =?, application_amt =?, application_date =?, loanterm_cnt =?, borrower_name =?, customer_no =?, loan_code =?, saving_acct_num =?, gender =?, birth_date =?, marital_status =?, resident_rgst_id =?, tel_no =?, mobile_tel_no =?, employee_no =?, entry_date =?, position_title_nm =?, position_title_code =?, branch_code =?, salary_rating_code =?, addr =?, family_num =?, hghschl_num =?, university_num =?, students_cnt =?, curr_resident_perd =?, house_ocpn_type =?, business_own_type =?, co_customer_no =?, co_brwer_name =?, co_brwer_birth_dt =?, co_brwer_rgst_id =?, co_brwer_tel_no =?, co_brwer_mble_tel_no =?, borrower_rltn =?, co_occupation =?, workplace_name =?, workplace_type =?, workplace_period =?, employee_num =?, workplace_addr =?, curr_workplace_perd =?, business_sttn_flg =?, land_scale =?, land_own_type =?, tot_sale_income =?, tot_sale_expense =?, rawmaterial_expans =?, wrkp_rent_expns =?, employee_expns =?, prmn_empl_expns =?, tmpy_empl_expns =?, trnsrt_expns =?, bus_utlbil_expns =?, tel_expns =?, tax_expns =?, goods_loss_expns =?, othr_expns_1 =?, othr_expns_2 =?, tot_bus_net_income =?, fmly_tot_income =?, fmly_tot_expense =?, food_expns =?, house_mngt_expns =?, utlbil_expns =?, edct_expns =?, healthy_expns =?, fmly_trnsrt_expns =?, fmly_tax_expns =?, finance_expns =?, fmly_otr_expns =?, fmly_tot_net_income =?, tot_net_income =?, otr_mfi_loan_cnt =?, otr_mfi_nm =?, remark =?, borrower_id_no =?, borrower_age =?, have_fixed_asset =?, co_brwer_business =?, co_brwer_net_income =?, property_kind =?, prop_apartment_yn =?, prop_house_yn =?, prop_car_yn =?, prop_motorcycle_yn =?, prop_machines_yn =?, prop_farmland_yn =?, ohtr_own_property =?, tot_prop_estmtd_val =?, own_property_estmtd_val =?, past_loan_cycle =?, pastdue_month_cnt =?, past_loan_rating =?, past_loan_amount =?, past_credit_empl_nm =?, check_phone_num_yn =?, reputation_yn =?, business_good_yn =?, real_property_yn =?,
        repayment_history_yn =?, loan_officer_cmnt =?, tablet_sync_sts =?, sync_sts =?, old_application_no =?, transaction_date =?, loan_limit_amt =?, curr_resident_date =?, workplace_date =?, curr_workplace_date =?, err_msg =?, interest_rates =?, loan_charges =?, city_code =?, city_name =?, township_code =?, township_name =?, village_code =?, village_name =?, ward_code =?, ward_name =?, location_code =?, location_name =?, borrower_sign =?, co_borrower_sign =?, borrower_map =?, address_type =? WHERE application_no = ? `,
          [
            loan_data.serial_no, //serialNo
            loan_data.application_no,
            loan_data.group_aplc_no, //group_aplc_no
            loan_data.status_code, //statusCode
            loan_data.create_datetime, //create Date Time
            loan_data.create_user_id,
            loan_data.delete_datetime, //deleteDatetime
            loan_data.delete_user_id, //delet usr id
            loan_data.update_datetime, //updateDatetime
            loan_data.update_user_id, //updateUserID
            loan_data.loan_status_code, //loanStatusCode
            //
            loan_data.decision_no, //Decison No
            loan_data.contract_no, //contract no
            loan_data.product_type, // product type
            loan_data.channel_device_type, //Channel Device type
            loan_data.open_branch_code, //open branch code
            loan_data.open_user_id, //Open user id
            loan_data.mngt_branch_code, //mngt_branch_code
            loan_data.mngt_user_id, //mngt_user_id
            loan_data.loan_type, //20
            loan_data.cst_new_exist_flg,
            loan_data.loan_cycle,
            loan_data.application_amt,
            loan_data.application_date, //application_date,
            loan_data.loanterm_cnt,
            //Borrowe Info
            loan_data.borrower_name,
            loan_data.customer_no,
            loan_data.loan_code,
            loan_data.saving_acct_num,
            loan_data.gender,
            loan_data.birth_date,
            loan_data.marital_status,
            loan_data.resident_rgst_id,
            loan_data.tel_no,
            loan_data.mobile_tel_no, //mobile tel no
            loan_data.employee_no, //employee_no,
            loan_data.entry_date, //entry_date,
            loan_data.position_title_nm, //position_title_nm,
            loan_data.position_title_code, //position_title_code,
            loan_data.branch_code, //branch code //40
            loan_data.salary_rating_code, //salary rating code
            loan_data.addr,
            loan_data.family_num,
            loan_data.hghschl_num, //hghschl_num,
            loan_data.university_num, //university_num,
            loan_data.students_cnt, //students_cnt,
            loan_data.curr_resident_perd,
            loan_data.house_ocpn_type,
            loan_data.business_own_type,
            //Co Bower
            loan_data.co_customer_no,
            loan_data.co_brwer_name,
            loan_data.co_brwer_birth_dt,
            loan_data.co_brwer_rgst_id,
            loan_data.co_brwer_tel_no,
            loan_data.co_brwer_mble_tel_no, //co_brwer_mble_tel_no
            loan_data.borrower_rltn,
            loan_data.co_occupation,
            //Business info
            loan_data.workplace_name,
            loan_data.workplace_type,
            loan_data.workplace_period, //60
            loan_data.employee_num,
            // loan_data.busutlbilexpns,
            loan_data.workplace_addr,
            loan_data.curr_workplace_perd,
            loan_data.business_sttn_flg,
            loan_data.land_scale,
            loan_data.land_own_type,
            //Monthly Income
            loan_data.totSaleIncome,
            loan_data.totSaleExpense,
            loan_data.rawmaterialExpans,
            loan_data.wrkpRentExpns,
            loan_data.employeeExpns,
            loan_data.prmn_empl_expns, //prmn_empl_expns
            loan_data.tmpy_empl_expns, //tmpy_empl_expns
            loan_data.trnsrtExpns,
            loan_data.busutlbilexpns,
            loan_data.telExpns,
            loan_data.taxExpns,
            loan_data.goodsLossExpns,
            loan_data.othrExpns1,
            loan_data.othrExpns2, //80
            loan_data.totBusNetIncomeitem, //check
            loan_data.fmlyTotIncome,
            loan_data.fmlyTotExpense,
            loan_data.foodExpns,
            loan_data.houseMngtExpns,
            loan_data.utlbilExpns,
            loan_data.edctExpns,
            loan_data.healthyExpns,
            loan_data.fmlyTrnsrtExpns,
            loan_data.fmlyTaxExpns,
            loan_data.financeExpns,
            loan_data.fmlyOtrExpns,
            loan_data.fmlyTotNetIncome,
            loan_data.totalnet,
            loan_data.otr_mfi_loan_cnt, //otr_mfi_loan_cnt
            loan_data.otr_mfi_nm, //otr_mfi_nm
            loan_data.remark,
            loan_data.borrower_id_no, //borrower_id_no
            loan_data.borrower_age, //borrower_age
            loan_data.have_fixed_asset, //have_fixed_asset //100
            loan_data.co_brwer_business, //co_brwer_business
            loan_data.co_brwer_net_income, //co_brwer_net_income
            null, //property_kind
            null, //prop_apartment_yn
            null, //prop_house_yn
            null, //prop_car_yn
            null, //prop_motorcycle_yn
            null, //prop_machines_yn
            null, //prop_farmland_yn
            null, //ohtr_own_property
            null, //tot_prop_estmtd_val
            null, //own_property_estmtd_val
            null, //past_loan_cycle
            null, //pastdue_month_cnt
            null, //past_loan_rating
            null, //past_loan_amount
            null, //past_credit_empl_nm
            null, //check_phone_num_yn
            null, //reputation_yn
            null, //business_good_yn //120
            null, //real_property_yn
            null, //repayment_history_yn
            null, //loan_officer_cmnt
            loan_data.tablet_sync_sts, //tablet_sync_sts
            loan_data.sync_sts, //
            null, //old_application_no
            null, //transaction_date (Date)
            loan_data.loan_limit_amt,
            loan_data.curr_resident_date, //curr_resident_date
            null, //workplace_date //130
            null, //curr_workplace_date
            null, //132
            loan_data.interest_rates,
            loan_data.loan_charges,
            loan_data.city_code,
            loan_data.city_name,
            loan_data.township_code,
            loan_data.township_name,
            loan_data.village_code,
            loan_data.village_name,
            loan_data.ward_code,
            loan_data.ward_name,
            loan_data.location_code,
            loan_data.location_name,
            loan_data.borrower_sign, //borrower sign
            loan_data.co_borrower_sign,
            loan_data.borrower_map,
            loan_data.address_type,
            loan_data.application_no,
            // loan_data.borrower_map,
            //146
          ],

          (trans, results) => {
            resolve('success');
            console.log('success', results);
          },
          error => {
            reject(error);
            alert(error);
          },
        );
      });
    } catch (error) {
      reject(error);
    }
  });
};
