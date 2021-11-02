<template>
	<section class="login">
		<section class="login-modal" @click.stop>
			<div class="login-header">
				<h2>Welcome to Workout</h2>
			</div>
			<div class="login-input">
				<div class="input-txt">
					<h2>Log In</h2>
				</div>
				<form action="" @submit.prevent="login">
					<input
						type="text"
						placeholder="Enter email"
						v-model="userCred.username"
						ref="usernameInputRef"
					/>
					<input type="password" placeholder="Enter password" v-model="userCred.password" />
					<button class="checkout-btn" ref="myBtn">
						<span>{{ loginBtnTxt }}</span>
					</button>
				</form>
				<div class="move-signup-button">
					<small
						>Dont have a user? click here to <router-link to="/signup">sign up</router-link></small
					>
				</div>
			</div>
			<div class="login-divider">
				<div class="border"></div>
				<small>or</small>
			</div>
			<div class="login-socials">
				<button @click.stop="loginWithFacebook">
					<span class="material-icons" style="color:#4267B2;">
						<img src="@/assets/imgs/svgs/Facebook.svg" alt="facebook" /> </span
					>Continue with Facebook
				</button>
				<div
					class="fb-login-button"
					data-width=""
					data-size="large"
					data-button-type="continue_with"
					data-layout="default"
					data-auto-logout-link="false"
					data-use-continue-as="false"
				></div>
				<button @click.stop="loginWithGoogle">
					<img src="@/assets/imgs/svgs/google.svg" alt="google" />
					Continue with Google
				</button>
			</div>
		</section>
	</section>
</template>

<script>
import { initFbsdk } from '@/config/facebook_oAuth.js'
export default {
	data() {
		return {
			userCred: {
				username: '',
				password: '',
			},
			isLoading: false,
		}
	},
	methods: {
		async login() {
			try {
				this.isLoading = true
				await this.$store.dispatch({ type: 'login', userCred: this.userCred })
				this.isLoading = false
				this.$router.push('/')
			} catch (err) {
				// showMsg('Logged in failed', 'error')
				console.log('err', err)
			}
		},
		loginWithGoogle() {
			this.$gAuth
				.signIn()
				.then(GoogleUser => {
					var userInfo = {
						loginType: 'google',
						google: {
							auth: GoogleUser.getAuthResponse(),
							user: {
								name: GoogleUser.getBasicProfile().getName(),
								email: GoogleUser.getBasicProfile().getEmail(),
								profileImage: GoogleUser.getBasicProfile().getImageUrl(),
							},
						},
					}
				})
				.catch(error => {
					console.log('error', error)
				})
		},
		loginWithFacebook() {
			window.FB.login(response => {
				if (response && response.authResponse) {
					console.log('response', response)
					var userInfo = {
						loginType: 'fb',
						fb: {
							auth: response.authResponse,
						},
					}
					this.$store.commit('setLoggedinUser', userInfo)
					window.FB.api(
						`/${response.authResponse.userID}`,
						userResponse => {
							if (userResponse) {
								console.log(userResponse)
								var userInfo = {
									loginType: 'fb',
									fb: {
										auth: response.authResponse,
										user: userResponse,
									},
								}
								this.$store.commit('setLoggedinUser', userInfo)
							}
						},
						this.params
					)
					router.push('/')
				}
			}, this.params)
		},
	},
	computed: {
		loginBtnTxt() {
			return 'Continue'
		},
	},
	mounted() {
		initFbsdk()
		this.$refs.usernameInputRef.focus()
		this.$refs.myBtn.onmousemove = e => {
			const x = e.offsetX
			const y = e.offsetY

			e.target.style.setProperty('--x', `${x}px`)
			e.target.style.setProperty('--y', `${y}px`)
		}
	},
}
</script>
