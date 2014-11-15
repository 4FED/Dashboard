var ocdDashboard = ocdDashboard || {};
(function () {
	Parse.initialize("e2pCNYD20d5ynvUPKyUud5G20evDRI4pmHiqrvPw", "6IEcqXamMkjJsssIaFPiTDKH1azNB6wOtR5kuAIP");
	ocdDashboard.Patient = {
		get: function (type) {
			ocdDashboard.Patient.content = [];
			var user = Parse.User.current();
			var patientQuery = new Parse.Query(Parse.User);
			patientQuery.equalTo("hasDoctor", user.id);
			patientQuery.find({
				success: function(patienten) {
				  	_.each(patienten, function(patient){
				  		var object = {};
				  		object.id = patient.id;
				  		object.initials = patient.get("initials");
				  		object.firstName = patient.get("firstname");
				  		object.surname = patient.get("surname");
				  		ocdDashboard.Patient.content.push(object);
				  	});
				  	SHOTGUN.fire("getPatienten")
				},
				error: function(patienten, error) {
					console.log('get patienten failed ' + error.message);
				}
			});
		},
		content: [
		],
		directives: {
		    myName:{
		    	text: function() {
		    		return this.initials + " " + this.surname; 
		    	}
		    },
		    myLink:{
		    	href: function() { return "patient.html#" + this.id; }
		    },
		}
	}	
})();