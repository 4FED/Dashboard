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
					ocdDashboard.Patient.details = patient;
				};
				  	SHOTGUN.fire("getDetails");
			});	
		},
		getExercises: function () {
			ocdDashboard.Patient.exercises = [];
			exerciseQuery = new Parse.Query("exercise");
			exerciseQuery.equalTo("userID", ocdDashboard.Patient.details.objectId);
			exerciseQuery.find({
				success: function(exercises) {
				  	console.log(exercises);
				  	_.each(exercises, function(exercise){
				  		var object = {};
				  		object.id = exercise.id;
				  		object.title = exercise.get("title");
				  		object.category = exercise.get("category");
				  		object.fearfactor = exercise.get("fearfactor");
				  		object.responsePrevention = exercise.get("responsePrevention");
				  		ocdDashboard.Patient.exercises.push(object);
				  	});
				  	SHOTGUN.fire("getExercises");
				},
				error: function(patienten, error) {
					console.log('get exercises failed ' + error.message);
				}
			});
		},
		details: {
		},
		exercises: [
		],
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