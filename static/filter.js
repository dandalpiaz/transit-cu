
function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
	} : null;
}

function getFilterData() {
	/*var json = JSON.parse('{{ all_stops_data | tojson | safe}}');*/
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
		$("#filters").append("<span class='route-short' style='margin:1px;" + "background-color: rgba(" + route_color_r + ", " + route_color_g + ", " + route_color_b + ", " + "0.75);" + "color: " + "#" + route_text_color + ";'>" + route + "</span>");
		added.push(route);
	}
	var filterSort = $('#filters');
	var listitems = filterSort.children('span').get();
	listitems.sort(function(a, b) {
		return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
	})
	$.each(listitems, function(idx, itm) { filterSort.append(itm); });
}

function updateFilters(selected_filters) {
	$('.route-short').each(function() {
		if (selected_filters.includes($(this).text())) {
			$(this).css('opacity', '1.0');
		}
		else {
			$(this).css('opacity', '0.5');
		}
	});
	console.log(selected_filters);
	console.log(localStorage.getItem('filter'));
	
	if (selected_filters.length == 0) {
		$('.route-short').each(function() {
			$(this).css('opacity', '1.0');
		});
	}
}

$(document).ready(function() {
	getFilterData();
	var saved_filter = localStorage.getItem('filter');
	if (saved_filter == null) {
		var selected_filters = [];
	}
	else if (saved_filter.length == 0) {
		var selected_filters = [];
	}
	else {
		var selected_filters = saved_filter.split(",");
	}
	updateFilters(selected_filters);
	$('.route-short').click(function() {
		var route_num = $(this).text();
		if (selected_filters.includes(route_num)) {
			var index = selected_filters.indexOf(route_num);
			selected_filters.splice(index, 1);
		}
		else {
			selected_filters.push(route_num);
		}
		localStorage.setItem('filter', selected_filters);
		updateFilters(selected_filters);
	});
})