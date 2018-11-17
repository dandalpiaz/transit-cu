
var delay = (function(){
	var timer = 0;
	return function(callback, ms){
	  clearTimeout (timer);
	  timer = setTimeout(callback, ms);
	};
})();

function getSearchData() {
	searchVar = document.getElementById("searchTxt").value;
    if (searchVar == "") {
		$('#result').html("");
		localStorage.setItem('search', searchVar);
		return
	}

    baseUrl = "https://search.mtd.org/v1.0.0/stop/suggest/";
	url = baseUrl + searchVar;
	try {
		var searching = $.getJSON(url, function(data) {
			if (data.length == 0) {
				$('#result').html("");
				$('#result').append("<li><em>No stops found</em></li>");
			}
			else {
				$('#result').html("");
				for (i = 0; i < data.length; i++) {
					stopName = data[i]['result']['name'];
					stopID = data[i]['result']['id'];
					$('#result').append("<li>" + "<a href='/stop=" + stopID + "'>" + stopName + "</a>" + "</li>");
				}
				localStorage.setItem('search', searchVar);
			}
			
		});
		setTimeout(function() {
			searching.abort();
			$('#result').append("<li><em>Error retrieving search result; try again later.</em></li>");
		}, 2000);
	}

	catch {
		$('#result').append("<li><em>Error retrieving search result; try again later.</em></li>");
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
		delay(function(){
			getSearchData();
		}, 500 );
	});
});