
function getTimeColor(){
    $(".time").each(function() {
		value = $( this ).text().split(" Min")[0];
		value = value / 60;
		value = 1 - value;
		var hue=((1-value)*120).toString(10);
		$(this)[0].style.backgroundColor = ["hsl(",hue,",100%,50%, .3)"].join("");
	});
}

function parseStopData() {
	departures = json['departures'];
	for (i = 0; i < departures.length; i++) {
		route = departures[i]['headsign'];
		route_short = route.split(" ")[0];
		route_name = route.substr(route.indexOf(" ") + 1);
		route_color = departures[i]['route']['route_color'];
		route_color_r = hexToRgb(route_color).r;
		route_color_g = hexToRgb(route_color).g;
		route_color_b = hexToRgb(route_color).b; 
		route_text_color = departures[i]['route']['route_text_color'];
		eta = departures[i]['expected_mins'];
		$("#stop-data").append("<div class='departure' style='color: " + "#" + route_text_color + ";'>" + "<span class='route-short' style='" + "background-color: rgba(" + route_color_r + ", " + route_color_g + ", " + route_color_b + ", " + "1.0)" + ";'>" + route_short + "</span>" + "<span class='route-name'>" + route_name + "</span>" + "<span class='time'>" + eta + " Min" + "</span>" + "</div>");
	}
	if ($('#stop-data').html() == "") {
		$("#stop-data").append("<p>No buses coming...</p>");
	}
}
