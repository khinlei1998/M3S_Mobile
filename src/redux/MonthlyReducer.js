export const UPDATE_TOTAL_SUM = 'UPDATE_TOTAL_SUM';

const initialState = {
    totalSum: 0,
};

// export const updateTotalSum = (sum) => ({
//     console.log(su);
//     type: 'UPDATE_TOTAL_SUM',
//     payload: sum,
// });
export const updateTotalSum = props => {
    console.log(props);
    return {
      type: 'UPDATE_TOTAL_SUM',
      payload: props,
    };
  };

export default function MonthlyReducder(state = initialState, action) {
    switch (action.type) {
        case UPDATE_TOTAL_SUM:
            return { ...state, totalSum: action.payload, };

        default:
            return state;
    }
}