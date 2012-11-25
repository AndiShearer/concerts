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
    feed = data.events.event;
	print(feed);
}
 
function print(events){
	$('table').remove();

	var table = createTable();
	
	if ($.isArray(events)) {
		$.each(events, function(index, value) { 
			table.append(createEventOutput(value));
		});
	}
	else {
		table.append(createEventOutput(events));
	}
	
	$('body').append(table);
}

function createTable() {
	return $('<table/>').addClass('table table-striped table-hover table-bordered')
					.append($('<tbody/>'));
}

function createEventOutput(event){
	return  event==null? "": "<tr><td>" + event.title + "</td><td>"  + event.start_time.slice(0, 10) + "</td><td>" + event.venue_name + "</td></tr>";
}