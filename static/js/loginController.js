var ocdDashboard = ocdDashboard || {};	

(function () {
	Parse.initialize("e2pCNYD20d5ynvUPKyUud5G20evDRI4pmHiqrvPw", "6IEcqXamMkjJsssIaFPiTDKH1azNB6wOtR5kuAIP");

	var sections = {
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
			var reroute = window.location.replace("http://localhost:8080/4fed/Dashboard/#user/login");
			routie({
	    		'user/:type': function (type) {
	    			console.log(type);	    			
	    			sections.toggle("user", "content");
	    			sections.toggle(type, "userForm");
	    			if (type == "login" && Parse.User.current()) {	    				
				    	window.location.href = "http://localhost:8080/4fed/Dashboard/home.html";
	    			};
	    		},
	    		'': function () {
	    			reroute;
	    		}
			});
		} 
	};

	ocdDashboard.router.init();
	myFunctions.AddClickEvent(".eventButton");
	
})();