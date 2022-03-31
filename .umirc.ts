import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component:'@/pages/Layout/index',
      routes: [
        {
          path: '/home',
          name: '首页',
        },
        {
          path: '/rank',
          name: '排行榜',
        },
        {
          path: '/search',
          name: '发现',
          component: '@/pages/Search/index'
        },
        {
          path: '/look',
          name: '关注',
          routes: [
            {
              path: '/look/users',
              name: '订阅',
              // component: '@/pages/Dashboard/Analysis'
            },
            {
              path: '/look/collect',
              // icon:'StarOutlined',//v5取消了二级菜单图标，应为要加载3M的图标库
              name: '喜欢=》点赞/收藏',
              // component: '@/pages/Dashboard/Analysis'
            },
          ],
        },

        {
          path: 'user',
          name: '个人中心',
          routes: [
            {
              path: 'upload',
              name: '上传/发布',
              component: '@/pages/User/UpLoadImage/index'
            },
            {
              path: 'record',
              name: '动态/足迹/消息',
              component: '@/pages/User/Record/index'
            },
            {
              path: 'info',
              name: '个人信息',
              component: '@/pages/User/UserInfo/index'
            },
          ],
        },
        // { component: '@/pages/404' },
      ],
    },
  ],



  fastRefresh: {},
  mfsu : {},
  webpack5:{},
});
