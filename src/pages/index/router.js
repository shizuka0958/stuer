import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/home/index.vue'),
      meta: {
        needLogin: false
      }
    },
    {
      path: '/discuss',
      name: 'discuss',
      component: () => import(/* webpackChunkName: "discuss" */ './views/discuss/index.vue'),
      meta: {
        needLogin: false
      }
    },
    {
      path: '/tree-hole',
      name: 'tree-hole',
      component: () => import(/* webpackChunkName: "tree-hole" */ './views/tree-hole/index.vue'),
      meta: {
        needLogin: false
      }
    },
    {
      path: '/oa',
      name: 'oa',
      component: () => import(/* webpackChunkName: "oa" */ './views/oa/index.vue'),
      meta: {
        needLogin: false
      }
    },
    {
      path: '/job',
      name: 'job',
      component: () => import(/* webpackChunkName: "job" */ './views/job/index.vue'),
      meta: {
        needLogin: false
      }
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import(/* webpackChunkName: "editor" */ './views/editor/index.vue'),
      meta: {
        needLogin: true
      }
    },
    {
      path: '/notification',
      name: 'notification',
      component: () =>
        import(/* webpackChunkName: "notification" */ './views/notification/index.vue'),
      meta: {
        needLogin: true
      }
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/profile/index.vue'),
      meta: {
        needLogin: false
      },
      children: [
        {
          path: '',
          name: 'profile-home',
          component: () =>
            import(/* webpackChunkName: "profile-home" */ './views/profile/home.vue'),
          meta: {
            needLogin: false
          }
        },
        {
          path: 'discuss',
          name: 'profile-discuss',
          component: () =>
            import(/* webpackChunkName: "profile-discuss" */ './views/profile/discuss.vue'),
          meta: {
            needLogin: false
          }
        },
        {
          path: 'likes',
          name: 'profile-likes',
          component: () =>
            import(/* webpackChunkName: "profile-likes" */ './views/profile/likes.vue'),
          meta: {
            needLogin: false
          }
        },
        {
          path: 'basicInfo',
          name: 'profile-basicInfo',
          component: () =>
            import(/* webpackChunkName: "profile-basicInfo" */ './views/profile/basic-info.vue'),
          meta: {
            needLogin: true
          }
        },
        {
          path: 'setting',
          name: 'profile-setting',
          component: () =>
            import(/* webpackChunkName: "profile-setting" */ './views/profile/setting.vue'),
          meta: {
            needLogin: true
          }
        }
      ]
    }
  ]
});
