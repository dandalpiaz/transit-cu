
function createFilterButtons() {
	all_routes = all_stops_data['routes'];
	var added = [];
	for (i = 0; i < all_routes.length; i++) {
		route = all_routes[i]['route_short_name'];
		if (added.includes(route)) {
			continue;
		}
		route_text_color = all_routes[i]['route_text_color'];
		route_color = all_routes[i]['route_color'];
		route_color_r = hexToRgb(route_color).r;
		route_color_g = hexToRgb(route_color).g;
		route_color_b = hexToRgb(route_color).b; 
		$("#filters").append("<button class='route-short-filter noselect' style='margin:1px;" + "background-color: rgba(" + route_color_r + ", " + route_color_g + ", " + route_color_b + ", " + "0.75);" + "color: " + "#" + route_text_color + ";'>" + route + "</button>");
		added.push(route);
	}
	var filterSort = $('#filters');
	var listitems = filterSort.children('button').get();
	listitems.sort(function(a, b) {
		return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
	})
	$.each(listitems, function(idx, itm) { filterSort.append(itm); });
}