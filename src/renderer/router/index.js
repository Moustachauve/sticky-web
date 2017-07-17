import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'test-list',
      component: require('@/components/TestList')
    },
    {
      path: '/editor',
      name: 'test-editor',
      component: require('@/components/TestEditor')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
