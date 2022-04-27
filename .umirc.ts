import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/Layout/index',
      routes: [
        {
          path: '/',
          redirect: '/home',
        },
        {
          path: '/home',
          name: '首页',
          component: '@/pages/Home/index',
        },
        {
          path: '/rank',
          name: '排行榜',
          component: '@/pages/ShowImage/RankList/index',
        },
        {
          path: '/search',
          name: '发现',
          component: '@/pages/ShowImage/Search/index',
        },
        {
          path: 'concern',
          name: '关注',
          routes: [
            {
              path: 'user',
              name: '订阅',
              component: '@/pages/Concern/user',
            },
            {
              path: 'like',
              // icon:'StarOutlined',//v5取消了二级菜单图标，应为要加载3M的图标库
              name: '喜欢',
              component: '@/pages/Concern/Like',
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
              component: '@/pages/User/UpLoadImage/index',
            },
            {
              path: 'record',
              name: '足迹',
              component: '@/pages/User/Record/index',
            },
            {
              path: 'info',
              name: '个人信息',
              component: '@/pages/User/UserInfo/index',
            },
          ],
        },
        {
          path: 'manage',
          name: '管理中心',
          routes: [
            {
              path: 'image',
              name: '图片管理',
              component: '@/pages/Manage/Images/index',
            },
            {
              path: 'user',
              name: '用户管理',
              component: '@/pages/Manage/Users/index',
            },
          ],
        },
      ],
    },
  ],

  fastRefresh: {},
  mfsu: {},
  webpack5: {},
});
