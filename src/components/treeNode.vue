<template>
  <div class="tree-node">
    <div class="node-label">{{ node.label }}</div>

    <!-- 可选链操作符?.：如果 node.children 存在且有值，则渲染子节点列表，否则返回undefined，隐式转换为false -->
    <ul v-if="node?.children?.length" class="children-list">
      <li v-for="child in node.children" :key="child.id">
        <!-- 递归 -->
        <treeNode :node="child" @click.stop="handleClick" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { TreeNodeData } from "./ts/types";
// 接收父组件传递的参数
const props = defineProps<{
  node: TreeNodeData;
}>();
console.log(props);

const handleClick = (e: TreeNodeData) => {
  console.log(e.target);
};
// 子组件增加一个script 定义组件名称为了 递归用
/*
  关于组件名称：
  （推荐）
  在 <script setup> 模式下，组件的“名称”默认是其文件名（例如 'treeNode'）。
  因此，Vue 编译器在解析模板时，能正确识别 <treeNode> 就是在引用当前组件自身。

  如果需要显式命名（例如文件名和组件标签名不同），
  可以额外添加一个 <script> 块：
    export default {
      name: 'TreeItem' // 模板中就可以用 <TreeItem>
    }
      TreeItem 其实就是当前组件 通过import 把自身又引入了一遍 如果他没有children 了就结束
*/
</script>

<style scoped>
.tree-node {
  margin-left: 20px;
}
.node-label {
  font-weight: bold;
}
.children-list {
  list-style-type: none;
  padding-left: 15px;
  border-left: 1px dashed #ccc;
}
</style>
