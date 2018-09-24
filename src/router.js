import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

//Add any views to import list
import Start from './views/Start.vue'
import Chronicle from './views/Chronicle.vue'
import Detail from './views/Detail.vue'
import Profile from './views/Profile.vue'

Vue.use(Router)


//Add a path for every view. add meta if page requires authorization(user logged in)
let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'start',
      component: Start
    },
    {
      path: '/h/:username',
      name: 'chronicle',
      component: Chronicle,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/h/:username/j/:currentJournal',
      name: 'journal-detail',
      component: Detail,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/p/:username',
      name: 'profile',
      component: Profile,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser){ 
    next('/');
  }else if(!requiresAuth && currentUser){
    next('/h');
  }else{
    next();
  }
})


export default router