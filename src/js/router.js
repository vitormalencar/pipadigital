define([
	'jquery',
	'underscore',
	'backbone',
	'modernizr',
	'snap',
	'views/nav/MainNavView',
	'views/footer/footerView',
	'views/home/HomeView',
	'views/cultura/CulturaView',
	'views/negocios/NegociosView',
	'views/contato/ContatoView',
	'views/trabalhos/TrabalhosView'
], function(
	$, _, Backbone, Modernizr,
	Snap,
	MainNavView,
	FooterView,
	HomeView,
	CulturaView,
	NegociosView,
	ContatoView,
	TrabalhosView
){

	var AppRouter = Backbone.Router.extend({
		routes: {
			'cultura' 			: 'cultura',
			'negocios'			: 'negocios',
			'contato' 			: 'contato',
			'trabalhos'			: 'trabalhos',
			'trabalhos/:projeto': 'trabalhos',
			''					: 'home'
		}
	});

	var initialize = function () {

		var app_router = new AppRouter,
			primeiroAcesso = 0;

		app_router.on('route:home', function() {
			
			var homeView = new HomeView();
			homeView.render();
			primeiroAcesso = 0;

		});

		app_router.on('route:cultura', function () {

			var culturaView = new CulturaView();
			culturaView.render();
			primeiroAcesso = 0;

		});	

		app_router.on('route:negocios', function () {

			var negociosView = new NegociosView();
			negociosView.render();
			primeiroAcesso = 0;

		});	

		app_router.on('route:contato', function () {

			var contatoView = new ContatoView();
			contatoView.render();
			primeiroAcesso = 0;

		});

		app_router.on('route:trabalhos', function (projeto) {

			var trabalhosView = new TrabalhosView(),
				loadContentDiv = $('#load-content');

			if(primeiroAcesso == 0) {

				trabalhosView.getTemplate();
				trabalhosView.render();
				primeiroAcesso = 1;


				// Isso aqui só vai funcionar se o acesso for direto no link

				if(projeto != undefined) {

					$('#load-content').attr('data-projeto-carregado', projeto);
					trabalhosView.mostrarProjeto(projeto);

				}

			} else {

				// Aqui é onde funciona com navegação pelo menu

				if(projeto != undefined) {

					console.log('projeto é: ' + projeto);

					$('#load-content').attr('data-projeto-carregado', projeto);
					trabalhosView.mostrarProjeto(projeto);

				} else {

					trabalhosView.removerProjeto(loadContentDiv.attr('data-projeto-carregado'));

				}

			}


		});

		var mainNav = new MainNavView;
		mainNav.render();

		var Footer = new FooterView;
		Footer.render();

		Backbone.history.start();

	};


	return {
		initialize: initialize
	};

})