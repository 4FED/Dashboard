var ocdDashboard = ocdDashboard || {};

(function () {
	Parse.initialize("e2pCNYD20d5ynvUPKyUud5G20evDRI4pmHiqrvPw", "6IEcqXamMkjJsssIaFPiTDKH1azNB6wOtR5kuAIP");


	// Router object
	// sets router parameters
	var sections = {
		home: function (){
			var user = Parse.User.current()
			var userDetails = [];
			userDetails.push(user._serverData);
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
			var reroute = "http://localhost:8080/4fed/Dashboard/#user/login"
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
	    				window.location.replace("http://localhost:8080/4fed/Dashboard/home.html#home");
	    			}else{
	    				window.location.replace(reroute);
	    			};
	    		}
			});
		} 
	};
	ocdDashboard.router.init();
	myFunctions.AddClickEvent(".eventButton");	
})();