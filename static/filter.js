
function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
	} : null;
}

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

function updateActiveFilterButtons() {
	var saved_filters = localStorage.getItem('filter');
	if (saved_filters == null || saved_filters.length == 0) {
		var selected_filters = [];
	}
	else {
		var selected_filters = saved_filters.split(",");
	}

	$('.route-short-filter').each(function() {
		if (selected_filters.includes($(this).text())) {
			$(this).css('opacity', '1.0');
		}
		else {
			$(this).css('opacity', '0.5');
		}
	});
	
	if (selected_filters.length == 0) {
		$('.route-short-filter').each(function() {
			$(this).css('opacity', '1.0');
		});
	}
}

function showHideDepartures() {
	
	$('.departure:visible').last().css("border-bottom", "1px solid #bbb");
	$("#no-filtered-results").html("");

	var saved_filters = localStorage.getItem('filter');
	var selected_filters = saved_filters.split(",");
	if (selected_filters == "") {
		$('.route-short').each(function() {
			$(this).parent().show();
		});
	}
	else {
		$('.route-short').each(function() {
			if (!selected_filters.includes($(this).text().slice(0, -1))) {
				$(this).parent().hide();
			}
			else {
				$(this).parent().show();
			}
		});
	}
	$('.departure:visible').last().css("border-bottom", "0");

	if ( $('.departure:visible').length == 0 ) {
		$("#no-filtered-results").append("<p>No buses coming with selected filters...</p>");
	}
}

function updateSavedFilters(clicked_item) {
	var saved_filters = localStorage.getItem('filter');
	if (saved_filters == null || saved_filters.length == 0) {
		var selected_filters = [];
	}
	else {
		var selected_filters = saved_filters.split(",");
	}
	var route_num = clicked_item.text();
	if (selected_filters.includes(route_num)) {
		var index = selected_filters.indexOf(route_num);
		selected_filters.splice(index, 1);
	}
	else {
		selected_filters.push(route_num);
	}

	localStorage.setItem('filter', selected_filters);
}