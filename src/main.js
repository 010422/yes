// 替换 import 为 require
const Vue = require('vue');
const VueGtag = require('vue-gtag');
const App = require('./App.vue').default; // 如果使用 Vue 组件，记得加 .default
const router = require('./router');
const store = require('./store');
const i18n = require('@/locale');
require('@/assets/icons');
require('@/utils/filters');
require('./registerServiceWorker');
const { dailyTask } = require('@/utils/common');
require('@/assets/css/global.scss');
const NProgress = require('nprogress');
require('@/assets/css/nprogress.css');

// 重置应用的函数
window.resetApp = () => {
  localStorage.clear();
  indexedDB.deleteDatabase('yesplaymusic');
  document.cookie.split(';').forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
  return '已重置应用，请刷新页面（按Ctrl/Command + R）';
};

console.log(
  '如出现问题，可尝试在本页输入 %cresetApp()%c 然后按回车重置应用。',
  'background: #eaeffd;color:#335eea;padding: 4px 6px;border-radius:3px;',
  'background:unset;color:unset;'
);

// 使用 VueGtag 插件
Vue.use(
  VueGtag,
  {
    config: { id: 'G-KMJJCFZDKF' },
  },
  router
);

Vue.config.productionTip = false;

// 配置 NProgress
NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

// 执行每日任务
dailyTask();

// 创建 Vue 实例
new Vue({
  i18n,
  store,
  router,
  render: h => h(App),
}).$mount('#app');
