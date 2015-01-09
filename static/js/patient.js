var ocdDashboard = ocdDashboard || {};
(function () {
	Parse.initialize("e2pCNYD20d5ynvUPKyUud5G20evDRI4pmHiqrvPw", "6IEcqXamMkjJsssIaFPiTDKH1azNB6wOtR5kuAIP");
	ocdDashboard.Patient = {
		init: function (type) {
			var userToDoctor = Parse.Object.extend("userToDoctor");
			if (type == "post") {
				return new userToDoctor();
			} else if(type == "get"){
				return new Parse.Query(userToDoctor);
			} 
		},
		get: function (type) {
			var patientenArray = [];
			var userDoctorQuery = this.init("get");
			var user = Parse.User.current();
			userDoctorQuery.equalTo("doctor", user.id);
			userDoctorQuery.find({
				success: function(patienten) {
					if (patienten.length < 1) {
						SHOTGUN.fire("getPatienten");
					}else{
				  	_.each(patienten, function(patient){
				  		var patientQuery = new Parse.Query(Parse.User);
						patientQuery.equalTo("objectId", patient.get("patient"));
						patientQuery.find({ 
							success: function(patienten) {
										_.each(patienten, function (patient) {
											patientenArray.push(patient);
										})
									  	var patienten  = JSON.stringify(patientenArray);
									    sessionStorage.setItem("patienten", patienten);
									  	SHOTGUN.fire("getPatienten");
									},
									error: function(doctors, error) {
										console.log('get doctors failed ' + error.message);
									}
								});
				  	});
				  };
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
		setMotivation: function (elId) {
			var patient = JSON.parse(sessionStorage.getItem("patientDetails"));	
			var motivation = document.getElementById(elId).value.toString();
			var PatientMotivation = Parse.Object.extend("patientMotivation");
			var patientMotivation = new PatientMotivation;
			patientMotivation.set("patient", patient.objectId);
			patientMotivation.set("motivation", motivation);

			patientMotivation.save(null,{
				success: function (patientMotivation) {
					console.log(patientMotivation);
					alert("het motivatie bericht is geplaatst");
				},
				error: function (error) {
					console.log("Failed saving patientMotivation: " + error.message);
				}
			})
		},
		directives: {
			myId:{
				id: function () { return "G" + this.objectId; }
			},
		    myName:{
		    	text: function() {
		    		return this.initials + " " + this.surname; 
		    	}
		    },
		    myLink:{
		    	href: function() { return "patient.html#" + this.objectId; }
		    },
		    profilePicture:{
		    	src: function() {
		    		if (this.profilePicture) {
		    			return this.profilePicture.url;
		    		} else {
		    			return "static/images/icons/femaleIcon.png";
		    		}
		    	}
		    },
		}
	}	
})();