// Set config defaults when creating the instance
import axios, {type AxiosInstance} from "axios";

const myAxios : AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api'
});

myAxios.defaults.withCredentials=true;//携带请求凭证

// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
    console.log("我要发请求了",config);
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
    console.log("我收到响应了",response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

// interface BaseResponse {
//     code: number;
//     data: T;
//     message: string;
//     description: string;
// }
// declare module 'axios'{
//     export interface AxiosResponse extends BaseResponse {
//     }
// }
export default myAxios;




