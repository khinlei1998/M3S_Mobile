import axios from "axios";

export const fetchData = (controller,setController) => {
  controller.abort();
  const newController = new AbortController();
  setController(newController);
  axios
    .get(
      'https://68a8-103-231-92-121.ngrok-free.app/skylark-m3s/api/employees.m3s',
      {
        //   cancelToken: source.token,
        signal: newController.signal,
      },
    )
    .then(response => {
      console.log('Response:', response.data);
      // Handle the data here
    })
    .catch(error => {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error);
      } else {
        console.log('smth');
        // handle error
      }
    });
};
