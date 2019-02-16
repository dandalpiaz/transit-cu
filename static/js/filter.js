
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

var route_misc_filters = localStorage.getItem('route_misc_filters');
if (route_misc_filters == null || route_misc_filters.length == 0) {
	var route_misc_filters = [];
} else {
	var route_misc_filters = route_misc_filters.split(",");
}

function updateActiveFilterButtons() {
	$('.route-number-filter').each(function() {
		if (route_number_filters.indexOf( $(this).text()) !== -1 ) {
			$(this).css('border-radius', '50%');
			$(this).attr('aria-label', 'Filter Active');
			$(this).css('opacity', '1.0');
		} else {
			$(this).css('border-radius', '2px');
			$(this).attr('aria-label', 'Filter Inactive');
			$(this).css('opacity', '0.75');
		}
	});
	
	if (route_number_filters.length == 0) {
		$('.route-number-filter').each(function() {
			$(this).css('border-radius', '50%');
			$(this).attr('aria-label', 'Filter Inactive');
			$(this).css('opacity', '1.0');
		});
	}

	$('.route-direction-filter').each(function() {
		if (route_direction_filters.indexOf( $(this).text()) !== -1 ) {
			$(this).css('border-radius', '50%');
			$(this).attr('aria-label', 'Filter Active');
			$(this).css('opacity', '1.0');
		} else {
			$(this).css('border-radius', '2px');
			$(this).attr('aria-label', 'Filter Inactive');
			$(this).css('opacity', '0.75');
		}
	});
	
	if (route_direction_filters.length == 0) {
		$('.route-direction-filter').each(function() {
			$(this).css('border-radius', '50%');
			$(this).attr('aria-label', 'Filter Inactive');
			$(this).css('opacity', '1.0');
		});
	}

	$('.route-misc-filter').each(function() {
		if (route_misc_filters.indexOf( $(this).text()) !== -1 ) {
			$(this).css('border-radius', '50%');
			$(this).attr('aria-label', 'Filter Active');
			$(this).css('opacity', '1.0');
		} else {
			$(this).css('border-radius', '2px');
			$(this).attr('aria-label', 'Filter Inactive');
			$(this).css('opacity', '0.75');
		}
	});
	
	if (route_misc_filters.length == 0) {
		$('.route-misc-filter').each(function() {
			$(this).css('border-radius', '2px');
			$(this).attr('aria-label', 'Filter Inactive');
			$(this).css('opacity', '0.75');
		});
	}
}

function showHideDepartures() {
	$('.departure:visible').last().css("border-bottom", "1px solid #bbb");
	$("#no-filter-results").html("");

	$('.route-short').each(function() {

		number_empty = false;
		direction_empty = false;
		misc_empty = false;

		if (route_number_filters == "") {
			number_empty = true;
		}
		if (route_direction_filters == "") {
			direction_empty = true;
		}
		if (route_misc_filters == "") {
			misc_empty = true;
		}

		number_match = false;
		direction_match = false;
		misc_match = false;

		if (route_number_filters.indexOf( $(this).text().replace(/\D/g,'')) !== -1) {
			number_match = true;
		}
		if (route_direction_filters.indexOf( $(this).text().slice(-1)) !== -1) {
			direction_match = true;
		}
		if ( $(this).next().text().indexOf("hopper") == -1  ) {
			misc_match = true;
		}

		// if each filter criteria is either a match or empty, show
		if ( (number_match || number_empty) && (direction_match || direction_empty) && (misc_match || misc_empty) ) {
			$(this).parent().show();
		} else {
			$(this).parent().hide();
		}

	});

	$('.departure:visible').last().css("border-bottom", "0");

	if ( $('.departure:visible').length == 0 ) {
		$("#no-filter-results").html("<p>No buses coming with selected filters...</p>");
	}
}

function updateStoredFilters(clicked_item) {

	var filter_criteria = clicked_item.text();
	
	if ( clicked_item.hasClass('route-number-filter') ) {
		var filter_criteria_type = route_number_filters;
		var filter_criteria_type_name = "route_number_filters";
	}
	if ( clicked_item.hasClass('route-direction-filter') ) {
		var filter_criteria_type = route_direction_filters;
		var filter_criteria_type_name = "route_direction_filters";
	}
	if ( clicked_item.hasClass('route-misc-filter') ) {
		var filter_criteria_type = route_misc_filters;
		var filter_criteria_type_name = "route_misc_filters";
	}
	
	if (filter_criteria_type.indexOf(filter_criteria) !== -1 ) {
		var index = filter_criteria_type.indexOf(filter_criteria);
		filter_criteria_type.splice(index, 1);
	} else {
		filter_criteria_type.push(filter_criteria);
	}
	localStorage.setItem(filter_criteria_type_name, filter_criteria_type);
}

function printActiveFilters() {
	$('#current-filters').html("");

	if (route_number_filters.length == 0 && route_direction_filters.length == 0 && route_misc_filters.length == 0) {
		$('#current-filters-parent').hide();
	} else {
		$('#current-filters-parent').show();
	}

	for (filter in route_number_filters) {
		$('#current-filters').append("<span class='active-filter-circle'>" + route_number_filters[filter] + "</span>");
	}

	for (filter in route_direction_filters) {
		$('#current-filters').append("<span class='active-filter-circle'>" + route_direction_filters[filter] + "</span>");
	}

	for (filter in route_misc_filters) {
		$('#current-filters').append("<span class='active-filter-circle active-filter-circle-misc'>" + route_misc_filters[filter] + "</span>");
	}
}