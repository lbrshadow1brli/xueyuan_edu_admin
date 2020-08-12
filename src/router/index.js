import Vue from 'vue'
import VueRouter from 'vue-router'
import index from "../views/index";
import list from "../views/pages/list";
import login from "../views/login";
import addTeacher from "../views/pages/addTeacher";

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      component: login
    },
  {
    path: '/index',
    component: index,
    children:[
      {
        path: '/list',
        component: list
      },
      {
        path: '/addteacher',
        component: addTeacher
      },
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
