export interface Environment {
	appVersion : string,
	production : Boolean,
	appName	   : string,
	api		   : string
}

export interface EnvironmentSocket {
	appVersion : string,
	production : Boolean,
	deploy : {
		title : string,
		domain : string,
		url : string,
		urlWs: string,
		api : string,
		secretKey: string
	}
}


