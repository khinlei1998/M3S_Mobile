import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import moment from 'moment';
import { connection_name } from '../common';
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
    // sql = `SELECT * FROM Customer  WHERE ${selectedColumn} LIKE '%${searchTerm}% ORDER BY customer_no DESC'`;
    sql = `SELECT * FROM Customer WHERE  ${selectedColumn} LIKE '%${searchTerm}%' ORDER BY customer_no DESC`;
  } else {
    sql = 'SELECT * FROM Customer ORDER BY customer_no DESC';
  }
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        sql,
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

export function getCustomer_info(tokensource) {
  return new Promise(async (resolve, reject) => {
    let ip = await AsyncStorage.getItem('ip');
    let port = await AsyncStorage.getItem('port');
    const batchSize = 100;
    global.db.transaction(tx => {
      tx.executeSql('DELETE FROM Customer', [], (tx, results) => {
        axios
          .get(
            `${connection_name}://${ip}:${port}/skylark-m3s/api/customers.m3s`,
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
                      `INSERT INTO Customer (serial_no,customer_no,customer_nm,status_code,create_datetime,create_user_id,delete_datetime,delete_user_id,update_datetime,update_user_id,resident_rgst_id,employee_no,branch_code,entry_date,position_title_nm,salary_rating_code,gender,birth_date,maritalStatus,saving_acct_num,tel_no,mobile_tel_no,addr,curr_resident_perd,occupation,father_name,family_num,hghschl_num,university_num,house_ocpn_type,remark,business_own_type,prop_apartment_yn,prop_house_yn,prop_car_yn,prop_motorcycle_yn,prop_machines_yn,prop_farmland_yn,prop_other_yn,tot_prop_estmtd_val,ohtr_own_property,otr_prop_estmtd_val,workplace_name,workplace_type,workplace_period,employee_num,workplace_addr,curr_workplace_perd,business_sttn_flg,land_scale,land_own_type,otr_income,tot_sale_income,tot_sale_expense,rawmaterial_expans,wrkp_rent_expns,employee_expns,prmn_empl_expns,tmpy_empl_expns,trnsrt_expns,bus_utlbil_expns,tel_expns,tax_expns,goods_loss_expns,othr_expns_1,othr_expns_2,tot_bus_net_income,fmly_tot_income,fmly_tot_expense,food_expns,house_mngt_expns,utlbil_expns,edct_expns,healthy_expns,fmly_tax_expns,fmly_trnsrt_expns,finance_expns,fmly_otr_expns,fmly_tot_net_income,tablet_sync_sts,sync_sts,nrc_state_code,nrc_prefix_code,nrc_no,curr_resident_date,workplace_date,curr_workplace_date,err_msg,postal_code,total_net,city_code,city_name,ts_code,ts_name,village_code,village_name,ward_code,ward_name,addressType,business_period_status,curr_business_date_status,village_status,start_living_date_status,nrc_type,location_code,location_name,open_branch_code) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
                        item.propApartmentYn == 'Y' ? '1' : '',
                        item.propHouseYn == 'Y' ? '1' : '',
                        item.propCarYn == 'Y' ? '1' : '',
                        item.propMotorcycleYn == 'Y' ? '1' : '',
                        item.propMachinesYn == 'Y' ? '1' : '',
                        item.propFarmlandYn == 'Y' ? '1' : '',
                        item.propOtherYn == 'Y' ? '1' : '',
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
                        item.telExpns,
                        item.taxExpns,
                        item.goodsLossExpns,
                        item.othrExpns1,
                        item.othrExpns2,
                        item.totBusNetIncome,
                        item.fmlyTotIncome,
                        item.fmlyTotExpense,
                        item.foodExpns, //71
                        item.houseMngtExpns,
                        item.utlbilExpns,
                        item.edctExpns,
                        item.healthyExpns,
                        item.fmlyTaxExpns,
                        item.fmlyTrnsrtExpns,
                        item.financeExpns,
                        item.fmlyOtrExpns,
                        item.fmlyTotNetIncome,
                        item.tabletSyncStsitem, //81
                        item.syncStsitem,
                        item.nrcStateCode,
                        item.nrcPrefixCode,
                        item.nrcNo,
                        item.currResidentDate,
                        item.workplaceDate,
                        item.currWorkplaceDate, //cur wrk date
                        null, //err_msg
                        null, //postal_code
                        null, //total_net
                        item.cityCode, //city_code
                        null,
                        item.townshipCode,
                        null,
                        item.villageCode,
                        null,
                        item.wardCode,
                        null,
                        item.addressType, //address type
                        '2', //business_period_status
                        '2', //curr businee date status
                        null, //village status
                        '2', //start_living_date_status
                        null, //nrc_type
                        item.locationCode, //location code
                        null, //location name
                        null, //open branch code
                      ],
                      (tx, results) => {
                        // If insert query succeeds, resolve the promise
                        insertedRows += results.rowsAffected;
                        if (insertedRows === data.length) {
                          // resolve('success');
                          resolve({response:'success',sizeInBytes})
                          console.log(
                            'All Customer records inserted successfully',
                          );
                        }
                      },
                      error => {
                        console.log('Customer error', error);
                        reject(error);
                        // If insert query fails, rollback the transaction and reject the promise
                        // tx.executeSql('ROLLBACK', [], () => {
                        //   reject(error);
                        // });
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
              reject(error);
            }
          });
      });
    });
  });
}

export const checkDataExists = dataToCheck => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Perform the SELECT query
      tx.executeSql(
        'SELECT * FROM Customer WHERE resident_rgst_id = ?',
        [dataToCheck],
        (tx, results) => {
          // Check if any matching records were found
          const rowCount = results.rows.length;
          const dataExists = rowCount > 0;

          resolve(dataExists);
        },
        error => {
          reject(error);
        },
      );
    });
  });
};

export function storeCustomerData(cus_data) {
  return new Promise(async (resolve, reject) => {
    const user_id = await AsyncStorage.getItem('user_id');
    const date = moment().format();

    try {
      const dataExists = await checkDataExists(cus_data.resident_rgst_id);
      if (dataExists) {
        // Data already exists, handle it as needed
        alert('NRC No already exist');
        throw new Error('Data already exists in the database');
      } else {
        global.db.transaction(
          trans => {
            trans.executeSql(
              `INSERT INTO Customer (serial_no,customer_no,customer_nm,status_code,create_datetime,create_user_id,delete_datetime,delete_user_id,update_datetime,update_user_id,resident_rgst_id,employee_no,branch_code,entry_date,position_title_nm,salary_rating_code,gender,birth_date,maritalStatus,saving_acct_num,tel_no,mobile_tel_no,addr,curr_resident_perd,occupation,father_name,family_num,hghschl_num,university_num,house_ocpn_type,remark,business_own_type,prop_apartment_yn,prop_house_yn,prop_car_yn,prop_motorcycle_yn,prop_machines_yn,prop_farmland_yn,prop_other_yn,tot_prop_estmtd_val,ohtr_own_property,otr_prop_estmtd_val,workplace_name,workplace_type,workplace_period,employee_num,workplace_addr,curr_workplace_perd,business_sttn_flg,land_scale,land_own_type,otr_income,tot_sale_income,tot_sale_expense,rawmaterial_expans,wrkp_rent_expns,employee_expns,prmn_empl_expns,tmpy_empl_expns,trnsrt_expns,bus_utlbil_expns,tel_expns,tax_expns,goods_loss_expns,othr_expns_1,othr_expns_2,tot_bus_net_income,fmly_tot_income,fmly_tot_expense,food_expns,house_mngt_expns,utlbil_expns,edct_expns,healthy_expns,fmly_tax_expns,fmly_trnsrt_expns,finance_expns,fmly_otr_expns,fmly_tot_net_income,tablet_sync_sts,sync_sts,nrc_state_code,nrc_prefix_code,nrc_no,curr_resident_date,workplace_date,curr_workplace_date,err_msg,postal_code,total_net,city_code,city_name,ts_code,ts_name,village_code,village_name,ward_code,ward_name,addressType,business_period_status,curr_business_date_status,village_status,start_living_date_status,nrc_type,location_code,location_name,open_branch_code) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,COALESCE(?,0),?,?,?,?,?,?,?,COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),?,?,?,?,?,?,?,?,?,?,COALESCE(?,0),?,COALESCE(?,0),?,?,COALESCE(?,0),COALESCE(?,0),?,?,?,COALESCE(?,0),?,COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),COALESCE(?,0),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
              [
                null, //cus_data.serialNo
                // cus_data.employeeNo,
                cus_data.CustomerNo,
                cus_data.employeeName, //customerNM
                '01', //statusCode
                date, //create Date Time
                user_id,
                null, //deleteDatetime
                null, //deleteUserId
                null, //updateDatetime
                user_id, //updateUserID
                cus_data.resident_rgst_id,
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
                null, //curr_resident_perd
                // 4,
                cus_data.occupation,
                null, //father name
                cus_data.familyNum,
                cus_data.hghschlNum, //0
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
                cus_data.propOtherYn, //40
                cus_data.totPropEstmtdVal,
                cus_data.ohtrOwnProperty,
                cus_data.otrPropEstmtdVal, //43
                //Business
                cus_data.workplaceName,
                cus_data.wokplaceType, //workplaceType
                null, //workplace_period
                cus_data.employeeNum, //employeeNum
                cus_data.workplaceAddr,
                null, //curr_workplace_perd
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
                null, //syncSts
                cus_data.nrc_state_code,
                cus_data.nrc_prefix_code,
                cus_data.nrcNo,
                cus_data.curr_resident_date, //curr_residen_date
                cus_data.workplace_date, //workplace date
                cus_data.curr_workplace_date, //curr_workplace_date
                null, //errror msg
                cus_data.postal_code, //90
                cus_data.totalnet,
                cus_data.city_code,
                cus_data.city_name,
                cus_data.ts_code,
                cus_data.ts_name,
                cus_data.village_code,
                cus_data.village_name,
                cus_data.ward_code,
                cus_data.ward_name,
                cus_data.addressType, //100
                cus_data.business_period_status,
                cus_data.curr_business_date_status,
                cus_data.village_status,
                cus_data.start_living_date_status,
                cus_data.nrc_type,
                cus_data.location_code, //location code
                cus_data.location_name, //location name
                user_id, //open_branch_code //108
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
          },
          error => {
            console.log('transaction error', error);
            reject(error);
          },
          () => {
            // Transaction successful
            resolve('success');
          },
        );
      }
    } catch (error) {
      reject(error);
    }
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
export async function filterCustomerByEmpno(selectedColumn, searchTerm) {
  let sql;
  if (selectedColumn && searchTerm) {
    sql = `SELECT * FROM Customer  WHERE  employee_no IS NOT NULL AND employee_no <> '' AND ${selectedColumn} LIKE '%${searchTerm}%'`;
  } else {
    sql = `SELECT * FROM Customer WHERE employee_no IS NOT NULL AND employee_no <> ''`;
  }
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, results) => {
          console.log('total result', results);
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

export function updateCustomerData(cus_data) {
  return new Promise(async (resolve, reject) => {
    global.db.transaction(trans => {
      trans.executeSql(
        `UPDATE Customer SET serial_no=?,customer_no =?,customer_nm =?,status_code=?,create_datetime =?,create_user_id =?,delete_datetime =?,delete_user_id =?,update_datetime =?,update_user_id =?,
        resident_rgst_id =?,employee_no =?,branch_code =?,entry_date =?,position_title_nm =?,salary_rating_code =?,gender =?,birth_date =?,maritalStatus =?,saving_acct_num =?,
        tel_no =?,mobile_tel_no =?,addr =?,curr_resident_perd =?,occupation =?,father_name =?,family_num =?,hghschl_num =?,university_num =?,house_ocpn_type =?,remark =?,business_own_type =?,prop_apartment_yn =?,prop_house_yn =?,prop_car_yn =?,prop_motorcycle_yn =?,prop_machines_yn =?,prop_farmland_yn =?,prop_other_yn =?,tot_prop_estmtd_val =?,ohtr_own_property =?,otr_prop_estmtd_val =?,workplace_name =?,workplace_type =?,workplace_period =?,employee_num =?,workplace_addr =?,curr_workplace_perd =?,business_sttn_flg =?,land_scale =?,land_own_type =?,otr_income =?,tot_sale_income =?,tot_sale_expense =?,rawmaterial_expans =?,wrkp_rent_expns =?,employee_expns =?,prmn_empl_expns =?,tmpy_empl_expns =?,trnsrt_expns =?,bus_utlbil_expns =?,tel_expns =?,tax_expns =?,goods_loss_expns =?,othr_expns_1 =?,othr_expns_2 =?,tot_bus_net_income =?,fmly_tot_income =?,fmly_tot_expense =?,food_expns =?,house_mngt_expns =?,utlbil_expns =?,edct_expns =?,healthy_expns =?,fmly_tax_expns =?,fmly_trnsrt_expns =?,finance_expns =?,fmly_otr_expns =?,fmly_tot_net_income =?,tablet_sync_sts =?,sync_sts =?,nrc_state_code =?,nrc_prefix_code =?,nrc_no =?,curr_resident_date =?,workplace_date =?,curr_workplace_date =?,err_msg =?,postal_code =?,total_net =?,city_code =?,city_name =?,ts_code =?,ts_name =?,village_code =?,village_name =?,ward_code =?,ward_name =?,addressType =?,business_period_status =?, curr_business_date_status =?, village_status =?,start_living_date_status =?,nrc_type =?, location_code =?, location_name=?,open_branch_code=? WHERE customer_no = ?`,
        [
          cus_data.serial_no, //cus_data.serialNo
          // cus_data.employeeNo,
          cus_data.customer_no,
          cus_data.customer_nm, //customerNM
          cus_data.status_code, //statusCode
          cus_data.create_datetime, //create Date Time
          cus_data.create_user_id,
          cus_data.delete_datetime, //deleteDatetime
          cus_data.delete_user_id,
          cus_data.update_datetime,
          cus_data.update_user_id,
          cus_data.resident_rgst_id,
          //
          cus_data.employee_no,
          cus_data.branch_code,
          cus_data.entry_date,
          cus_data.position_title_nm,
          cus_data.salary_rating_code,
          // Customer Base
          cus_data.gender,
          cus_data.birth_date,
          cus_data.maritalStatus,
          cus_data.saving_acct_num, //20
          cus_data.tel_no,
          cus_data.mobile_tel_no,
          cus_data.addr, //23
          cus_data.curr_resident_perd,
          cus_data.occupation,
          cus_data.father_name, //father name
          cus_data.family_num == '' ? 0 : cus_data.family_num,
          cus_data.hghschl_num == '' ? 0 : cus_data.hghschl_num,
          cus_data.university_num == '' ? 0 : cus_data.university_num,
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
          cus_data.tot_prop_estmtd_val == '' ? 0 : cus_data.tot_prop_estmtd_val,
          cus_data.ohtr_own_property,
          cus_data.otr_prop_estmtd_val == '' ? 0 : cus_data.otr_prop_estmtd_val, //43
          //Business
          cus_data.workplace_name,
          cus_data.workplace_type, //workplaceType
          null, //wrorkplace period
          cus_data.employee_num == '' ? 0 : cus_data.employee_num, //employeeNum

          cus_data.workplace_addr,
          cus_data.curr_workplace_date,
          cus_data.business_sttn_flg,
          cus_data.land_scale == '' ? 0 : cus_data.land_scale,
          cus_data.land_own_type,
          //Monthly Income
          cus_data.otr_income == '' ? 0 : cus_data.otr_income, //otrIncome
          cus_data.tot_sale_income == '' ? 0 : cus_data.tot_sale_income,
          cus_data.tot_sale_expense == '' ? 0 : cus_data.tot_sale_expense,
          cus_data.rawmaterial_expans == '' ? 0 : cus_data.rawmaterial_expans,
          cus_data.wrkp_rent_expns == '' ? 0 : cus_data.wrkp_rent_expns,
          cus_data.employee_expns == '' ? 0 : cus_data.employee_expns,
          cus_data.prmn_empl_expns == '' ? 0 : cus_data.prmn_empl_expns, //59 //prmnEmplExpns
          cus_data.tmpy_empl_expns == '' ? 0 : cus_data.tmpy_empl_expns, //tmpyEmplExpns
          cus_data.trnsrt_expns == '' ? 0 : cus_data.trnsrt_expns,
          cus_data.bus_utlbil_expns == '' ? 0 : cus_data.bus_utlbil_expns,
          cus_data.tel_expns == '' ? 0 : cus_data.tel_expns, //telExpnsitem
          cus_data.tax_expns == '' ? 0 : cus_data.tax_expns, //taxExpnsitem
          cus_data.goods_loss_expns == '' ? 0 : cus_data.goods_loss_expns, //goodsLossExpnsitem
          cus_data.othr_expns_1 == '' ? 0 : cus_data.othr_expns_1, //othrExpns1item
          cus_data.othr_expns_2 == '' ? 0 : cus_data.othr_expns_2, //othrExpns2item
          cus_data.totBusNetIncomeitem ? cus_data.totBusNetIncomeitem : 0, //totBusNetIncomeitem //auto cal
          cus_data.fmly_tot_income == '' ? 0 : cus_data.fmly_tot_income, //fmlyTotIncomeitem
          cus_data.fmly_tot_expense == '' ? 0 : cus_data.fmly_tot_expense, //fmlyTotExpenseitem //auto cal
          cus_data.food_expns == '' ? 0 : cus_data.food_expns, //71 //foodExpnsitem
          cus_data.house_mngt_expns == '' ? 0 : cus_data.house_mngt_expns, //houseMngtExpnsitem
          cus_data.utlbil_expns == '' ? 0 : cus_data.utlbil_expns,
          cus_data.edct_expns == '' ? 0 : cus_data.edct_expns, //edctExpnsitem
          cus_data.healthy_expns == '' ? 0 : cus_data.healthy_expns, //healthyExpnsitem
          cus_data.fmly_tax_expns == '' ? 0 : cus_data.fmly_tax_expns, //fmlyTaxExpnsitem
          cus_data.fmly_trnsrt_expns == '' ? 0 : cus_data.fmly_trnsrt_expns, //fmlyTrnsrtExpnsitem
          cus_data.finance_expns == '' ? 0 : cus_data.finance_expns, //financeExpnsitem
          cus_data.fmly_otr_expns == '' ? 0 : cus_data.fmly_otr_expns, //fmlyOtrExpnsitem
          cus_data.fmlyTotNetIncome ? cus_data.fmlyTotNetIncome : 0, //fmlyTotNetIncomeitem
          cus_data.tablet_sync_sts, //81 //tabletSyncStsitem
          cus_data.sync_sts, //syncStsitem
          cus_data.nrc_state_code,
          cus_data.nrc_prefix_code,
          cus_data.nrc_no,
          cus_data.curr_resident_date,
          cus_data.workplace_date,
          cus_data.curr_workplace_date,
          cus_data.err_msg,
          cus_data.postal_code,
          cus_data.totalnet,
          cus_data.city_code,
          cus_data.city_name,
          cus_data.ts_code,
          cus_data.ts_name,
          cus_data.village_code,
          cus_data.village_name,
          cus_data.ward_code,
          cus_data.ward_name,
          cus_data.addressType,
          cus_data.business_period_status,
          cus_data.curr_business_date_status,
          cus_data.village_status,
          cus_data.start_living_date_status,
          cus_data.nrc_type,
          cus_data.location_code, //location code
          cus_data.location_name,
          cus_data.open_branch_code,
          cus_data.customer_no,

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

function updateDateBySubtractingYears(dateProperty, yearsToSubtract) {
  if (!isNaN(yearsToSubtract)) {
    const currentYear = new Date().getFullYear();
    const subtractedYear = currentYear - yearsToSubtract;

    return `${subtractedYear}-01-01`;
  } else {
    console.log(`Invalid input for ${dateProperty}`);
    return '';
  }
}

export async function UploadCustomerData(customer_data) {
  const failedData = [];
  let ip = await AsyncStorage.getItem('ip');
  let port = await AsyncStorage.getItem('port');
  let user_id = await AsyncStorage.getItem('user_id');

  try {
    for (var i = 0; i < customer_data.length; i++) {
      const data = [customer_data[i]];

      // if (data.nrc_state_code) {
      const indexOfSlash = customer_data[i].nrc_state_code.indexOf('/');
      const state_code = customer_data[i].nrc_state_code.substring(
        0,
        indexOfSlash + 1,
      );
      customer_data[i].nrc_state_code = state_code;
      customer_data[i].prop_house_yn =
        customer_data[i].prop_house_yn == 1 ? 'Y' : '';
      customer_data[i].prop_motorcycle_yn =
        customer_data[i].prop_motorcycle_yn == 1 ? 'Y' : '';
      customer_data[i].prop_apartment_yn =
        customer_data[i].prop_apartment_yn == 1 ? 'Y' : '';
      customer_data[i].prop_machines_yn =
        customer_data[i].prop_machines_yn == 1 ? 'Y' : '';
      customer_data[i].prop_car_yn =
        customer_data[i].prop_car_yn == 1 ? 'Y' : '';
      customer_data[i].prop_farmland_yn =
        customer_data[i].prop_farmland_yn == 1 ? 'Y' : '';
      customer_data[i].curr_workplace_date = updateDateBySubtractingYears(
        'curr_workplace_date',
        parseInt(customer_data[i].curr_workplace_date),
      );
      customer_data[i].curr_resident_date = updateDateBySubtractingYears(
        'curr_resident_date',
        parseInt(customer_data[i].curr_resident_date),
      );
      customer_data[i].workplace_date = updateDateBySubtractingYears(
        'workplace_date',
        parseInt(customer_data[i].workplace_date),
      );
      customer_data[i].township_code = customer_data[i].ts_code;
      delete customer_data[i].ts_code;

      console.log('customer data', data);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${connection_name}://${ip}:${port}/skylark-m3s/api/customers.m3s`,
        data: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json', // Set the content type as JSON
          'cache-control': 'no-cache',
        },
      };
      const response = await axios.request(config);

      if (response.data[0].errMsg) {
        const error = {
          resident_rgst_id: response.data[0].residentRgstId,
          message: response.data[0].errMsg,
        };
        failedData.push(error);
      } else {
        global.db.transaction(tx => {
          tx.executeSql(
            'UPDATE Customer set tablet_sync_sts=? where id=?',
            ['01', response.data[0].id],
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

    if (failedData.length > 0) {
      return failedData;
    } else {
      return 'success';
    }
  } catch (error) {
    console.log('error', error);
    return error;
  }
}

export const updateTableSyncStatus = id => {
  return new Promise(async (resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        'UPDATE Customer set tablet_sync_sts=? where id=?',
        ['01', id],
        (txObj, resultSet) => {
          resolve('success');
          console.log('Update successful');
        },
        (txObj, error) => {
          reject(error);
          console.error('Update error:', error);
        },
      );
    });
  });
};
export async function deleteCustomer_ByID(id) {
  return new Promise((resolve, reject) => {
    global.db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM Customer WHERE id = ${id}`,
        [],
        (txObj, resultSet) => {
          resolve('success');
          // Delete query successful
          console.log('Delete successful');
        },
        (txObj, error) => {
          // Error occurred while executing the delete query
          console.error('Delete error:', error);
        },
      );
    });
  });
}
