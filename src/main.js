import { createApp } from 'vue'
import App from './App.vue'
import { usePlugins } from '@/plugins';

const app = createApp(App);
// 设置全局富文本变量
app.config.globalProperties.editor = null;
usePlugins(app);
app.mount('#app');
