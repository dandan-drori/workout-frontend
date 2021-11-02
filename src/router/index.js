import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
	{
		path: '/workout/new',
		component: () => import('../views/Add.vue'),
	},
	{
		path: '/workout/:id',
		component: () => import('../views/Edit.vue'),
	},
	{
		path: '/workout',
		component: () => import('../views/Workouts.vue'),
	},
	{
		path: '/workout',
		component: () => import('../views/Workouts.vue'),
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/signup',
		component: () => import('../views/Signup.vue'),
	},
	{
		path: '/',
		component: () => import('../views/Home.vue'),
	},
]

const router = new VueRouter({
	routes,
})

// route guards
router.beforeEach((to, from, next) => {
	if (to.fullPath === '/') {
		if (!store.getters.loggedinUser) {
			next('/login')
		}
	}
	if (to.fullPath === '/login') {
		if (store.getters.loggedinUser) {
			next('/')
		}
	}
	next()
})

export default router
