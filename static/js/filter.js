
var route_number_filters = localStorage.getItem('route_number_filters');
if (route_number_filters == null || route_number_filters.length == 0) {
	var route_number_filters = [];
} else {
	var route_number_filters = route_number_filters.split(",");
}

var route_direction_filters = localStorage.getItem('route_direction_filters');
if (route_direction_filters == null || route_direction_filters.length == 0) {
	var route_direction_filters = [];
} else {
	var route_direction_filters = route_direction_filters.split(",");
}

function updateActiveFilterButtons() {
	$('.route-number-filter').each(function() {
		if (route_number_filters.indexOf( $(this).text()) !== -1 ) {
			$(this).css('border-radius', '50%');
			$(this).attr('aria-label', 'Filter Active');
		} else {
			$(this).css('border-radius', '2px');
			$(this).attr('aria-label', 'Filter Inactive');
		}
	});
	
	if (route_number_filters.length == 0) {
		$('.route-number-filter').each(function() {
			$(this).css('border-radius', '50%');
			$(this).attr('aria-label', 'Filter Inactive');
		});
	}

	$('.route-direction-filter').each(function() {
		if (route_direction_filters.indexOf( $(this).text()) !== -1 ) {
			$(this).css('border-radius', '50%');
			$(this).attr('aria-label', 'Filter Active');
		} else {
			$(this).css('border-radius', '2px');
			$(this).attr('aria-label', 'Filter Inactive');
		}
	});
	
	if (route_direction_filters.length == 0) {
		$('.route-direction-filter').each(function() {
			$(this).css('border-radius', '50%');
			$(this).attr('aria-label', 'Filter Inactive');
		});
	}
}

function showHideDepartures() {
	$('.departure:visible').last().css("border-bottom", "1px solid #bbb");
	$("#no-filtered-results").html("");

	if (route_number_filters == "" && route_direction_filters == "") {
		$('.route-short').each(function() {
			$(this).parent().show();
		});
	} else {
		$('.route-short').each(function() {
			if (route_number_filters.indexOf( $(this).text().slice(0, -1)) !== -1 && route_direction_filters.indexOf( $(this).text().slice(-1)) !== -1 ) {
				$(this).parent().show();
			} else {
				$(this).parent().hide();
			}
		});
	}

	$('.departure:visible').last().css("border-bottom", "0");

	if ( $('.departure:visible').length == 0 ) {
		$("#no-filtered-results").append("<p>No buses coming with selected filters...</p>");
	}
}

function updateNumberFilters(clicked_item) {
	var route_num = clicked_item.text();
	if (route_number_filters.indexOf(route_num) !== -1 ) {
		var index = route_number_filters.indexOf(route_num);
		route_number_filters.splice(index, 1);
	} else {
		route_number_filters.push(route_num);
	}
	localStorage.setItem('route_number_filters', route_number_filters);
}

function updateDirectionFilters(clicked_item) {
	var route_dir = clicked_item.text();
	if (route_direction_filters.indexOf(route_dir) !== -1 ) {
		var index = route_direction_filters.indexOf(route_dir);
		route_direction_filters.splice(index, 1);
	} else {
		route_direction_filters.push(route_dir);
	}
	localStorage.setItem('route_direction_filters', route_direction_filters);
}

function printActiveFilters() {
	$('#current-filters').html("");

	if (route_number_filters.length == 0) {
		$('#current-filters').append(" none");
		$('#current-filters-parent').css("margin-top", "5px");
	}

	for (filter in route_number_filters) {
		$('#current-filters').append("<span class='active-filter-circle'>" + route_number_filters[filter] + "</span>");
	}
}