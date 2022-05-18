import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/manage',
      name: '管理中心',
      component: '@/pages/Layout/LeftLayout',
      routes: [
        {
          path: '/manage',
          redirect: '/manage/image',
        },
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
    {
      path: '/',
      component: '@/pages/Layout/TopLayout',
      routes: [
        {
          path: '/',
          redirect: '/search',
        },
        {
          path: '/search',
          name: '发现',
          component: '@/pages/ShowImage/Search/index',
        },
        {
          path: '/rank',
          name: '排行榜',
          component: '@/pages/ShowImage/RankList/index',
        },
        {
          path: '/recommend',
          name: '推荐',
          component: '@/pages/ShowImage/Recommend/index',
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
              path: 'other/:uid',
              name: '其用户',
              component: '@/pages/Concern/user/OtherUser.tsx',
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
