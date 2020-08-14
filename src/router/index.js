import Vue from 'vue'
import VueRouter from 'vue-router'
import index from "../views/index";
import list from "../views/pages/teacherList";
import login from "../views/login";
import addTeacher from "../views/pages/addTeacher";
import subjectList from "../views/pages/subjectList";
import addCourse from "../views/pages/addCourse";
import courseList from "../views/pages/courseList";

Vue.use(VueRouter)

  const routes = [
    {
      path: '/login',
      component: login
    },
  {
    path: '/',
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
      {
        path: '/courseList',
        component: courseList
      },
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
