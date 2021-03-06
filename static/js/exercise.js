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
					exercises = _.sortBy(exercises, function(sorted){
				  			return -sorted.get("weekNumber");
					});
					if (exercises.length < 1) {
					  		myFunctions.disableLoader();
					  		var content  = JSON.stringify(exercisesArray);
						    sessionStorage.setItem("exercises", content);
						  	SHOTGUN.fire('getExercises');
					  	} else {
						  	var weekNumber = exercises[0].get("weekNumber"); // save first weeknumber
						  	var weekArray = [];
						  	for (var i = 0; exercises.length >= i; i++) {
						  		if (exercises[i]) {
							  		if(weekNumber == exercises[i].get("weekNumber")){
							  			weekArray.push(exercises[i]);
							  		} else {
							  			exercisesArray[weekNumber] = weekArray;
							  			weekArray = [];
							  			weekNumber = exercises[i].get("weekNumber");
							  			weekArray.push(exercises[i]);
							  		}
						  		} else {
						  			exercisesArray[weekNumber] = weekArray;
						  		}
						  	};

						    var exercises  = JSON.stringify(exercisesArray);
						    sessionStorage.setItem("exercises", exercises);
						  	SHOTGUN.fire("getExercises");
					  	};				  	
				},
				error: function(error) {
					console.log('get exercises failed ' + error.message);
				}
			});
		},
		getFinished: function () {
			var exercisesArray = [];
			var patient = JSON.parse(sessionStorage.getItem("patientDetails"));
			exerciseQuery = new Parse.Query("exerciseFinished");
			exerciseQuery.equalTo("userID", patient.objectId);
			exerciseQuery.find({
				success: function(exercises) {
				  	_.each(exercises, function(exercise){
				  		exercisesArray.push(exercise);
				  	});
				  	var exercises  = JSON.stringify(exercisesArray);
				    sessionStorage.setItem("exerciseFinished", exercises);
				},
				error: function(error) {
					console.log('get exercises failed ' + error.message);
				}
			});
		},
		getDetails: function (id) {
			var exercises = JSON.parse(sessionStorage.getItem("exercises"));
			_.each(exercises, function(exercise){
				if (exercise.objectId == id) {
					var exerciseDetails = JSON.stringify(exercise)
					sessionStorage.setItem("exerciseDetails", exerciseDetails);
				};
				  	SHOTGUN.fire("getExerciseDetails");
			});	
		},
		drawChart: function (id){	
			this.setData(id);
			myFunctions.enableLoader();
			// SHOTGUN.listen("setData", function () {
			
				var canvas  = document.getElementById("G" + id).getContext("2d");
				var options = {
					 scaleShowGridLines : false,
				}
				var data = {
				    labels: ocdDashboard.Exercise.dataLabels, 
				    datasets: [
					    {
				            label: "angst score pre exposure",
				            fillColor: "rgba(220,220,220,0.2)",
				            strokeColor: "rgba(220,220,220,1)",
				            pointColor: "rgba(220,220,220,1)",
				            pointStrokeColor: "#fff",
				            pointHighlightFill: "#fff",
				            pointHighlightStroke: "rgba(220,220,220,1)",
				            data: ocdDashboard.Exercise.dataSetPre
				        },
				        {
				            label: "angst score post exposure",
				            fillColor: "rgba(151,187,205,0.2)",
				            strokeColor: "rgba(151,187,205,1)",
				            pointColor: "rgba(151,187,205,1)",
				            pointStrokeColor: "#fff",
				            pointHighlightFill: "#fff",
				            pointHighlightStroke: "rgba(151,187,205,1)",
				            data: ocdDashboard.Exercise.dataSetPost
				        }
		            ]
				}
				var progressLineChart = new Chart(canvas).Line(data, options);
				myFunctions.disableLoader();
			// })
		},
		setData: function (id) {		
			ocdDashboard.Exercise.dataLabels = [];
			ocdDashboard.Exercise.dataSetPre = [];
			ocdDashboard.Exercise.dataSetPost = [];
			var i = 1;
			var exercises = JSON.parse(sessionStorage.getItem("exerciseFinished"));
			// var Exercise = Parse.Object.extend("exerciseFinished");
			// var exerciseQuery = new Parse.Query(Exercise);
			// exerciseQuery.equalTo("exerciseId", id);			
			// exerciseQuery.find({
			// 	success: function(exercises) {		
				_.each(exercises, function(exercise){
					if (exercise.exerciseId == id) {
						ocdDashboard.Exercise.dataLabels.push(i);
						ocdDashboard.Exercise.dataSetPre.push(exercise.fearFactorPre);
						ocdDashboard.Exercise.dataSetPost.push(exercise.fearFactorPost);
						i++;
					};
					// SHOTGUN.fire("setData");	
				});	
					
			//   	},
			//   	error: function(exercises, error) {
			//     	console.log('get exercises failed ' + error.message);
			//   	}
			// });
		},
		directives: {
			myId:{
				id: function () { return "G" + this.objectId; }
			},
			myEId:{
				id: function () { return "E" + this.objectId;}	
			},
		    myLink:{
		    	href: function() { return "patient.html#progressExercises/" + this.objectId; }
		    },
		    myUpdate:{
		    	text: function() {return myFunctions.normalTime(this.updatedAt);}
		    },
		    ervaring:{
		    	value: function () {
		    		return this.lastExperience; 
		    	}
		    },
			myExpandId:{
				id: function () { return "ex" + this.objectId; }
			},
			myExpand:{
				onclick: function () { return "myFunctions.expand('ex" + this.objectId + "');"; }
			},
		},		
		dataSetPre: [
		],
		dataSetPost: [
		],
		dataLabels: [
		]
	}
})();