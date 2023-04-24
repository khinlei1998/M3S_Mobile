import axios from "axios";

export function getEemployee_info() {
    return new Promise((resolve, reject) => {

        axios.get(`https://cat-fact.herokuapp.com/facts/`, {

        })
            .then(({ data }) => {
                // Resolve the promise with the result
                resolve(data);

            })
            .catch(error => console.log("get_Ward_mb error :: ", error));


    });
};