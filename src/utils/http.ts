import axios from 'axios'

import type {
    AxiosInstance,
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosResponse
} from 'axios'

// 1.定义后端返回的标准数据结构
interface ApiResponse<T = any> {
    code: number;
    data: T;
    message: string;
}

// 2.创建axios实例
const service: AxiosInstance = axios.create({
    // 使用环境变量中的BASE URL
    baseURL: import.meta.env.VITE_API_BASE_URL as string,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

// 3.请求拦截(Request Interceptor)
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 在请求头中添加token，鉴权。。
        const token = localStorage.getItem('token')
        if (token) {
            // 这里的 Authorization header 格式需根据后端要求调整
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

// 4.响应拦截 (Response Interceptor)
service.interceptors.response.use(
    (response: AxiosResponse) => {
        // 解构出相应主体
        const res = response.data as ApiResponse<any>
        // 根据code判断请求是否成功
        if (res.code === 200) {
            return res.data
        } else {
            // 处理业务错误 (如: 密码错误, 参数校验失败)
            console.error(`业务错误: ${res.message}`);
            // 这里可以接入 ElementPlus 或 AntDesign 的 Message 组件提示
            // ElMessage.error(res.message || '系统错误');

            return Promise.reject(new Error(res.message || 'Error'));
        }
    },
    (error: AxiosError) => {
        // 处理 HTTP 状态码错误
        let message = '';
        const status = error.response?.status;

        switch (status) {
            case 401:
                message = 'Token 过期，请重新登录';
                // 可以在这里执行登出逻辑，跳转路由等
                break;
            case 403:
                message = '拒绝访问 (403)';
                break;
            case 404:
                message = '请求路径未找到 (404)';
                break;
            case 500:
                message = '服务器内部错误 (500)';
                break;
            default:
                message = '网络异常';
        }

        console.error(message);
        // ElMessage.error(message);
        return Promise.reject(error);
    }
)


// 5.导出axios实例
export default service
