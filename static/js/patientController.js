var ocdDashboard = ocdDashboard || {};

(function () {
	Parse.initialize("e2pCNYD20d5ynvUPKyUud5G20evDRI4pmHiqrvPw", "6IEcqXamMkjJsssIaFPiTDKH1azNB6wOtR5kuAIP");

	var sections = {
		home: function (){
			Transparency.render(myFunctions.getOneEl(".patient"), ocdDashboard.Patient.details, ocdDashboard.Patient.directives);
		},
		detail: function () {
			// body...
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
			var reroute = "http://localhost/4fed/Dashboard/#user/login"
			routie({
	    		':id': function(id) {	
	    			if (Parse.User.current()) {
	    				SHOTGUN.listen("getDetails", ocdDashboard.router.reroute);
	    				ocdDashboard.Patient.getDetails(id);
	    			}else{
	    				window.location.replace(reroute);
	    			};
	    		},
	    		exercisesSummary: function () {
	    			SHOTGUN.listen("getExercises", sections.toggle("exerciseSummary", "content"));
	    			ocdDashboard.Patient.getExercises();	
	    		},
	    		'': function(){
	    			if (Parse.User.current()) {
	    				window.location.replace("http://localhost/4fed/Dashboard/home.html#home");
	    			}else{
	    				window.location.replace(reroute);
	    			};
	    		}
			});
		},
		reroute: function() {
			window.location.replace("http://localhost/4fed/Dashboard/patient.html#exercisesSummary")
		} 
	};
	ocdDashboard.router.init();
	myFunctions.AddClickEvent(".eventButton");	
})();