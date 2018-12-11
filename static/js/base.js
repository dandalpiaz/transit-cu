
function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
	} : null;
}

$(document).ready(function() {
	$('#filter-toggle').click(function() {
		$('#filters').slideToggle("fast");
		$(this).toggleClass("fa-filter fa-times");
	});

	$('#filter-update-toggle').click(function() {
		$('#filters').slideToggle("fast");
		$('#filter-toggle').toggleClass("fa-filter fa-times");
	});
})

$(document).mouseup(function(e) {
    var element1 = $("#filters");
	var element2 = $("#filter-toggle");
	var element3 = $("#filter-update-toggle");

    // if the target of the click isn't the container nor a descendant of the container
    if (!element1.is(e.target) && element1.has(e.target).length === 0 && !element2.is(e.target) && !element3.is(e.target)) 
    {
		if ( $('#filters').is(':visible') ) {
			element1.slideToggle("fast");
			$('#filter-toggle').toggleClass("fa-filter fa-times");
		}
    }
});
