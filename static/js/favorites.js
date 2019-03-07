
var favorites = localStorage.getItem('favs');
if (favorites == null || favorites.length == 0) {
	var current_favorites = [];
} else {
	var current_favorites = favorites.split(",");
}

function listFavorites() {
    for (var i = 0; i < current_favorites.length; i++) {
        var fav_split = current_favorites[i].split('###');
        $('#favorites').append("<li><a href='/stop=" + fav_split[0] + "_" + fav_split[1] + "'>" + fav_split[1] + "</a></li>" );
    }
    var mylist = $('#favorites');
    var listitems = mylist.children('li').get();
    listitems.sort(function(a, b) {
        return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
    })
    $.each(listitems, function(idx, itm) { mylist.append(itm); });
}

function checkIfStopIsFavorite(stop_id) {	
	if (current_favorites.length == 0) {
		$('.fa-star').attr("aria-label", "Not Starred");
	}
	for (var i = 0; i < current_favorites.length; i++) {
		var fav_split = current_favorites[i].split('###');
		var test_id = fav_split[0];
		if ( test_id == stop_id ) {
			$('.fa-star').addClass( "fav-active" );
			$('.fa-star').attr("aria-label", "Starred");
		} else {
			$('.fa-star').attr("aria-label", "Not Starred");
		}
    }
}

function addRemoveFavorite(item, stop_id, stop_name) {
	if (item.hasClass( "fav-active") ) {
		item.removeClass( "fav-active" );
		$('.fa-star').attr("aria-label", "Not Starred");
	} else {
		item.addClass( "fav-active" );
		$('.fa-star').attr("aria-label", "Starred");
	}

	var fav_ids = [];
	for (var i = 0; i < current_favorites.length; i++) {
		fav_ids.push(current_favorites[i].split('###')[0]);
	}

	var fav_string = stop_id + "###" + stop_name;
	var fav_id = stop_id;
	if ( fav_ids.indexOf(fav_id) !== -1 ) {
		var index = fav_ids.indexOf(fav_id);
		current_favorites.splice(index, 1);
	} else {
		current_favorites.push(fav_string);
	}
	localStorage.setItem('favs', current_favorites);
}