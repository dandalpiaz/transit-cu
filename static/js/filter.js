
var saved_filters = localStorage.getItem('filter');
if (saved_filters == null || saved_filters.length == 0) {
	var selected_filters = [];
} else {
	var selected_filters = saved_filters.split(",");
}

function updateActiveFilterButtons() {
	$('.route-short-filter').each(function() {
		if (selected_filters.indexOf( $(this).text()) !== -1 ) {
			$(this).css('border-radius', '50%');
			$(this).attr('aria-label', 'Filter Active');
		} else {
			$(this).css('border-radius', '2px');
			$(this).attr('aria-label', 'Filter Inactive');
		}
	});
	
	if (selected_filters.length == 0) {
		$('.route-short-filter').each(function() {
			$(this).css('border-radius', '50%');
			$(this).attr('aria-label', 'Filter Inactive');
		});
	}
}

function showHideDepartures() {
	$('.departure:visible').last().css("border-bottom", "1px solid #bbb");
	$("#no-filtered-results").html("");

	if (selected_filters == "") {
		$('.route-short').each(function() {
			$(this).parent().show();
		});
	} else {
		$('.route-short').each(function() {
			if (selected_filters.indexOf( $(this).text().slice(0, -1)) !== -1 ) {
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

function updateSavedFilters(clicked_item) {
	var route_num = clicked_item.text();
	if (selected_filters.indexOf(route_num) !== -1 ) {
		var index = selected_filters.indexOf(route_num);
		selected_filters.splice(index, 1);
	} else {
		selected_filters.push(route_num);
	}
	localStorage.setItem('filter', selected_filters);
}

function printActiveFilters() {
	$('#current-filters').html("");

	if (selected_filters.length == 0) {
		$('#current-filters').append(" none");
		$('#current-filters-parent').css("margin-top", "5px");
	}

	for (filter in selected_filters) {
		$('#current-filters').append("<span class='active-filter-circle'>" + selected_filters[filter] + "</span>");
	}
}