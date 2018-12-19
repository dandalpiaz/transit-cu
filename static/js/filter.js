
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

	$('.route-short').each(function() {
		if (route_number_filters == "" && route_direction_filters == "") {
			$(this).parent().show();
		} else if (route_number_filters.indexOf( $(this).text().slice(0, -1)) !== -1 && route_direction_filters == "") {
			$(this).parent().show();
		} else if (route_number_filters == "" && route_direction_filters.indexOf( $(this).text().slice(-1)) !== -1) {
			$(this).parent().show();
		} else if (route_number_filters.indexOf( $(this).text().slice(0, -1)) !== -1 && route_direction_filters.indexOf( $(this).text().slice(-1)) !== -1 ) {
			$(this).parent().show();
		} else {
			$(this).parent().hide();
		}
	});

	$('.departure:visible').last().css("border-bottom", "0");

	if ( $('.departure:visible').length == 0 ) {
		$("#no-filtered-results").append("<p>No buses coming with selected filters...</p>");
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

	if (route_number_filters.length == 0) {
		$('#current-filters').append(" none");
		$('#current-filters-parent').css("margin-top", "5px");
	}

	for (filter in route_number_filters) {
		$('#current-filters').append("<span class='active-filter-circle'>" + route_number_filters[filter] + "</span>");
	}
}