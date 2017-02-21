//Hacer que autofocus se active cada vez que el input sea visible

var domain = "en";
var search = $(".input")
var english = "Go to a random article ";
var searchEn = "Search";
var spanish = "Ir a un artículo aleatorio ";
var searchEs = "Búsqueda";
var german = "Zu einem zufälligen Artikel ";
var searchDe = "Suchen";
var input = $(".input");
var random;
var value;
var found;
var results = [];
var keep = "";
var more = "continue reading";
var mas = "sigue leyendo";
var mehr = "weiter lessen";

$(document).ready(function() {
	select();
	random();
	searchForm();
	enter();
});

function randomSearch() {
	$(".span").html(lan);
	$(".input").attr("placeholder", searchLan);
	$(".redir").attr("href", random);
}
	

function searchForm() {
	$(".fa-search").on("click", function() {
		$("input").fadeToggle("hide");
	});
};

function select() {
	$(".flag").on("click", function() {
		$(".flag").removeClass("selected");
		$(this).addClass("selected");
	});
}

function random() {
	$(".flag").on("click", function() {
		domain = $(".selected").attr("id");
		random = ("https://" + domain + ".wikipedia.org/wiki/Special:Random");
		if (domain === "en") {
			lan = english;
			searchLan = searchEn;
			randomSearch();
		} else if (domain === "es") {
			lan = spanish;
			searchLan = searchEs;
			randomSearch();
		} else {
			lan = german;
			searchLan = searchDe;
			randomSearch();
		}
	});
}

function enter() {
	input.keyup(function(event) {
		if(event.keyCode == 13) { 
    		event.preventDefault();
	    	value = $("input[type='text']").val();
	    	found = $.getJSON("https://" + domain + ".wikipedia.org/w/api.php?action=query&list=search&srsearch=" + value + "&format=json&callback=?", function(data) {
	    		var rawData = JSON.stringify(data);
	    		var json = JSON.parse(rawData);

	    		if (domain === "en") {
	    			keep = more;
	    		} else if (domain === "es") {
	    			keep = mas;
	    		} else {
	    			keep = mehr;
	    		}

	    		$(".article").remove();

	    		for (var i = 0; i < json.query.search.length; i++) {
		    		results.push({title: json.query.search[i].title, snippet: json.query.search[i].snippet});
		    		console.log(results[i]);
		    		$(".results").append("<div><h1>" + json.query.search[i].title + "</h1><p>" + json.query.search[i].snippet + "... <a href='https://" + domain + ".wikipedia.org/wiki/" + json.query.search[i].title + "'' target='_blank'><span class='link'>" + keep + "</span> <i class='fa fa-arrow-right' aria-hidden='true'></i></p>")
		    		$(".results div").addClass("article");
		    		$(".results h1").addClass("title");
		    		$(".results p").addClass("text");

	    		}
		    	//CLEAN INPUT FIELD
	    		$("input[type='text']").val("");
		    	$("input").fadeToggle("hide");
	    		
	    	});
	    };
	});
}