if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
	var appConfig = {
		'base' : 'http://' + location.hostname + ":" + location.port,
	}	
} else if(location.hostname === "proniveau.github.io") {
	var appConfig = {
		'base': 'proniveau.github.io',
	}
} else {
	var appConfig = {
		'base': '',
	}
}

axios.defaults.baseURL = appConfig.base;
	