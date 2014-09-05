define([
	'jquery',
	'underscore',
	'backbone',
	'modernizr',
	'router',
	'snap',
	'tweenmax',
	'royalslider',
	'threejs'
], function (
	$, 
	_, 
	Backbone,
	Modernizr,
	Router,
	Snap,
	TweenMax,
	RoyalSlider,
	THREE
){
	
	var requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame;

	var initialize = function () {
		

		Router.initialize();
		

		// ADICIONANDO LOGO SVG
		//
		var s = Snap('#logo-container');
		Snap.load('src/svg/logo.svg', function (d) {
			var logo = d.selectAll('path');
			s.append(logo);
		});


	}

	return {
		initialize: initialize
	}

});