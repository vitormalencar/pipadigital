require.config({
	paths: {

	    jquery: 'libs/jquery/jquery-min',
	    underscore: 'libs/underscore/underscore-min',
	    backbone: 'libs/backbone/backbone-min',
	    modernizr: 'libs/modernizr/modernizr-min',
	    snap: 'libs/snap/snap.svg-min',
	    tweenmax: 'plugins/greenshock/TweenMax.min',
	    royalslider: 'plugins/royalslider/royalslider-min',
	    threejs: 'plugins/threejs/three.min',
	    templates: '../templates'

	},
	shim: {
		tweenmax: {
			exports: 'TweenMax'
		},
		royalslider: {
			deps: 'jquery'
		},
		threejs: {
			exports: 'THREE'
		}
	}
});

require(['app'], function (App) {

	App.initialize();

});