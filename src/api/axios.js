// axios.js

import axios from 'axios';

// 创建一个Axios实例
const instance = axios.create({
  baseURL: "/api", // 根据实际情况设置基础URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json', // 设置请求头
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 可以在这里添加token等全局配置
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    return response.data;
  },
  (error) => {
    // 对响应错误做些什么
    return Promise.reject(error);
  }
);

export default instance;
