import router from '@/router'
import { componentsPlugin } from "./components.js"

/**
 * 插件集
 * @type {import("vue").Plugin[]} 
 * */

const plugins = [router, componentsPlugin];


/**
 * 批量注册插件
 * @param {import("vue").App} app
 */
// export const usePlugins = app => plugins.forEach(plugin => app.use(plugin), app);
export const usePlugins = app => plugins.forEach(app.use, app);