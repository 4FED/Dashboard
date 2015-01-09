
var ocdDashboard = ocdDashboard || {};
(function (){
	Parse.initialize("e2pCNYD20d5ynvUPKyUud5G20evDRI4pmHiqrvPw", "6IEcqXamMkjJsssIaFPiTDKH1azNB6wOtR5kuAIP");

	ocdDashboard.Progress = {
		init: function (exercisesData) {

			_.each(exercisesData, function (exercise) {			
				
					SHOTGUN.listen("getExerciseDetails", function () {
						var ctx = document.getElementById(exercise.objectId);
					});
				ocdDashboard.Progress.content = [];
				ocdDashboard.Progress.getData(exercise.objectId, exercise.fearFactor);
				
			});
		},
		getData: function (id, startScore) {
			var exerciseFinished = Parse.Object.extend("exerciseFinished");
			var exerciseFinishedQuery = new Parse.Query(exerciseFinished);
			exerciseFinishedQuery.equalTo("exerciseId", id);
			exerciseFinishedQuery.find({
				  	success: function(exercises) {
				  		if (exercises.length > 0) {
				  			var x = 1
							_.each(exercises ,function (exercise) {
								var obj = {};
								obj.number = x;
						  		obj.pre = parseInt(exercise.get("fearFactorPre"));
						  		obj.post = parseInt(exercise.get("fearFactorPost"));
						  		obj.startScore = startScore;
						  		ocdDashboard.Progress.content.push(obj);

						  		ocdDashboard.Progress.dataSetPre.push(parseInt(exercise.get("fearFactorPre")));
						  		ocdDashboard.Progress.dataSetPost.push(parseInt(exercise.get("fearFactorPost")));
						  		ocdDashboard.Progress.dataLabels.push(x);
						  		x++
						  	});
						} else {
						 	ocdDashboard.Progress.content = [];
						};	



						ocdDashboard.Progress.draw("G" + id);					
						SHOTGUN.fire("getExerciseDetails");
						// SHOTGUN.remove("getExerciseDetails");
				  	},
				  	error: function(exercises, error) {
					  	console.log("error loading data" + error.message);
				  	}
				});
		},
		draw: function(id){

			var canvas  = document.getElementById(id).getContext("2d");
			
			var steps = 10;
			var options = {
				scaleShowGridLines : false,
				scaleOverride: true,
			    scaleSteps: steps,
			    scaleStepWidth: Math.ceil(100 / steps),
			    scaleStartValue: 0
			}
			var data = {
			    labels: ocdDashboard.Progress.dataLabels, 
			    datasets: [
				    {
			            label: "angst score pre exposure",
			            fillColor: "rgba(241,110,110,0.1)",
			            strokeColor: "rgba(241,110,110,0.5)",
			            pointColor: "rgba(255,255,255,1)",
			            pointStrokeColor: "rgba(241,110,110,0.5)",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(220,220,220,1)",
			            data: ocdDashboard.Progress.dataSetPre
			        },
			        {
			            label: "angst score post exposure",
			            fillColor: "rgba(228,84,83,0.2)",
			            strokeColor: "rgba(228,84,83,1)",
			            pointColor: "rgba(255,255,255,1)",
			            pointStrokeColor: "rgba(228,84,83,1)",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: ocdDashboard.Progress.dataSetPost
			        }
	            ]
			}

			var progressLineChart = new Chart(canvas).Line(data, options);

			ocdDashboard.Progress.dataSetPre = [];
			ocdDashboard.Progress.dataSetPost = [];
			ocdDashboard.Progress.dataLabels = [];
			myFunctions.disableLoader();
		},
		content: [
	
		],
		dataSetPre: [
		],
		dataSetPost: [
		],
		dataLabels:[
		],
		options: {
		    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
		    scaleBeginAtZero : true,

		    //Boolean - Whether grid lines are shown across the chart
		    scaleShowGridLines : true,
		}
	}
})();