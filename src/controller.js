function SearchForm($scope) {
  $scope.text = '';
  $scope.submit = function() {
	startSingleArtistSearch(this.text);
	this.text = '';
    
  };
}

angular.module('ConcertFinder', [])
.directive('dropZone', function($document){
	return function(scope, element, attr){
		element.bind('drop', function(event){
			event.stopPropagation();
			event.preventDefault();
			startPlaylistSearch(event.originalEvent.dataTransfer.files[0]);
		});
		element.bind('dragover', function(event){
			event.stopPropagation();
			event.preventDefault();
			event.originalEvent.dataTransfer.dropEffect = 'copy'; 
		});
	}
});



var APP_KEY = "hgGsRVHKCBfDXmTv";
var foundEvents = [];
var artistsToQuery;
 
 
function startSingleArtistSearch(artist) {
	resetGui();
	queryArtists([artist]);
}

function startPlaylistSearch(file) {
	resetGui();
	extractArtists(file, function(artists){
		queryArtists(artists);
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
 