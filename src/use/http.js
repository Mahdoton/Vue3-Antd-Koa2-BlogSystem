import axios from "axios";



// 发出请求前进行拦截
axios.interceptors.request.use(
  config => {
    config.baseURL = "/api";
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config;
  },
  err => Promise.reject(err)
)


const isDEV = process.env.NODE_ENV === "development";


// 接收响应前做出拦截
axios.interceptors.response.use(
  res => {
    // console.log(res);
    return res.data;
  },
  err => {
    // 如果是开发环境 才打印错误
    // 生产环境中 不会进行打印  在打包之后就不会打印错误了
    if (isDEV) {
      console.log(err.response.data);
    }
    // 返回更详细的错误原因
    return Promise.reject(err.response.data);
  }
)

// 1s之后再发起请求
export const lazyRequest = (request, deply = 1000) => {
  const promise = new Promise(resolve => {
    setTimeout(resolve, deply);
  })
  return Promise.all([request, promise]);
}


export default axios;