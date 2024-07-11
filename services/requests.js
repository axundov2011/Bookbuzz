import axios from "axios";
import { getAxiosConfig } from "./interseptors";

const loginPages = {
    postLogin: (params) => axios.post('/api/v1/account/login', params)
  };
  
  export { loginPages };