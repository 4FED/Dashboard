var ocdDashboard = ocdDashboard || {};
(function () {
	Parse.initialize("e2pCNYD20d5ynvUPKyUud5G20evDRI4pmHiqrvPw", "6IEcqXamMkjJsssIaFPiTDKH1azNB6wOtR5kuAIP");
	ocdDashboard.Patient = {
		get: function (type) {
			var patientenArray = [];
			var user = Parse.User.current();
			var patientQuery = new Parse.Query(Parse.User);
			patientQuery.equalTo("hasDoctor", user.id);
			patientQuery.find({
				success: function(patienten) {
				  	_.each(patienten, function(patient){
				  		patientenArray.push(patient);
				  	});
				  	var patienten  = JSON.stringify(patientenArray);
				    sessionStorage.setItem("patienten", patienten);
				  	SHOTGUN.fire("getPatienten");
				},
				error: function(patienten, error) {
					console.log('get patienten failed ' + error.message);
				}
			});
		},
		getDetails: function (id) {
			var patienten = JSON.parse(sessionStorage.getItem("patienten"));
			_.each(patienten, function(patient){
				if (patient.objectId == id) {
					var patientDetails = JSON.stringify(patient)
					sessionStorage.setItem("patientDetails", patientDetails);
				};
				  	SHOTGUN.fire("getDetails");
			});	
		},
		getExercises: function () {
			exercisesArray = [];
			var patient = JSON.parse(sessionStorage.getItem("patientDetails"));
			exerciseQuery = new Parse.Query("exercise");
			exerciseQuery.equalTo("userID", patient.objectId);
			exerciseQuery.find({
				success: function(exercises) {
				  	_.each(exercises, function(exercise){
				  		exercisesArray.push(exercise);
				  	});
				  	var exercises  = JSON.stringify(exercisesArray);
				    sessionStorage.setItem("exercises", exercises);
				  	SHOTGUN.fire("getExercises");
				},
				error: function(patienten, error) {
					console.log('get exercises failed ' + error.message);
				}
			});
		},
		directives: {
		    myName:{
		    	text: function() {
		    		return this.initials + " " + this.surname; 
		    	}
		    },
		    myLink:{
		    	href: function() { return "patient.html#" + this.objectId; }
		    },
		}
	}	
})();