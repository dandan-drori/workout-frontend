export const initFbsdk = () => {
	return new Promise(resolve => {
		window.fbAsyncInit = (function() {
			FB.init({
				appId: '1072363106867962',
				cookie: true, // enable cookies to allow the server to access the session
				xfbml: true, // parse social plugins on this page
				version: 'v12.0', // use graph api version 2.8
			})
		})(
			(function(d, s, id) {
				var js,
					fjs = d.getElementsByTagName(s)[0]
				if (d.getElementById(id)) return
				js = d.createElement(s)
				js.id = id
				js.src = '//connect.facebook.net/en_US/all.js'
				fjs.parentNode.insertBefore(js, fjs)
			})(document, 'script', 'facebook-jssdk')
		)
	})
}

// FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
// });

// {
//     status: 'connected',
//     authResponse: {
//         accessToken: '...',
//         expiresIn:'...',
//         signedRequest:'...',
//         userID:'...'
//     }
// }

{
	/* <fb:login-button 
  scope="public_profile,email"
  onlogin="checkLoginState();">
</fb:login-button> */
}

// function checkLoginState() {
//   FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
//   });
// }
