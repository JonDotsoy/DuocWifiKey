chrome.storage.sync.get("authme", function(data) {
	if ( typeof data.authme != "undefined") {
		document.controldata.user.value = ( typeof data.authme.user == "undefined") ? "" : data.authme.user;
		document.controldata.pass.value = ( typeof data.authme.pass == "undefined") ? "" : data.authme.pass;
	}
});
$(document.controldata.save).click(function() {

	chrome.storage.sync.set({
		authme : {
			user : document.controldata.user.value,
			pass : document.controldata.pass.value
		}
	}, function() {
		chrome.storage.sync.set({
			sgur : false
		}, function() {
			alert("datos guardados");
		})
	})
})
$(document.controldata.restore).click(function() {
	chrome.storage.sync.set({
		authme : ""
	}, function() {
		document.controldata.user.value = ""
		document.controldata.pass.value = ""
	})
});
