
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
		return
	}
    baseUrl = "https://search.mtd.org/v1.0.0/stop/suggest/";
    url = baseUrl + searchVar;
	$('#result').html("");
    $.getJSON(url, function(data) {
		for (i = 0; i < data.length; i++) {
			stopName = data[i]['result']['name'];
			stopID = data[i]['result']['id'];
			$('#result').append("<li>" + "<a href='/stop=" + stopID + "'>" + stopName + "</a>" + "</li>");
		}
    });       
};

$( document ).ready(function() {
    $("#searchTxt").keyup(function(){
        console.log("keyup on input")
		delay(function(){
			getSearchData();
		}, 500 );
	});
});