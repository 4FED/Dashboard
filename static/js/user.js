var ocdDashboard = ocdDashboard || {};
(function () {
	Parse.initialize("e2pCNYD20d5ynvUPKyUud5G20evDRI4pmHiqrvPw", "6IEcqXamMkjJsssIaFPiTDKH1azNB6wOtR5kuAIP");

	ocdDashboard.User = {
		signUp: function () {
			var user = new Parse.User();

			var amcId = document.registerForm.amcId.value;
		    var email = document.registerForm.email.value;
		    var password = document.registerForm.password.value;
		    var passwordChecker = document.registerForm.passwordChecker.value;
		    var firstname = document.registerForm.firstname.value;
		    var surname = document.registerForm.surname.value;
		    if (password == passwordChecker) {
			    user.set("username", amcId);
			    user.set("email", email);
			    user.set("password", password);
			    user.set("initials", initials);
			    user.set("firstname", firstname);
			    user.set("surname", surname);
			    user.set("isDoctor", true);

			    user.signUp(null, {
				    success: function(object) {
					    alert("nieuwe gebruiker is aangemaakt, vergeet niet je email te verifiseren");
					    ocdDashboard.User.logout();
				    },
				    error: function(model, error) {
				    	alert('Failed to create new object, with error code: ' + error.message);
				    }
				});
			}else{
				alert("The two passwords are not the same");
				document.registerForm.password.value = "";
		    	document.registerForm.passwordChecker.value = "";
			};
		},
		login: function () {	
			var amcId = document.loginForm.amcId.value;
		    var password = document.loginForm.password.value;

			Parse.User.logIn(amcId, password, {
			  success: function(user) {
			  	console.log("succes" + user);
				    window.location.href = "http://fenix-app.nl/dashboard/home.html";
			  },
			  error: function(user, error) {
			    console.log('login Failed ' + error.message);
			  }
			});
			
		},
		update: function () {
			// body...
		},
		logout: function () {
			Parse.User.logOut();
			window.location.href = "http://fenix-app.nl/dashboard/#user/login";
			sessionStorage.clear();
			localStorage.clear();
		},
		directives: {
		    myName:{
		    	text: function() {
		    		return this.initials + " " + this.surname; 
		    	}
		    },
		    profilePicture:{
		    	src: function(target) {
		    		if (this.profilePicture) {
		    			var backgroundImage = "url(" + this.profilePicture.url() + ")";
		    			target.element.style.backgroundImage= backgroundImage;
		    		}
		    	}
		    },
		},
	};
})();