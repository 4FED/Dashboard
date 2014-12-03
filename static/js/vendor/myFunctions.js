var myFunctions = {
	cleanStrings: function(string) {
			return string.replace(/(^\-+|[^a-zA-Z0-9\/_| -]+|\-+$)/g, '').toLowerCase().replace(/[\/_| -]+/g, '-');
    },
    getOneEl: function(el){
		return document.querySelector(el);
	},
	getAllEl: function (el){
		return document.querySelectorAll(el);
	},
	execute: function(){
		var attribute = this.getAttribute("id");
		console.log(attribute);
		switch(attribute){
			case "loginButton":
				ocdDashboard.User.login();
				break;
			case "registreerButton":
				ocdDashboard.User.signUp();
				break;
			case "logoutButton":
				ocdDashboard.User.logout();
				break;
		}
	},
	AddClickEvent: function(el){
		var clickElement =  myFunctions.getAllEl(el);
		for(var i=0;i<clickElement.length;i++){
        	clickElement[i].addEventListener("click",  myFunctions.execute, false);
    	}
	},
	showSliderVal: function(slider, output){
		var sliderInput = myFunctions.getOneEl(slider);	
		var sliderOutput = myFunctions.getOneEl(output);
    	sliderInput.oninput  = function () {
			sliderOutput.innerHTML = sliderInput.value;
		}	
	},
	clearForm: function (form) {
		_.each(form.elements, function(el){
			    	if (el.type == "range") {
			    		el.value = 50;
			    	} else if(el.type != "button") {			    		
			    		el.value = null;
			    	}
			    })
	},
	disableLoader: function() {		
		var loaderIcons = myFunctions.getAllEl(".loaderIcon");
		_.each(loaderIcons, function (loaderIcon) {
			loaderIcon.style.display = "none";
		})				
	},
	enableLoader: function () {
		var loaderIcons = myFunctions.getAllEl(".loaderIcon");
		_.each(loaderIcons, function (loaderIcon) {
			loaderIcon.style.display = "block";
		})	
	},
	liveSearch: function (input, data, key) {
			var inputField = myFunctions.getOneEl(input);			
			var dataObjects = data;

			inputField.addEventListener('input', function(){

				var inputValue = inputField.value;
				var re = new RegExp('^'+inputValue, 'i'); // regular expression that selects if string starts with input, and not case sensitive

				_.each(dataObjects, function (object) {
					var el = object[key];
					if (el.search(re) != -1) {
						return object;
					};
				});		
			}, true);
		}	

};	