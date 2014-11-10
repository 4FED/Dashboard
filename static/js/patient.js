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
				  	console.log(patienten);
				},
				error: function(patienten, error) {
					console.log('get patienten failed ' + error.message);
				}
			});
		},
		content: [
		],
	}	
})();