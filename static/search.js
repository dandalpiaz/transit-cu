
var delay = (function(){
	var timer = 0;
	return function(callback, ms){
	  clearTimeout (timer);
	  timer = setTimeout(callback, ms);
	};
})();

function getSearchData() {
	searchVar = document.getElementById("searchTxt").value;
    baseUrl = "https://search.mtd.org/v1.0.0/stop/suggest/";
	url = baseUrl + searchVar;
	try {
		$.getJSON(url, function(data) {
			if (data.length == 0) {
				$(".loader").css("display","none");
				$('#result').html("");
				$('#result').append("<li><em>No stops found</em></li>");
			}
			else {
				$(".loader").css("display","none");
				$('#result').html("");
				for (i = 0; i < data.length; i++) {
					stopName = data[i]['result']['name'];
					stopID = data[i]['result']['id'];
					$('#result').append("<li>" + "<a href='/stop=" + stopID + "'>" + stopName + "</a>" + "</li>");
				}
				localStorage.setItem('search', searchVar);
			}
		});
	} catch {
		$('#result').html("<li><em>Error retrieving search result; try again later.</em></li>");
	}
};

$( document ).ready(function() {
	var saved_search = localStorage.getItem('search');

	if (saved_search == null || saved_search == "") {
	}
	else {
		document.getElementById("searchTxt").value = saved_search;
		getSearchData();
	}

	$("#searchTxt").keyup(function(){
		searchVar = document.getElementById("searchTxt").value;
		if (searchVar == "") {
			$(".loader").css("display","none");
			$('#result').html("");
			localStorage.setItem('search', searchVar);
		} else {
			$(".loader").css("display","block");
			$('#result').html("");
			delay(function(){
				getSearchData();
			}, 1000 );
		}		
	});
});