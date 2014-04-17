function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	} else
		var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
}

function deleteCookie(name) {
	createCookie(name, '', -1);
}

var savememory = function() {
	console.log("save memory active..");
	var iuser = $("form")[0].username.value;
	var ipass = $("form")[0].password.value;
	chrome.storage.sync.set({
		authme : {
			user : iuser,
			pass : ipass
		},
		sgur : false
	}, function() {
		deleteCookie("_appwebSessionId_");
		console.log("saved memory..");
		location.reload();
		console.log("Enviando!! con: " + iuser + " - " + ipass);
		console.log("comprobando....");
		chrome.storage.sync.get("authme", function(data) {
			console.log(data);
		});
	});
}
var saveMemoryTools = function(form) {

}

if (document.location.host == "10.82.1.30" && document.location.pathname == "/user/user_login_auth.jsp") {
	chrome.storage.sync.get("authme", function(data) {
		if ( typeof data.authme != "undefined" && typeof data.authme.user != "undefined" && typeof data.authme.pass != "undefined" && data.authme.user != "" && data.authme.pass != "" && $("#loginfailed").length == 0) {
			console.log("proceso auto login");
			$("form")[0].username.value = data.authme.user;
			$("form")[0].password.value = data.authme.pass;
			$("form")[0].ok.click();
		} else {
			console.log("proseso de captura");
			subcap.remove()
			$($("form")[0].ok).click(function() {
				savememory();
				return false;
			});
		}
	});
};
if (document.location.host == "sso.duoc.cl" && document.location.pathname == "/auth/LoginDUOC.jsp") {
	chrome.storage.sync.get("authme", function(data) {
		console.log(data);
		if ( typeof data.authme != "undefined" && typeof data.authme.user != "undefined" && typeof data.authme.pass != "undefined" && data.authme.user != "" && data.authme.pass != "" && $("#loginfailed").length == 0) {
			console.log("proceso auto login");
			var frm = $("#form1")[0];
			frm.username.value = data.authme.user;
			frm.password.value = data.authme.pass;
			if (data.authme.autlogin) {
				frm.Entrar.click();
			};
		} else {
			console.log("proseso de captura");
			
		}
	}); 
}