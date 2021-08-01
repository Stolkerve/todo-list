import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import TodoListView from '@/views/TodoListView.vue';
import HistoryView from '@/views/HistoryView.vue';
import SignUpView from '@/views/SignUpView.vue';
import LogInView from '@/views/LogInView.vue';
import {userModule} from '@/store/UserModule';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/todo-list',
    name: 'Todo list',
    meta: {requireAuth: true},
    component: TodoListView
  },
  {
    path: '/history',
    name: 'History',
    meta: {requireAuth: true},
    component: HistoryView
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogInView
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach( (to: any, front: any, next: any) => {
  if (to.matched.some( (record: any) => record.meta.requireAuth)) {
    if (!userModule.isLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
});

export default router
