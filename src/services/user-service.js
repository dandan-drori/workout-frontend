import { httpService } from './http-service.js'

export const userService = {
	getUsers,
	getById,
	remove,
	update,
}

window.userService = userService

const BASE_URL = 'user/'

async function getUsers() {
	return await httpService.get(BASE_URL)
}
async function getById(userId) {
	return await httpService.get(`${BASE_URL}${userId}`)
}
async function remove(userId) {
	return await httpService.delete(`${BASE_URL}${userId}`)
}
async function update(user, isHost) {
	if (user && !isHost) _saveLocalUser(user)
	return await httpService.put(`${BASE_URL}${user._id}`, user)
}

function _saveLocalUser(user) {
	sessionStorage.setItem('loggedinUser', JSON.stringify(user))
	return user
}
