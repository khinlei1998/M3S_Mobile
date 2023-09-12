export const CHANGE_SYNC_TIME = 'CHANGE_SYNC_TIME';
export const ADD_LAST_SYNC_DATE = 'ADD_LAST_SYNC_DATE';
import { getEemployee_info } from "../query/Employee_query";
import { getSurvey_Item } from "../query/SurveyItem_query";
import { getLoanMax } from "../query/LoanMax_query";
import { getCodeInfo } from "../query/CodeInfo_quey";
import { getCustomer_info } from "../query/Customer_query";
import { getNRC_info } from "../query/NRCinfo_query";
import { get_Village } from "../query/Village_query";
import { get_Township } from "../query/Township_query";
import { get_Ward } from "../query/Ward_query";
const sync_data = {
    download_data: [{
        id: 1,
        name: 'Employees',
        size: '0KB',
        last_sync_data: '-',
        checked: false,
        api: getEemployee_info,
    },
    {
        id: 2,
        name: 'Survey Items',
        size: '0KB',
        last_sync_data: '-',
        checked: false,
        api: getSurvey_Item,
    },
    {
        id: 3,
        name: 'Loan max limit',
        size: '0KB',
        last_sync_data: '-',
        checked: false,
        api: getLoanMax,
    },
    {
        id: 4,
        name: 'Codes',
        size: '0KB',
        last_sync_data: '-',
        checked: false,
        api: getCodeInfo,
    },
    {
        id: 5,
        name: 'Customer',
        size: '0KB',
        last_sync_data: '-',
        checked: false,
        api: getCustomer_info,
    },
    {
        id: 6,
        name: 'NRC Info',
        size: '0KB',
        last_sync_data: '-',
        checked: false,
        api: getNRC_info,
    },
    {
        id: 7,
        name: 'Village',
        size: '0KB',
        last_sync_data: '-',
        checked: false,
        api: get_Village,
    },
    {
        id: 8,
        name: 'Township',
        size: '0KB',
        last_sync_data: '-',
        checked: false,
        api: get_Township,
    },
    {
        id: 9,
        name: 'Ward',
        size: '0KB',
        last_sync_data: '-',
        checked: false,
        api: get_Ward,
    },],
    last_sync_date: ''
};

export const changeSyncTime = props => {
    return {
        type: 'CHANGE_SYNC_TIME',
        payload: props,
    };
};
export const addLastSyncDate = props => {
    return {
        type: 'ADD_LAST_SYNC_DATE',
        payload: props,
    };
};

export default function SynchronizationReducer(state = sync_data, action) {
    switch (action.type) {
        case CHANGE_SYNC_TIME:
            return { ...state, download_data: action.payload };
        case ADD_LAST_SYNC_DATE:
            return { ...state, last_sync_date: action.payload };
        default:
            return state;
    }
}
