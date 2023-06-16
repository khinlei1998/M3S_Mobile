import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
  global.db.transaction((trans) => {
    trans.executeSql(sql, params, (trans, results) => {
      resolve(results);
      console.log('delet Beneficiary Data', results);
    },
      (error) => {
        reject(error);
        console.log('error', error);
      });
  });
});
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

export function getIndividual_loan() {
  return new Promise(async (resolve, reject) => {
    let ip = await AsyncStorage.getItem('ip');
    let port = await AsyncStorage.getItem('port');
    const batchSize = 100;
    global.db.transaction(tx => {
      tx.executeSql('DELETE FROM Individual_application', [], (tx, results) => {
        axios
          // .get(`https://${newIP}/skylark-m3s/api/employees.m3s`)
          .get(`https://${ip}:${port}/skylark-m3s/api/individualLoans.m3s`)
          .then(({ data }) => {
            if (data.length > 0) {
              let insertedRows = 0;
              global.db.transaction(tx => {
                for (let i = 0; i < data.length; i += batchSize) {
                  const records = data.slice(i, i + batchSize);
                  records.forEach(item => {
                    tx.executeSql(
                      `INSERT INTO Individual_application (serial_no,application_no,group_aplc_no,status_code,create_datetime,create_user_id,delete_datetime,delete_user_id,update_datetime,update_user_id,loan_status_code,decision_no,contract_no,product_type,channel_device_type,open_branch_code,open_user_id,mngt_branch_code,mngt_user_id,loan_type,cst_new_exist_flg,loan_cycle,application_amt,application_date,loanterm_cnt,borrower_name,customer_no,loan_code,saving_acct_num,gender,marital_status,resident_rgst_id,tel_no,mobile_tel_no,employee_no,entry_date,position_title_nm,position_title_code,branch_code,salary_rating_code,addr,family_num,hghschl_num,university_num,students_cnt,curr_resident_perd,house_ocpn_type,business_own_type,co_customer_no,co_brwer_name,co_brwer_birth_dt,co_brwer_rgst_id,co_brwer_tel_no,co_brwer_mble_tel_no,borrower_rltn,co_occupation,workplace_name,workplace_type,workplace_period,employee_num,workplace_addr,curr_workplace_perd,business_sttn_flg,land_scale,land_own_type,tot_sale_income,tot_sale_expense,rawmaterial_expans,wrkp_rent_expns,employee_expns,prmn_empl_expns,tmpy_empl_expns,trnsrt_expns,bus_utlbil_expns,tel_expns,tax_expns,goods_loss_expns,othr_expns_1,othr_expns_2,tot_bus_net_income,fmly_tot_income,fmly_tot_expense,food_expns,house_mngt_expns,utlbil_expns,edct_expns,healthy_expns,fmly_trnsrt_expns,fmly_tax_expns,finance_expns,fmly_otr_expns,fmly_tot_net_income,tot_net_income,otr_mfi_loan_cnt,otr_mfi_nm,remark,borrower_id_no,borrower_age,have_fixed_asset,co_brwer_business,co_brwer_net_income,property_kind,prop_apartment_yn,prop_house_yn,prop_car_yn,prop_motorcycle_yn,prop_machines_yn,prop_farmland_yn,ohtr_own_property,tot_prop_estmtd_val,own_property_estmtd_val,past_loan_cycle,pastdue_month_cnt,past_loan_rating,past_loan_amount,past_credit_empl_nm,check_phone_num_yn,reputation_yn,business_good_yn,real_property_yn,repayment_history_yn,loan_officer_cmnt,tablet_sync_sts,sync_sts,old_application_no,transaction_date,loan_limit_amt,curr_resident_date,workplace_date,curr_workplace_date,err_msg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                      [
                        item.serialNo,
                        item.applicationNo,
                        item.groupAplcNo,
                        item.statusCode,
                        item.createDatetime,
                        item.createUserId,
                        item.deleteDatetime,
                        item.deleteUserId,
                        item.updateDatetime,
                        item.updateUserId,
                        null,
                        null,
                        null, //13
                        item.productType,
                        item.channelDeviceType,

                        item.openBranchCode,
                        item.openUserId,
                        item.mngtBranchCode,
                        item.mngtUserId,
                        item.loanType,
                        item.cstNewExistFlg,
                        item.loanCycle,
                        item.applicationAmt,
                        item.applicationDate,

                        item.loantermCnt,
                        item.borrowerName,
                        item.customerNo, //27

                        item.loanCode,
                        item.savingAcctNum,
                        item.gender,
                        item.birthDate,
                        item.maritalStatus,
                        item.residentRgstId,
                        item.telNo,
                        item.mobileTelNo,
                        null,
                        item.entryDate,
                        item.positionTitleNm,
                        item.branchCode,
                        item.salaryRatingCode, //40
                        item.addr,
                        null,
                        item.hghschlNum,
                        item.universityNum,
                        item.studentCnt,
                        item.currResidentPerd,
                        item.houseOcpnType,
                        item.businessOwnType,
                        item.coCustomerNo,
                        item.coBrwerName,
                        item.coBrwerBirthDt,
                        item.coBrwerBirthDt,
                        item.coBrwerRgstId,
                        item.coBrwerTelNo,
                        item.coBrwerMbleTelNo,
                        item.borrowerRltn,
                        item.coOccupation,
                        item.workplaceName,
                        item.workplaceType,
                        item.workplacePeriod,
                        item.employeeNum,
                        item.workplaceAddr,
                        item.currWorkplacePerd,
                        null,
                        item.landScale,
                        item.landOwnType,
                        item.totSaleIncome,
                        item.totSaleExpense,
                        item.rawmaterialExpans,
                        item.wrkpRentExpns,
                        item.employeeExpns,
                        null,
                        null,
                        item.trnsrtExpns,
                        null,
                        null,
                        null,
                        item.goodsLossExpns,
                        item.othrExpns1,
                        item.othrExpns2, //80
                        item.totBusNetIncome,
                        item.fmlyTotIncome,
                        item.fmlyTotExpense,
                        item.foodExpns,
                        item.houseMngtExpns,
                        item.utlbilExpns,
                        item.edctExpns,
                        item.healthyExpns,
                        null,
                        null,
                        item.financeExpns,
                        item.fmlyOtrExpns,
                        item.totNetIncome,
                        null,
                        null,
                        item.remark,
                        null,
                        item.age,
                        null,
                        null, //100
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
                        item.pastLoanCycle,
                        item.pastdueMonthCnt,
                        item.pastLoanRating,
                        item.pastLoanAmount,
                        item.pastCreditEmplNm,
                        null,
                        null,
                        null,
                        null, //120
                        null,
                        null,
                        item.tabletSyncSts,
                        item.syncSts,
                        null,
                        null,
                        item.loanLimitAmt,
                        null,
                        null,
                        null,
                        null, //131
                      ],
                      (tx, results) => {
                        // If insert query succeeds, resolve the promise
                        // console.log('Employee Insert success', results.rowsAffected);
                        console.log('length', data.length);

                        insertedRows += results.rowsAffected;
                        console.log('insertedRows>>>>', insertedRows);
                        if (insertedRows === data.length) {
                          resolve('success');
                          console.log('All loan records inserted successfully');
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

export const storeLoanData = async loan_data => {
  const user_id = await AsyncStorage.getItem('user_id');
  return new Promise(async (resolve, reject) => {
    try {
      global.db.transaction(trans => {
        trans.executeSql(
          `INSERT INTO Individual_application (serial_no,application_no,group_aplc_no,status_code,create_datetime,create_user_id,delete_datetime,delete_user_id,update_datetime,update_user_id,loan_status_code,decision_no,contract_no,product_type,channel_device_type,open_branch_code,open_user_id,mngt_branch_code,mngt_user_id,loan_type,cst_new_exist_flg,loan_cycle,application_amt,application_date,loanterm_cnt,borrower_name,customer_no,loan_code,saving_acct_num,gender,birth_date,marital_status,resident_rgst_id,tel_no,mobile_tel_no,employee_no,entry_date,position_title_nm,position_title_code,branch_code,salary_rating_code,addr,family_num,hghschl_num,university_num,students_cnt,curr_resident_perd,house_ocpn_type,business_own_type,co_customer_no,co_brwer_name,co_brwer_birth_dt,co_brwer_rgst_id,co_brwer_tel_no,co_brwer_mble_tel_no,borrower_rltn,co_occupation,workplace_name,workplace_type,workplace_period,employee_num,workplace_addr,curr_workplace_perd,business_sttn_flg,land_scale,land_own_type,tot_sale_income,tot_sale_expense,rawmaterial_expans,wrkp_rent_expns,employee_expns,prmn_empl_expns,tmpy_empl_expns,trnsrt_expns,bus_utlbil_expns,tel_expns,tax_expns,goods_loss_expns,othr_expns_1,othr_expns_2,tot_bus_net_income,fmly_tot_income,fmly_tot_expense,food_expns,house_mngt_expns,utlbil_expns,edct_expns,healthy_expns,fmly_trnsrt_expns,fmly_tax_expns,finance_expns,fmly_otr_expns,fmly_tot_net_income,tot_net_income,otr_mfi_loan_cnt,otr_mfi_nm,remark,borrower_id_no,borrower_age,have_fixed_asset,co_brwer_business,co_brwer_net_income,property_kind,prop_apartment_yn,prop_house_yn,prop_car_yn,prop_motorcycle_yn,prop_machines_yn,prop_farmland_yn,ohtr_own_property,tot_prop_estmtd_val,own_property_estmtd_val,past_loan_cycle,pastdue_month_cnt,past_loan_rating,past_loan_amount,past_credit_empl_nm,check_phone_num_yn,reputation_yn,business_good_yn,real_property_yn,
          repayment_history_yn,loan_officer_cmnt,tablet_sync_sts,sync_sts,old_application_no,transaction_date,loan_limit_amt,curr_resident_date,workplace_date,curr_workplace_date,err_msg,interest_rates,loan_charges,city_code,city_name,township_code,township_name,village_code,village_name,ward_code,ward_name,location_code,location_name,borrower_sign,co_borrower_sign) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            null, //serialNo
            loan_data.application_no,
            null, //group_aplc_no
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
            loan_data.product_type,
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
            null,//employee_no,
            null,//entry_date,
            null,//position_title_nm,
            null,//position_title_code,
            null, //branch code //40
            null, //salary rating code
            loan_data.addr,
            loan_data.family_num,
            loan_data.hghschl_num,//hghschl_num,
            loan_data.university_num,//university_num,
            null,//students_cnt,
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
            loan_data.co_borrower_sign

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
    if (borrowerImagePath) {
      try {
        await deleteImageFile(borrowerImagePath);
        console.log('Borrower image deleted successfully:', borrowerImagePath);
      } catch (error) {
        console.error('Error deleting borrower image:', error);
        // Display an alert indicating the error
        alert('Error deleting borrower image');
      }
    }

    // Delete the co-borrower image if it exists
    if (coBorrowerImagePath) {
      try {
        await deleteImageFile(coBorrowerImagePath);
        console.log('Co-borrower image deleted successfully:', coBorrowerImagePath);
      } catch (error) {
        console.error('Error deleting co-borrower image:', error);
        // Display an alert indicating the error
        alert('Error deleting co-borrower image');
      }
    }

    return new Promise((resolve, reject) => {
      global.db.transaction(tx => {
        tx.executeSql(
          "DELETE FROM Individual_application WHERE id = ?",
          [data.id],
          (txObj, resultSet) => {
            console.log('resultSet', resultSet);
            resolve('success');
            // Delete query successful
            console.log('Delete successful');
          },
          (txObj, error) => {
            // Error occurred while executing the delete query
            console.error('Delete error:', error);
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
export function UploadLoanData(loan_data) {
  return new Promise(async (resolve, reject) => {
    const failedData = [];
    let ip = await AsyncStorage.getItem('ip');
    let port = await AsyncStorage.getItem('port');

    try {
      for (var i = 0; i < loan_data.length; i++) {
        const data = [loan_data[i]];

        await axios
          .post(
            `https://https://d131-103-231-92-92.ngrok-free.app/skylark-m3s/api/individualLoan.m3s`,
            data,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .then(response => {
            console.log('response', response.data[0].errMsg);
            // if (response.data[0].errMsg) {
            //   failedData.push(response.data[0].customerNm);
            // } else {
            //   global.db.transaction(tx => {
            //     tx.executeSql(
            //       'UPDATE Customer set tablet_sync_sts=? where id=?',
            //       ['01', response.data[0].id],
            //       (txObj, resultSet) => {
            //         console.log('Update successful');
            //       },
            //       (txObj, error) => {
            //         reject(error);
            //         console.error('Update error:', error);
            //       },
            //     );
            //   });
            // }
          })
          .catch(error => {
            console.log('axios error', error);
            Alert.alert('Error', 'Axios error occurred.');
            reject(error);
            return; // Stop further execution of the loop
          });
      }

      console.log('failedData', failedData);
      if (failedData.length > 0) {
        Alert.alert(
          'Error',
          `Failed to upload ${failedData.length} data items:\n${JSON.stringify(
            failedData,
          )}`,
        );
        resolve('error');
      } else {
        Alert.alert('Success', 'All data successfully uploaded.');
        resolve('success');
      }
    } catch (error) {
      alert(error);
      reject(error);
      console.log('error', error);
    }
  });
}

export async function getAllLoan_By_application_no() {
  console.log('getAllLoan_By_application_no');
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        `SELECT *
        FROM Individual_application AS IA
        LEFT JOIN Guarantee AS T1 ON IA.application_no = T1.application_no
        LEFT JOIN Area_evaluation AS T2 ON IA.application_no = T2.application_no
        LEFT JOIN Exception_aprv AS T3 ON IA.application_no = T3.application_no
        LEFT JOIN Relation_info AS T4 ON IA.application_no = T4.application_no`,
        [],
        (tx, results) => {
          console.log('results', results);
          const rows = results.rows.raw();
          let data = new FormData();

          const test = data.append('individualApplication',
            [{ "statusCode": "01", "createUserId": "M00110", "updateUserId": "M00110", "productType": "", "channelDeviceType": "" }])
          console.log('test', test);
          const individualApplication = rows.map(row => console.log('row', row)({

          }));
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
