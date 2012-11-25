var feed = null;
var APP_KEY = "hgGsRVHKCBfDXmTv";

function queryArtist(artist) {
         var oArgs = {
            app_key: APP_KEY,
            q: artist,
            page_size: 25,
			location: "Berlin"
        };
        EVDB.API.call("/events/search", oArgs, processResponse);
 }
 
function processResponse(data){
	if (data.total_items !== "0") {
		feed = data.events.event;
		print(feed);
	} else {
		print({title : "Keine Konzerte gefunden", start_time : "", venue_name : ""})
	}
}
 
function print(events){
	$('table').remove();

	var table = createTable();
	if ($.isArray(events)) {
		$.each(events, function(index, value) { 
			table.append(createEventElement(value));
		});
	}
	else {
		table.append(createEventElement(events));
	}
	$('body').append(table);
}

function createTable() {
	return $('<table/>').addClass('table table-striped table-hover table-bordered')
					.append($('<tbody/>'));
}

function createEventElement(event){
	return  event==null? "": "<tr><td>" + event.title + "</td><td>"  + event.start_time.slice(0, 10) + "</td><td>" + event.venue_name + "</td></tr>";
}