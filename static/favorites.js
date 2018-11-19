
var favorites = localStorage.getItem('favs');
if (favorites == null || favorites.length == 0) {
	var current_favorites = [];
} else {
	var current_favorites = favorites.split(",");
}

function listFavorites() {
    for (var i = 0; i < current_favorites.length; i++) {
        var fav_split = current_favorites[i].split('###');
        $('.favorites').append("<li><a href='/stop_id=" + fav_split[0] + "/name=" + fav_split[1] + "'>" + fav_split[1] + "</a></li>" );
    }
    var mylist = $('.favorites');
    var listitems = mylist.children('li').get();
    listitems.sort(function(a, b) {
        return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
    })
    $.each(listitems, function(idx, itm) { mylist.append(itm); });
}

function checkIfStopIsFavorite(name) {	
	for (var i = 0; i < current_favorites.length; i++) {
		var fav_split = current_favorites[i].split('###');
		var test_title = fav_split[1];
		if ( test_title == name ) {
			$('.fa-star').addClass( "fav-active" );
		}
    }
}

function addRemoveFavorite(item, name) {
	if (item.hasClass( "fav-active") ) {
		item.removeClass( "fav-active" );
	} else {
		item.addClass( "fav-active" );
	}

	var fav_string = document.location.href.split("=")[1].split("/name")[0] + "###" + name;
	if (current_favorites.includes(fav_string)) {
		var index = current_favorites.indexOf(fav_string);
		current_favorites.splice(index, 1);
	} else {
		current_favorites.push(fav_string);
	}
	localStorage.setItem('favs', current_favorites);
}