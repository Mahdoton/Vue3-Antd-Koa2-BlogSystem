import { Button, Avatar, Tag, Card, Pagination, Timeline, Form, Input } from "ant-design-vue"

/**
 * 组件集
 * @type {import("vue").components[]} 
 * */
const components = [Button, Avatar, Tag, Card, Pagination, Timeline, Form, Input];

/**
 * 批量注册组件
 * @param {import("vue").App} app
 */
export const componentsPlugin = app => components.forEach(app.use, app)