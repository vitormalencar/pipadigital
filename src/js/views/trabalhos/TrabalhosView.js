define([
	'views/nav/MainNavView',
	'text!templates/trabalhos/trabalhosTemplate.html'
], function (
	MainNavView,
	TrabalhosTemplate
){

	var TrabalhosView = Backbone.View.extend({

		el: '#load-content',
		TRABALHOS: '#Trabalhos',

		getTemplate: function () { this.$el.html(TrabalhosTemplate); },

		render: function () {

			var self = this,
				mainNav = new MainNavView(),
				Lista = $(this.TRABALHOS).find('.lista'),
				Loaded = $(this.TRABALHOS).find('.trabalho-loaded'),
				item = Lista.find('li'),
				itemCont = item.find('.content');


			mainNav.render();
			mainNav.pagInterna();
			mainNav.itemActive('trabalhos');


			item.each(function (i, elem) {

				var el = $(elem),
					arrow = el.find('.arrow'),
					dtl = el.find('.dtl');

				TweenMax.set(el, { css: { transformPerspective: 1200 } });

				el
				.on('mouseover', function () {
					TweenMax.to(arrow, 0.5, { width: 32, ease: Expo.easeOut });
					TweenMax.to(dtl, 0.7, { width: '100%', ease: Expo.easeOut, delay: 0.1 });
				})
				.on('mouseleave', function () {
					TweenMax.killTweensOf([arrow, dtl]);
					TweenMax.to(arrow, 0.5, { width: 0, ease: Expo.easeOut });	
					TweenMax.to(dtl, 0.7, { width: '0%', ease: Expo.easeOut, delay: 0.1 });
				})
				.on('click', function () {
					
				});


			});

		},

		lista: function (projeto) {

			/* ITENS DA LISTA */
			var self = this,
				Lista = $(this.TRABALHOS).find('.lista'),
				Loaded = $(this.TRABALHOS).find('.trabalho-loaded'),
				item = Lista.find('li'),
				itemCont = item.find('.content');


			this.mostrarProjeto(projeto);


		},

		mostrarProjeto: function (id) {

			var self = this,
				Lista = $(this.TRABALHOS).find('.lista'),
				Loaded = $(this.TRABALHOS).find('.trabalho-loaded'),
				ITEM_ATIVO = Lista.find('li[data-projeto="'+id+'"]'),
				ITEM_WIDTH = ITEM_ATIVO.width(),
				ITEM_HEIGHT = ITEM_ATIVO.height(),
				ITEM_TOP,
				ITEM_LEFT,
				ITEM_ATIVADO;

			
			

		},

		removerProjeto: function (id) {


		}

	})

	return TrabalhosView;


})