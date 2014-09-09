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

		var app_router = new AppRouter;
		localStorage.setItem('TRABALHOS_VIEW_FIX', 0);

		app_router.on('route:home', function() {
			
			var homeView = new HomeView();
			homeView.render();
			localStorage.setItem('TRABALHOS_VIEW_FIX', 0);

		});

		app_router.on('route:cultura', function () {

			var culturaView = new CulturaView();
			culturaView.render();
			localStorage.setItem('TRABALHOS_VIEW_FIX', 0);

		});	

		app_router.on('route:negocios', function () {

			var negociosView = new NegociosView();
			negociosView.render();
			localStorage.setItem('TRABALHOS_VIEW_FIX', 0);

		});	

		app_router.on('route:contato', function () {

			var contatoView = new ContatoView();
			contatoView.render();
			localStorage.setItem('TRABALHOS_VIEW_FIX', 0);

		});

		app_router.on('route:trabalhos', function (projeto) {

			var trabalhosView = new TrabalhosView(),
				primeiroAcesso = localStorage.getItem('TRABALHOS_VIEW_FIX');

			console.log(projeto);

			if(primeiroAcesso == 0) {

				trabalhosView.getTemplate();
				trabalhosView.render();
				localStorage.setItem('TRABALHOS_VIEW_FIX', 1);

				if($('#load-content').html() == '') {
					trabalhosView.getTemplate();
					trabalhosView.render();
				}else{
					if(projeto != undefined) {
						localStorage.setItem('PROJETO_ID', projeto);
						trabalhosView.mostrarProjeto(projeto);
					}else{
						trabalhosView.removerProjeto(localStorage.getItem('PROJETO_ID'));
					}
				}

			}else{

				if($('#load-content').html() == '') {
					trabalhosView.getTemplate();
					trabalhosView.render();
				}else{
					if(projeto != undefined) {
						localStorage.setItem('PROJETO_ID', projeto);
						trabalhosView.mostrarProjeto(projeto);
					}else{
						trabalhosView.removerProjeto(localStorage.getItem('PROJETO_ID'));
					}
				}
				
			}


		});

		// var mainNav = new MainNavView;
		// mainNav.render();

		var Footer = new FooterView;
		Footer.render();

		Backbone.history.start();

	};


	return {
		initialize: initialize
	};

})