import Framework7, { getDevice } from 'framework7/bundle';

// Import F7 Styles
import 'framework7/css/bundle';

// Import Icons and App Custom Styles
import '../css/app.css';
import '../css/old.css';
import '../css/cut.css';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';

// Import Routes
import routes from './routes.js';

// Import main app component
import App from '../app.f7';

var device = getDevice();
var myApp = new Framework7({
	name: 'kitap12mobile', // App name
	theme: 'auto', // Automatic theme detection
	touch: {
		activeState: false, // otomatik .active-state class'ını ekleme
	},
	lazy: {
		threshold: 50,
		sequential: false,
	},
	el: '#app', // App root element
	component: App,
	// App routes
	routes: routes,



	// Input settings
	input: {
		scrollIntoViewOnFocus: device.cordova,
		scrollIntoViewCentered: device.cordova,
	},
	// Cordova Statusbar settings
	statusbar: {
		iosOverlaysWebView: true,
		androidOverlaysWebView: false,
	},
	on: {
		init: function () {
			var f7 = this;
			if (f7.device.cordova) {
				// Init cordova APIs (see cordova-app.js)
				cordovaApp.init(f7);
			}
		},
	},
});