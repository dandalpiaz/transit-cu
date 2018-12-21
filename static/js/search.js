
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
				$("#spinner").css("display","none");
				$('#search-results').html("");
				$('#search-results').append("<li><em>No stops found</em></li>");
				$('#search-results').show();
			}
			else {
				$("#spinner").css("display","none");
				$('#search-results').html("");
				for (i = 0; i < data.length; i++) {
					stopName = data[i]['result']['name'];
					stopID = data[i]['result']['id'];
					$('#search-results').append("<li>" + "<a href='/stop=" + stopID + "_" + stopName + "'>" + stopName + "</a>" + "</li>");
				}
				$('#search-results').show();
			}
		});
	} catch(err) {
		$('#search-results').html("<li><em>Error retrieving search result; try again later.</em></li>");
		$('#search-results').show();
	}
};

$( document ).ready(function() {
	$("#searchTxt").keyup(function(){
		searchVar = document.getElementById("searchTxt").value;
		if (searchVar == "") {
			$('#search-results').hide();
			$("#spinner").css("display","none");
			$('#search-results').html("");
			//clearTimeout(timer);
		} else {
			$("#spinner").css("display","block");
			$('#search-results').html("");
			$('#search-results').hide();
			delay(function(){
				if (searchVar !== "") {
					getSearchData();
				}
			}, 500 );
		}		
	});
});