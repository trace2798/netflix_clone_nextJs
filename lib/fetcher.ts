// The fetcher function uses the axios library to make an HTTP GET request to the URL provided as input. 
//It then returns a Promise that resolves to the response data obtained from the server.

import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;
