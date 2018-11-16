
function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
	} : null;
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
	if (saved_filters == null || saved_filters.length == 0) {
		var selected_filters = [];
	}
	else {
		var selected_filters = saved_filters.split(",");
	}
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