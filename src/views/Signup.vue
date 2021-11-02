<template>
	<section @click.stop class="signup-modal">
		<div class="signup-header">
			<h2>Welcome to Workout</h2>
		</div>
		<div class="signup-input">
			<div class="input-txt">
				<h2>Sign up</h2>
			</div>
			<form @submit.prevent="signUp">
				<input type="text" placeholder="Enter email" v-model="userCred.username" />
				<input
					type="text"
					placeholder="Enter full name"
					v-model="userCred.fullname"
					autocomplete="off"
				/>
				<input type="password" placeholder="Enter password" v-model="userCred.password" />
				<button class="checkout-btn" ref="myBtn">
					<span>Continue</span>
				</button>
			</form>
			<div class="move-login-button">
				<small
					>Already have a user? click here to <router-link to="/login">login</router-link></small
				>
			</div>
		</div>
		<div class="signup-divider">
			<div class="border"></div>
			<small>or</small>
		</div>
		<div class="signup-socials">
			<button @click.stop="loginWithFacebook">
				<span class="material-icons" style="color:#4267B2;"
					><img src="@/assets/imgs/svgs/Facebook.svg" alt="facebook"/></span
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
</template>

<script>
export default {
	data() {
		return {
			userCred: {
				username: '',
				fullname: '',
				password: '',
			},
			isLoading: false,
		}
	},
	methods: {
		async signUp() {
			try {
				this.isLoading = true
				await this.$store.dispatch({
					type: 'signup',
					userCred: this.userCred,
				})
				this.isLoading = false
				this.$router.push('/')
			} catch (err) {
				// 	showMsg('Sign up failed!', 'error')
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
					this.$store.commit('setLoginUser', userInfo)
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
								this.$store.commit('setLoginUser', userInfo)
							}
						},
						this.params
					)
					router.push('/')
				}
			}, this.params)
		},
		moveToLogin() {
			this.$emit('moveToLogin', true)
		},
	},
	mounted() {
		this.$refs.myBtn.onmousemove = e => {
			const x = e.offsetX
			const y = e.offsetY

			e.target.style.setProperty('--x', `${x}px`)
			e.target.style.setProperty('--y', `${y}px`)
		}
	},
}
</script>
