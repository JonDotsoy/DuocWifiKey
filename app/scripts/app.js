'use strict';

+function() {
	var config= {
		lastLoad: false,
		username: null,
		password: null
	}
	var actionsURL = {
		"http://campusvirtual.duoc.cl/": {
			script: "click",
			form: "login",
			user: "user_id",
			pass: "password",
			submit: "login"
		},
		"http://campusvirtual.duoc.cl/webapps/login/": {
			script: "click",
			form: "login",
			user: "user_id",
			pass: "password",
			submit: "login"
		},
		"http://sso.duoc.cl/auth/LoginDUOC.jsp": {
			form: "form1",
			user: "username",
			pass: "password"
		},
		"http://portalcarga.duoc.cl/irj/portal": {
			form: "logonForm",
			user: "j_user",
			pass: "j_password"
		},
		"http://appserver03.duoc.cl/icl/icl?path=login": {
			form: "login",
			user: "edit[username]",
			pass: "edit[password]"
		}
	}
	var URLlocal = null;
	var elmNofication = document.getElementById('nofication');
	var elmBtnLoadKeys = document.getElementById('loadKeys');
	var nAlert = function (msj) {
		if (typeof msj == "boolean") {
			if (msj == false) {
				elmNofication.style.display = "none";
				elmBtnLoadKeys.disabled = false;
			} else {
				elmNofication.style.display = "block";
				elmBtnLoadKeys.disabled = true;
			}
		} else {
			elmNofication.style.display = "block";
			elmBtnLoadKeys.disabled = true;
		}
		elmNofication.innerText = msj;
	}
	// Return Boolean
	var validation = function (url) {
		var r = false;
		for (var elmKey in actionsURL) {
			if (elmKey == url) {
				URLlocal = actionsURL[elmKey];
				r = true;
			};
			// nAlert(elmKey);
		}
		return r;
	}

	// Load event
	var loadEvent = function (tab) {
		if (validation(tab.url)) {
			nAlert(false);
		} else {
			nAlert("No es posible cargar las credenciales en este sitio");
		}
	}

	elmBtnLoadKeys.onclick = function () {
		if (config.lastLoad == false) {
			nAlert("No existen credenciales para cargar el login");
		} else {

			var codeSend = ''+
					'document.forms["'+URLlocal.form+'"]["'+URLlocal.user+'"].value = "'+config.username+'";'+
					'document.forms["'+URLlocal.form+'"]["'+URLlocal.pass+'"].value = "'+config.password+'";'+
					'document.forms["'+URLlocal.form+'"].submit();';

			if (URLlocal.script) {
				if (URLlocal.script == "click") {
					codeSend = ''+
					'document.forms["'+URLlocal.form+'"]["'+URLlocal.user+'"].value = "'+config.username+'";'+
					'document.forms["'+URLlocal.form+'"]["'+URLlocal.pass+'"].value = "'+config.password+'";'+
					'document.forms["'+URLlocal.form+'"].'+URLlocal.submit+'.click();';
				};
			};

			chrome.tabs.getSelected(null, function(tab) {
				chrome.tabs.executeScript({
					code: codeSend
				});
			});
		}
	}

	var loadConfig = function () {
		chrome.storage.sync.get(["username","password"],function (thisConfig) {
			config = thisConfig;
			config.lastLoad = new Date();
		});
	}


	loadConfig();
	window.btn = elmBtnLoadKeys;
	chrome.tabs.getSelected(null, loadEvent);
}();