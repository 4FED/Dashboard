var ocdDashboard = ocdDashboard || {};
window.onload = function (){	
	ocdWebApp.router.init();
	myFunctions.AddClickEvent(".eventButton");
};

(function () {
	Parse.initialize("e2pCNYD20d5ynvUPKyUud5G20evDRI4pmHiqrvPw", "6IEcqXamMkjJsssIaFPiTDKH1azNB6wOtR5kuAIP");


	// Router object
	// sets router parameters
	var sections = {
		home: function (){
			Transparency.render(myFunctions.getOneEl(".exercisesList"), ocdWebApp.Exercise.content, ocdWebApp.Exercise.directives);
		},
		toggle: function (show, hide) {
			var show = myFunctions.getOneEl("." + show);
			var hide =  myFunctions.getAllEl("." + hide);
			for (var i = 0; i < hide.length; i++) {
				hide[i].classList.remove('active');
			};

			show.classList.add('active');				
		} 
	};

	ocdWebApp.router = {
		init: function () {
			routie({
	    		'user/:type': function (type) {
	    			sections.toggle("user", "content");
	    			sections.toggle(type, "userForm");
	    			if (type == "login" && Parse.User.current()) {	    				
				    	window.location.href = "http://localhost/4fed/Webapp/#home";
	    			};
	    		},
	    		home: function() {	
	    			// if (Parse.User.current()) {
	    			// 	sections.toggle("home", "content");
	    			// }else{
	    			// 	window.location.replace("http://localhost/4fed/Webapp/#user/login");
	    			// };
	    		}
			});
		} 
	};
	
})();