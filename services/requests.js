import axios from "axios";
import { getAxiosConfig } from "./interseptors";

export const pages = {
    postLogin: async (params) => {
        const res = await getAxiosConfig().post('/account/login', params);
        return res.data;
    },
 
 
};
