var ocdDashboard = ocdDashboard || {};

(function () {
	Parse.initialize("e2pCNYD20d5ynvUPKyUud5G20evDRI4pmHiqrvPw", "6IEcqXamMkjJsssIaFPiTDKH1azNB6wOtR5kuAIP");

	ocdDashboard.sections = {
		home: function (){
			Transparency.render(myFunctions.getOneEl(".patient"), JSON.parse(sessionStorage.getItem("patientDetails")), ocdDashboard.Patient.directives);

		},
		detail: function (weekNumber, old) {
			var exercisesData = JSON.parse(sessionStorage.getItem("exercises"));
			var weekNumber = document.getElementById("select_week").value;
			
			if (weekNumber == "next_week") {
				weekNumber = myFunctions.getCurrentWeek()+1;
			} else {
				weekNumber = myFunctions.getCurrentWeek();
			};

			var weekdata = {
				content: {
					date: "De week van " + myFunctions.WeekToDate(weekNumber).getDate() + " " + myFunctions.getMonthName(myFunctions.WeekToDate(weekNumber).getMonth()),
				},
				directives: {
					// action: {
					// 	onchange: function () { return ""}
					// }
				}
			};

			Transparency.render(document.getElementById("patient_profile"), weekdata.content, weekdata.directives);

			var exercisesSummary = exercisesData[weekNumber];


			Transparency.render(myFunctions.getOneEl(".exercisesList"), exercisesSummary, ocdDashboard.Exercise.directives);
			Transparency.render(myFunctions.getOneEl("#patientDetails"), JSON.parse(sessionStorage.getItem("patientDetails")), ocdDashboard.Patient.directives);
			Transparency.render(myFunctions.getOneEl("#patient_profile"), JSON.parse(sessionStorage.getItem("patientDetails")));
			var experiences = myFunctions.getAllEl(".experienceText");	
			_.each(experiences, function (experience) {
				experience.innerHTML = experience.value;
			})
			ocdDashboard.Progress.init(exercisesSummary);
		},
		// progress: function () {
		// 	Transparency.render(myFunctions.getOneEl(".exercisesProgressList"), JSON.parse(sessionStorage.getItem("exercises")), ocdDashboard.Exercise.directives);
		// 	ocdDashboard.progress.init();
		// },
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
			var reroute = "http://fenix-app.nl/dashboard/#user/login"
			routie({
	    		exercisesSummary: function () {
	    			SHOTGUN.listen("getExercises", ocdDashboard.sections.detail);
	    			ocdDashboard.Exercise.get();	
	    			ocdDashboard.Exercise.getFinished();
	    			ocdDashboard.sections.toggle("exercisesSummary", "content");
	    		},
	    		// progressExercises: function () {
	    		// 	if (sessionStorage.getItem('exercises') && sessionStorage.getItem('exerciseFinished')) {
	    		// 		ocdDashboard.sections.toggle("progressExercises", "content");
	    		// 		ocdDashboard.sections.progress();
	    		// 	} else {
	    		// 		SHOTGUN.listen("getExercises", ocdDashboard.sections.progress)
	    		// 		ocdDashboard.Exercise.get();	
	    		// 		ocdDashboard.Exercise.getFinished();
	    		// 	}
	    		// },
	    		// 'progressExercises/:id': function (id) {
	    		// 	if (Parse.User.current()) {
	    		// 		SHOTGUN.listen("getExerciseDetails", ocdDashboard.sections.detailExercise);
	    		// 		ocdDashboard.Exercise.getDetails(id);
	    		// 		ocdDashboard.Exercise.drawChart(id);
	    		// 	}else{
	    		// 		window.location.replace(reroute);
	    		// 	};
	    		// },
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
	    				window.location.replace("http://fenix-app.nl/dashboard/home.html#home");
	    			}else{
	    				window.location.replace(reroute);
	    			};
	    		}
			});
		},
		reroute: function() {
			window.location.replace("http://fenix-app.nl/dashboard/patient.html#exercisesSummary")
		} 
	};
	ocdDashboard.router.init();
	myFunctions.disableLoader();
	myFunctions.AddClickEvent(".eventButton");	
})();