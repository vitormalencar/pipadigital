define([

	'views/nav/MainNavView',
	'text!templates/negocios/negociosTemplate.html'

], function (
	MainNavView,
	NegociosTemplate
){

	var NegociosView = Backbone.View.extend({

		el: '#load-content',
		NEGOCIOS: '#Negocios',

		render: function () {

			this.$el.html(NegociosTemplate);

			var mainNav = new MainNavView();
			mainNav.render();
			mainNav.pagInterna();
			mainNav.itemActive('negocios');


			/* ÍCONES COMO FAZEMOS */
			var BuscaPesquisaSVG = Snap('#busca-pesquisa-icon'),
				PlanejamentoSVG = Snap('#planejamento-icon'),
				CriacaoSVG = Snap('#criacao-interacao-icon'),
				ExecucaoSVG = Snap('#execucao-icon'),
				GestaoSVG = Snap('#gestao-icon'),
				EvolucaoSVG = Snap('#evolucao-icon');


			Snap.load('src/svg/metodo-busca.svg', function (f) {
				var i = f.selectAll('path');
				BuscaPesquisaSVG.append(i);
			});

			Snap.load('src/svg/metodo-planejamento.svg', function (f) {
				var i = f.selectAll('path');
				PlanejamentoSVG.append(i);
			});

			Snap.load('src/svg/metodo-criacao.svg', function (f) {
				var i = f.selectAll('path');
				CriacaoSVG.append(i);
			});

			Snap.load('src/svg/metodo-execucao.svg', function (f) {
				var i = f.selectAll('path');
				ExecucaoSVG.append(i);
			});

			Snap.load('src/svg/metodo-gestao.svg', function (f) {
				var i = f.selectAll('path');
				GestaoSVG.append(i);
			});

			Snap.load('src/svg/metodo-evolucao.svg', function (f) {
				var i = f.selectAll('g');
				EvolucaoSVG.append(i);
			});


		}

	});

	return NegociosView;

})