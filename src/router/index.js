import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/layout'

Vue.use(Router)

/**
 * Note: 子菜单只在路由子菜单时出现。长度 > = 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true, item将不会显示在侧边栏中(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果没有设置alwaysShow，当item有多个子路由时，
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置noRedirect将不会在面包屑中重定向
 * name:'router-name'             该名称由<keep-alive>使用(必须设置!!)
 * meta : {
    roles: ['admin','editor']    控制页面角色(您可以设置多个角色)
    title: 'title'               显示在侧边栏和面包屑的名称(建议设置)
    icon: 'svg-name'/'el-icon-x' 图标显示在侧边栏中
    breadcrumb: false            如果设置为false，该项目将隐藏在breadcrumb中(默认为true)
    activeMenu: '/example/list'  如果设置了path，侧边栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基本页 所有角色都可以被访问
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('#/redirect/index'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('#/login/index'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('#/error-page/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('#/error-page/401'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('#/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: 'Dashboard',
          icon: 'dashboard',
          affix: true,
          badge: null, // must define
        },
      },
    ],
  },
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'permission',
      roles: ['admin', 'editor'], // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('#/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'], // or you can only set roles in sub nav
        },
      },
      {
        path: 'directive',
        component: () => import('#/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission',
          // if do not set roles, means: this page does not require permission
        },
      },
      {
        path: 'role',
        component: () => import('#/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin'],
        },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })

const router = createRouter()

// 当我们A帐号退出之后 B帐号登录进来 也会执行 addRoutes() 这个方法 会一直累加上去
// 然后控制台上也会有警告 出现了重复的路由
// 然后我们访问A帐号有 B帐号没有的路由时 发现是可以进行访问的
// 这显然是不合理的
// 已经注入的路由 没办法在通过官方给的api删除掉(当然，目前官方也没有提供相应的api)
// 所以有了以下解决方法
// 在用户退出的时候，重新执行下 resetRouter() 这个方法就可以重新初始化静态路由表
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
