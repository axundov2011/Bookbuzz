import { getAxiosConfig } from "./interseptors";

const loginPages = {
  postLogin: (params) => {
    const instance = getAxiosConfig();
    return instance.post('/account/login', params);
  },
};

export { loginPages };
