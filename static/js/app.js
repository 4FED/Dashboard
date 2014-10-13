(function () {
	apiGetCalls = {
		login: function (email, password) {
			// xhr.trigger("get", "http://oege.ie.hva.nl/~schrava001/4FED/api/index.php?function=login&email=" + email + "&password=" + password + "", function (e) {
			// 	console.log(e);	
			// }, null);
			console.log("waaat");
		}
	}	
	SHOTGUN.listen("formSubmit", apiGetCalls.login);
})();