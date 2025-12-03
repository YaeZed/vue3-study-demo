import service from "../utils/http";

// 定义接口返回类型
interface UserInfo {
    id: number;
    username: string;
    email: string;
    role: string[];
}

// 登录接口的类型
interface LoginParams {
    username: string;
    password: string;
}

// 导出API方法
// <UserInfo> 表示：我们期望后端返回的这个 Promise 解析出来的数据是 UserInfo 类型
export const getUserInfo = () => {
    return service.get<any, UserInfo>('/user/info');
}

export const login = (data: LoginParams) => {
    //{token:string} 表示：内联类型，这个接口请求成功后，返回的数据是一个对象，里面必定包含一个叫 token 的字符串。
    return service.post<any, { token: string }>('/auth/login', data);
}