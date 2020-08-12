import Vue from 'vue'
import VueRouter from 'vue-router'
import index from "../views/index";
import list from "../views/pages/teacherList";
import login from "../views/login";
import addTeacher from "../views/pages/addTeacher";
import subjectList from "../views/pages/subjectList";
import addCourse from "../views/pages/addCourse";

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
      {
        path: '/subjectList',
        component: subjectList
      },
      {
        path: '/addCourse',
        component: addCourse
      },
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
