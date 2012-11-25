function raeumeGuiAuf(){
	$('#fortschritt').hide();
	$('#progressBar').width(0);
	if (!(foundEvents.length > 0)) {
		print({title : "Keine Konzerte in Berlin gefunden", start_time : "", venue_name : ""});
	}
}

function setupProgressBar(anzahlArtists) {
	$('#fortschritt').show();
	$('#queryNummer').text(0);	
	$('#queriesGesamt').text(anzahlArtists);
}

function updateProgressBar() {
	$('#queryNummer').text(parseInt($('#queryNummer').text())+1);	
	var currentNumber = parseInt($('#queryNummer').text());
	var allNumbers = parseInt($('#queriesGesamt').text());
	$('#progressBar').width(currentNumber / allNumbers * $('#fortschritt').width());
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

function resetGui() {
	$('#events').empty();
	$('#queriedArtists').empty();	
}