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
			case "logout_btn":
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
	},
	getMonthName: function (month) {
		var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    	return monthNames[month];
	},
	WeekToDate: function (w) {
		var simple = new Date((new Date).getFullYear(), 0, 1 + (w - 1) * 7);
	    var dow = simple.getDay();
	    var ISOweekStart = simple;
	    if (dow <= 4)
	        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
	    else
	        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
	    return ISOweekStart;
	},
	getCurrentWeek: function() {
        var onejan = new Date((new Date).getFullYear(), 0, 1);
        return Math.ceil((((new Date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    },
	expand: function (id) {
		var el = document.getElementById(id);
		el.parentNode.classList.toggle("active"); 
		el.classList.toggle("active");
    },
    normalTime: function (parseTime) {
    	var year = parseTime.substring(0, 4);
    	var month = parseTime.substring(5, 7);
    	var day = parseTime.substring(8, 10);
    	return day + "-" + month + "-" + year;
    }	

};	