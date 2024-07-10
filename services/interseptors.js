import axios from "axios";
import { baseURL } from "@/services/api";
import { parseCookies } from "nookies"; 

export const axiosConfig = {
    baseURL,
    timeout: 200000,
};

export const getAxiosConfig = (token) => {
    const { access_token } = parseCookies();

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*"
    };

    if (access_token && token) {
        headers["Authorization"] = "Bearer " + access_token;
    }

    const instance = axios.create({
        ...axiosConfig,
        headers,
    });

    instance.interceptors.request.use(
        (config) => {
            return config;
        },
        (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
        async (response) => {
            return response;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
};
