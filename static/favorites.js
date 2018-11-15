
function listFavorites() {
    var favorites = localStorage.getItem('favs');
    var favorites_array = favorites.split(',');

    for (var i = 0; i < favorites_array.length; i++) {
        var fav_split = favorites_array[i].split('###');
        $('.favorites').append("<li><a href='/stop=" + fav_split[0] + "'>" + fav_split[1] + "</a></li>" );
    }
    var mylist = $('.favorites');
    var listitems = mylist.children('li').get();
    listitems.sort(function(a, b) {
        return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
    })
    $.each(listitems, function(idx, itm) { mylist.append(itm); });
}

function checkIfStopIsFavorite() {
	var favorites = localStorage.getItem('favs');
	if (favorites == null || favorites.length == 0) {
		var current_favorites = [];
	}
	else {
		var current_favorites = favorites.split(",");
	}
	
	for (var i = 0; i < current_favorites.length; i++) {
		var fav_split = current_favorites[i].split('###');
		var test_title = fav_split[1];
		if ( test_title == $('#title').html() ) {
			$('.fa-star').addClass( "fav-active" );
		}
    }
}

function addRemoveFavorite(item) {
	
	if (item.hasClass( "fav-active") ) {
		item.removeClass( "fav-active" );
	}
	else {
		item.addClass( "fav-active" );
	}

	var favorites = localStorage.getItem('favs');
	if (favorites == null || favorites.length == 0) {
		var current_favorites = [];
	}
	else {
		var current_favorites = favorites.split(",");
	}

	var fav_string = document.location.href.split("=")[1] + "###" + $('#title').html();

	if (current_favorites.includes(fav_string)) {
		var index = current_favorites.indexOf(fav_string);
		current_favorites.splice(index, 1);
	}
	else {
		current_favorites.push(fav_string);
	}

	localStorage.setItem('favs', current_favorites);
}

//localStorage.setItem('favs','PLAZA###Transit Plaza, FOXSURS###Fox Drive at SURS');


/*
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
*/