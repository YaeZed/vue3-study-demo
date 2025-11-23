import mitt, { type Emitter } from "mitt";

// 1.定义事件类型
// key是事件名称，value是事件携带的数据类型
type Events = {
    'change-theme': string;// 切换主题事件
    'update-count': number;// 更新计数事件
    'user-login': {
        username: string;
        token: string;
    }// 复杂对象
}

// 2.创建emitter实例,并传入Events类型
const bus: Emitter<Events> = mitt<Events>();

// 3.导出bus实例
export default bus;