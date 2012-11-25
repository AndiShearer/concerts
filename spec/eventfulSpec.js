describe("Eventful", function() {
	it("Abfrage Artist", function() {
		runs(function() {
			queryArtist('Garbage');
		});
	
		waitsFor(function() {
			return feed != null;
		}, "Eventful Response", 10000);
	
		runs(function() {
			expect(feed).not.toBeNull();
		});
    });
});
