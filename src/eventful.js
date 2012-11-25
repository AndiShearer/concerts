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
	
	$('#fortschritt').show();
	$('#queryNummer').text(0);	
	$('#queriesGesamt').text(artists.length);
	$('#progressBar').width(0);
		
	artistsToQuery = artists;
	foundEvents = [];
	queryArtistsRecursive();
}

function queryArtistsRecursive() {
	if (artistsToQuery.length === 0) {
		$('#fortschritt').hide();
		$('#progressBar').width(0);
		if (!(foundEvents.length > 0)) {
			print({title : "Keine Konzerte in Berlin gefunden", start_time : "", venue_name : ""});
		}
		return;
	}
	
	$('#queryNummer').text(parseInt($('#queryNummer').text())+1);	
	var currentNumber = parseInt($('#queryNummer').text());
	var allNumbers = parseInt($('#queriesGesamt').text());
	$('#progressBar').width(currentNumber / allNumbers * $('#fortschritt').width());
	
	queryApi(artistsToQuery.shift(), function(response) {
		if (response.total_items !== "0") {
			var events = response.events.event;
			if ($.isArray(events)) {
				$.each(response.events.event, function(index, value){
					foundEvents[foundEvents.length] = value;
				});
			} else {
				foundEvents[foundEvents.length] = events;
			}
			print(events);
		}
		queryArtistsRecursive();
	});
}

function queryApi(artist, callback) {
    var oArgs = {
        app_key: APP_KEY,
        q: '"' + artist + '"',
        page_size: 25,
		location: "Berlin"
    };
    EVDB.API.call("/events/search", oArgs, callback);
}
 
function print(events){
	var table = $('#events');
	if ($.isArray(events)) {
		$.each(events, function(index, value) { 
			table.append(createEventElement(value));
		});
	}
	else {
		table.append(createEventElement(events));
	}
}

function createEventElement(event){
	if (event==null || typeof(event) ==='undefined') {
		return "";
	}
	var time = (typeof(event.start_time) === 'undefined') ? "" : (event.start_time.slice(0, 10))
	var result = "<tr><td>" + event.title + "</td><td>"  + time + "</td><td>" + event.venue_name + "</td></tr>";
	return result;
}

function printArtists(artists) {
	$('<div/>').text('Suche nach Konzerten von ').addClass('label').appendTo('#queriedArtists');
	$(artists).each(function(index, artist) {
		$('<div/>').text(artist).addClass('artist').appendTo('#queriedArtists');
	});
}