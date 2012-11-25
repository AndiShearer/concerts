var APP_KEY = "hgGsRVHKCBfDXmTv";

var foundEvents = [];
var artistsToQuery;
 
function setupSingleArtistSearch() {
	$('#form').submit(function() {
		resetGui();
		var artist = $('#artist').val();
		queryArtists([artist]);
		$('#artist').val("");
		return false;
	});
}
	
function queryArtists(artists){
	printArtists(artists);
	
	setupProgressBar(artists.length);
		
	artistsToQuery = artists;
	foundEvents = [];
	queryArtistsRecursive();
}

function queryArtistsRecursive() {
	if (artistsToQuery.length === 0) {
		raeumeGuiAuf();
		return;
	}
	
	updateProgressBar();
	
	queryApi(artistsToQuery.shift(), function(response) {
		processResponse(response);
		queryArtistsRecursive();
	});
}

function processResponse(response){
	if (response.total_items !== "0") {
		var events = response.events.event;
		if ($.isArray(events)) {
			$.each(events, function(index, value){
				foundEvents[foundEvents.length] = value;
			});
		} else {
			foundEvents[foundEvents.length] = events;
		}
		print(events);
	}
}

function queryApi(artist, callback) {
    var oArgs = {
        app_key: APP_KEY,
        q: '"' + artist + '"',
		category: "music,concert,live,show",
        page_size: 25,
		location: "Berlin"
    };
    EVDB.API.call("/events/search", oArgs, callback);
}
 