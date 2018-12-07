
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
					$('#result').append("<li>" + "<a href='/stop=" + stopID + "_" + stopName + "'>" + stopName + "</a>" + "</li>");
				}
				$('#result').show();
			}
		});
	} catch(err) {
		$('#result').html("<li><em>Error retrieving search result; try again later.</em></li>");
	}
};

$( document ).ready(function() {
	$("#searchTxt").keyup(function(){
		searchVar = document.getElementById("searchTxt").value;
		if (searchVar == "") {
			$('#result').hide();
			$(".loader").css("display","none");
			$('#result').html("");
			clearTimeout(timer);
		} else {
			$(".loader").css("display","block");
			$('#result').html("");
			$('#result').hide();
			delay(function(){
				getSearchData();
			}, 500 );
		}		
	});
});