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
			var reroute = window.location.replace("http://fenix-app.nl/dashboard/#user/login");
			routie({
	    		'user/:type': function (type) {
	    			console.log(type);  			
	    			if (type == "login" && Parse.User.current()) {	    				
				    	window.location.href = "http://fenix-app.nl/dashboard/home.html";
	    			} else if(type == "login"){	    				
	    				sections.toggle("user", "content");	
	    				sections.toggle("userForm", "userForm");  
	    			} else if(type == "register"){
	    				sections.toggle("register", "content");
	    				sections.toggle("registerForm", "userForm");
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