var ocdDashboard = ocdDashboard || {};

(function () {
	Parse.initialize("e2pCNYD20d5ynvUPKyUud5G20evDRI4pmHiqrvPw", "6IEcqXamMkjJsssIaFPiTDKH1azNB6wOtR5kuAIP");

	var sections = {
		home: function (){
			Transparency.render(myFunctions.getOneEl(".patient"), JSON.parse(sessionStorage.getItem("patientDetails")), ocdDashboard.Patient.directives);

		},
		detail: function () {
			myFunctions.getOneEl(".progress").classList.remove("selected");
			myFunctions.getOneEl(".summary").classList.add("selected");
			Transparency.render(myFunctions.getOneEl(".exercisesList"), JSON.parse(sessionStorage.getItem("exercises")), ocdDashboard.Patient.directives);
			Transparency.render(myFunctions.getOneEl("#patientDetails"), JSON.parse(sessionStorage.getItem("patientDetails")), ocdDashboard.Patient.directives);
		},
		progress: function () {
			myFunctions.getOneEl(".summary").classList.remove("selected");
			myFunctions.getOneEl(".progress").classList.add("selected");
			Transparency.render(myFunctions.getOneEl(".exercisesProgressList"), JSON.parse(sessionStorage.getItem("exercises")), ocdDashboard.Exercise.directives);
		},
		detailExercise: function () {			
			Transparency.render(myFunctions.getOneEl("#exerciseChart"), JSON.parse(sessionStorage.getItem("exerciseDetails")))
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
	    		exercisesSummary: function () {
	    			SHOTGUN.listen("getExercises", sections.detail);
	    			ocdDashboard.Exercise.get();	
	    			ocdDashboard.Exercise.getFinished();
	    			sections.toggle("exercisesSummary", "content");
	    		},
	    		progressExercises: function () {
	    			if (sessionStorage.getItem('exercises') && sessionStorage.getItem('exerciseFinished')) {
	    				sections.toggle("progressExercises", "content");
	    				sections.progress();
	    			} else {
	    				SHOTGUN.listen("getExercises", sections.progress)
	    				ocdDashboard.Exercise.get();	
	    				ocdDashboard.Exercise.getFinished();
	    			}
	    		},
	    		'progressExercises/:id': function (id) {
	    			if (Parse.User.current()) {
	    				SHOTGUN.listen("getExerciseDetails", sections.detailExercise);
	    				ocdDashboard.Exercise.getDetails(id);
	    				ocdDashboard.Exercise.drawChart(id);
	    			}else{
	    				window.location.replace(reroute);
	    			};
	    		},
	    		':id': function(id) {	
	    			console.log(id);
	    			if (Parse.User.current()) {
	    				SHOTGUN.listen("getDetails", ocdDashboard.router.reroute);
	    				ocdDashboard.Patient.getDetails(id);
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
		},
		reroute: function() {
			window.location.replace("http://localhost:8080/4fed/Dashboard/patient.html#exercisesSummary")
		} 
	};
	ocdDashboard.router.init();
	myFunctions.disableLoader();
	myFunctions.AddClickEvent(".eventButton");	
})();