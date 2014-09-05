define([

	'views/nav/MainNavView',
	'text!templates/contato/contatoTemplate.html'

], function (
	MainNavView,
	ContatoTemplate
){

	var ContatoView = Backbone.View.extend({

		el: '#load-content',
		CONTATO: '#Contato',

		render: function () {

			this.$el.html(ContatoTemplate);

			var mainNav = new MainNavView();
			mainNav.render();
			mainNav.pagInterna();
			mainNav.itemActive('contato');


			var slider = $(this.CONTATO).find('.slider');
			slider.royalSlider({
				autoPlay: {
					enabled: false,
					pauseOnHover: false,
					stopAtAction: false
				},
				slidesSpacing: 0
			})


		}

	});

	return ContatoView;

})