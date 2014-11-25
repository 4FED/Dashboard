ocdDashboard = ocdDashboard || {};
(function () {
	ocdDashboard.Exercise = {
		get: function () {
			var exercisesArray = [];
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
	}
})();