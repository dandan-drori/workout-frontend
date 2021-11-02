import { httpService } from './http-service.js'

export const authService = {
	login,
	logout,
	signup,
	getLoggedInUser,
}

window.authService = authService

const BASE_URL = 'auth/'

async function login(userCred) {
	const user = await httpService.post(BASE_URL + 'login', userCred)
	if (user) return _saveLocalUser(user)
}

async function signup(userCred) {
	const user = await httpService.post(BASE_URL + 'signup', userCred)
	return _saveLocalUser(user)
}

async function logout() {
	sessionStorage.clear()
	return await httpService.post(BASE_URL + 'logout')
}

function getLoggedInUser() {
	return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
}

function _saveLocalUser(user) {
	sessionStorage.setItem('loggedinUser', JSON.stringify(user))
	return user
}
