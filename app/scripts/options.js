'use strict';

+function () {
	var form = document.forms['formLogin'];
	var inpUser = form.user;
	var inpPass = form.pass;
	var alertWarning = document.getElementById('alertW');

	var message = function (message) {
		alertWarning.innerText = message;
		alertWarning.classList.remove("hidden");
	}

	var eventSave = function () {
		var config = {
			username: inpUser.value,
			password: inpPass.value
		}

		chrome.storage.sync.set(config,function(){
			message("Se ha guardado correctamente las nuevas credenciales");
		});

		return false;
	}

	var removeConfig = function () {
		inpUser.value = "";
		inpPass.value = "";
		eventSave();
	}

	var loadValues = function () {
		chrome.storage.sync.get(["username","password"],function (config) {
			inpUser.value = config.username;
		});
	}

	loadValues();
	form.onsubmit = eventSave;
	form.onreset = removeConfig;
}()
