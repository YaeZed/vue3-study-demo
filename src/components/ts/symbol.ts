// 定义key
import type { InjectionKey, Ref } from "vue";

// 定义数据接口
export interface UserInfo {
    id: number;
    name: string;
}

// 1.定义update函数的类型
export type UpdateUserFunction = (newName: string) => void

// 2.定义InjectionKey
// key1用于传递响应式对象
export const UserKey: InjectionKey<Ref<UserInfo>> = Symbol('userKey')
// key2用于传递update函数
export const UpdateUserKey: InjectionKey<UpdateUserFunction> = Symbol('updateUserKey')