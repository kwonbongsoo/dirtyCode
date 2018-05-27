import Vue from 'vue'
import Router from 'vue-router'
import alter_date_format from '@/components/alter_date_format'
import is_available_time from '@/components/is_available_time'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/alter_date_format',
      name: 'alter_date_format',
      component: alter_date_format
    },
    {
      path: '/is_available_time',
      name: 'is_available_time',
      component: is_available_time
    },
  ]
})
