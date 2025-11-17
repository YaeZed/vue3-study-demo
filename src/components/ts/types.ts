// types.ts
export interface TreeNodeData {
    id: string;
    label: string;
    children?: TreeNodeData[]; // 关键：children 数组的类型是它自身
}