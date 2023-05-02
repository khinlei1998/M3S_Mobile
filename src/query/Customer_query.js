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
                                `INSERT INTO Customer (serial_no,customer_no,customer_nm,status_code,create_datetime,create_user_id,delete_datetime,delete_user_id,update_datetime,update_user_id,resident_rgst_id,employee_no,branch_code,entry_date,position_title_nm,salary_rating_code,gender,birth_date,marital_status,saving_acct_num,tel_no,mobile_tel_no,addr,curr_resident_perd,occupation,father_name,family_num,hghschl_num,university_num,house_ocpn_type,remark,business_own_type,prop_apartment_yn,prop_house_yn,prop_car_yn,prop_motorcycle_yn,prop_machines_yn,prop_farmland_yn,prop_other_yn,tot_prop_estmtd_val,ohtr_own_property,otr_prop_estmtd_val,workplace_name,workplace_type,workplace_period,employee_num,workplace_addr,curr_workplace_perd,business_sttn_flg,land_scale,land_own_type,otr_income,tot_sale_income,tot_sale_expense,rawmaterial_expans,wrkp_rent_expns,employee_expns,prmn_empl_expns,tmpy_empl_expns,trnsrt_expns,bus_utlbil_expns,tel_expns,tax_expns,goods_loss_expns,othr_expns_1,othr_expns_2,tot_bus_net_income,fmly_tot_income,fmly_tot_expense,food_expns,house_mngt_expns,utlbil_expns,edct_expns,healthy_expns,fmly_tax_expns,fmly_trnsrt_expns,finance_expns,fmly_otr_expns,fmly_tot_net_income,tablet_sync_sts,sync_sts,nrc_state_code,nrc_prefix_code,nrc_no,curr_resident_date,workplace_date,curr_workplace_date,err_msg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                                [
                                    item.serialNo,
                                    item.customerNo,
                                    item.customerNm,
                                    item.statusCode,
                                    item.createDatetime,
                                    item.createUserId,
                                    item.deleteDatetime,
                                    item.deleteUserId,
                                    item.entryDate,
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
                                    item.addr,
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
                                    item.otrPropEstmtdVal,
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
                                    item.currWorkplacePerd,
                                    item.totSaleExpense,
                                    item.rawmaterialExpans,
                                    item.wrkpRentExpns,
                                    item.employeeExpns,
                                    item.prmnEmplExpns,
                                    item.tmpyEmplExpns,
                                    item.financeExpns,
                                    item.fmlyOtrExpns,
                                    item.fmlyTotNetIncome,
                                    item.syncSts,
                                    item.nrcStateCode,
                                    item.nrcPrefixCode,
                                    item.nrcNo,
                                    null, //cur resident date
                                    null, //curr workplace date
                                    null, //errro msg

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
