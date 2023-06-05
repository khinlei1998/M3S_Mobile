import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
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
          .then(({data}) => {
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


