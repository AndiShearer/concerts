function extractArtists(file, callback) {
	readFile(file, function(playlist) {
		var artistsDuped = extractArtistsFromString(playlist);
		var artistsUnique = dedupe(artistsDuped);
		callback(artistsUnique);
	});
}

function readFile(file, callback) {
    var r = new FileReader();
    r.onload = function(e) { 
		callback(e.target.result);			
    }
    r.readAsText(file);
}

function extractArtistsFromString(playlist) {
	var anfangEinesEintrags = "#EXTINF:";
	var result = [];
	while (playlist.indexOf("#") > -1) {
		playlist = playlist.slice(playlist.indexOf(anfangEinesEintrags) + anfangEinesEintrags.length);
		var artist = playlist.substring(playlist.indexOf(",") + 1, playlist.indexOf(" - ")).toLowerCase();
		result[result.length] = artist;
	}
	return result;
}
	
function dedupe(liste) {
	liste.sort();
	var last = '';
	for (var i = 0; i < liste.length; i++) {
		if (last == liste[i]) {
			liste.splice(i, 1);
			i--;
		} else {
			last = liste[i];
		}
	}
	return liste;
}
