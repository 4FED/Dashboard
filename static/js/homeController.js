var ocdDashboard = ocdDashboard || {};

(function () {
	Parse.initialize("e2pCNYD20d5ynvUPKyUud5G20evDRI4pmHiqrvPw", "6IEcqXamMkjJsssIaFPiTDKH1azNB6wOtR5kuAIP");


	// Router object
	// sets router parameters
	var sections = {
		home: function (){
			var userData = Parse.User.current()
			var userDetails = [];
			var user = {};
			user.initials = userData.get("initials");
			user.surname = userData.get("surname")
			user.profilePicture = userData.get('profilePicture');
			userDetails.push(user);
			console.log(user)
			Transparency.render(myFunctions.getOneEl("#patienten"), JSON.parse(sessionStorage.getItem("patienten")), ocdDashboard.Patient.directives);
			Transparency.render(myFunctions.getOneEl("#account"), userDetails, ocdDashboard.User.directives);
		},
		toggle: function (show, hide) {
			var show = myFunctions.getOneEl("." + show);
			var hide =  myFunctions.getAllEl("." + hide);
			for (var i = 0; i < hide.length; i++) {
				hide[i].classList.remove('active');
			};

			show.classList.add('active');				
		} 
	};

	ocdDashboard.router = {
		init: function () {
			var reroute = "http://fenix-app.nl/dashboard/#user/login"
			routie({
	    		home: function() {	
	    			if (Parse.User.current()) {
	    				SHOTGUN.listen("getPatienten", sections.home);
	    				ocdDashboard.Patient.get();
	    				sections.toggle("home", "content");
	    			}else{
	    				window.location.replace(reroute);
	    			};
	    		},
	    		'': function(){
	    			if (Parse.User.current()) {
	    				window.location.replace("http://fenix-app.nl/dashboard/home.html#home");
	    			}else{
	    				window.location.replace(reroute);
	    			};
	    		}
			});
		}		
	};
	ocdDashboard.utils = {
		liveSearch: function () {
			var searchField = myFunctions.getOneEl("#liveSearchPatienten");			
			var patienten = JSON.parse(sessionStorage.getItem("patienten"));

			searchField.addEventListener('input', function(){

				var input = searchField.value;
				var re = new RegExp('^'+input, 'i'); // regular expression that selects if string starts with input, and not case sensitive

				_.each(patienten, function (patient) {
					patientName = patient.firstname;
					if (patientName.search(re) != -1) {
						console.log(patient);
					};
				});		
			}, true);
		}
	}
	ocdDashboard.router.init();
	myFunctions.AddClickEvent(".eventButton");	
	ocdDashboard.utils.liveSearch();
})();