define([
	'views/nav/MainNavView',
	'text!templates/trabalhos/trabalhosTemplate.html'
], function (
	MainNavView,
	TrabalhosTemplate
){

	var mainNav = new MainNavView;

	var TrabalhosView = Backbone.View.extend({

		el: '#load-content',
		TRABALHOS: '#Trabalhos',

		getTemplate: function () { this.$el.html(TrabalhosTemplate); },

		render: function () {

			var self = this,
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

				el.on('mouseover', function () {
					TweenMax.to(arrow, 0.5, { width: 32, ease: Expo.easeOut });
					TweenMax.to(dtl, 0.7, { width: '100%', ease: Expo.easeOut, delay: 0.1 });
				})
				.on('mouseleave', function () {
					TweenMax.killTweensOf([arrow, dtl]);
					TweenMax.to(arrow, 0.5, { width: 0, ease: Expo.easeOut });	
					TweenMax.to(dtl, 0.7, { width: '0%', ease: Expo.easeOut, delay: 0.1 });	
				});

			});

		},

		mostrarProjeto: function (projeto) {

			var self = this,
				Lista = $(this.TRABALHOS).find('.lista'),
				Loaded = $(this.TRABALHOS).find('.trabalho-loaded'),
				item = Lista.find('li'),
				itemCont = item.find('.content'),
				ITEM_ATIVO = Lista.find('li[data-projeto="'+projeto+'"]'),
				loading = ITEM_ATIVO.find('.cont-loader'),
				loadSVGTag = $('<svg id="loading-animation"></svg>');

			/* MOSTRANDO SUBMENU DA NAVEGAÇÃO PRINCIPAL */
			
			mainNav.mostrarBtnVoltar();
			$('.nav-list .submenu').find('li.active').removeClass('active');
			$('.nav-list .submenu li[data-projeto="'+projeto+'"]').addClass('active');


			TweenMax.set(Loaded.find('.wrp'), { opacity: 0 });
			TweenMax.set(Loaded, {css: {
				width: Lista.width(),
				height: window.innerHeight,
				top: 0,
				right: -Lista.width(),
				left: 'inherit'
			}});
			TweenMax.set(loading, { opacity: 0 });

			/* LOADING */

			loading.append(loadSVGTag);
			var loadingSVG = Snap('#loading-animation');

			Snap.load('src/svg/loading.svg', function (f) {
				var r = f.selectAll('path');
				loadingSVG.append(r);
			});
			
			TweenMax.to(loading, 0.5, { opacity: 1 });

			function transitions () {

				TweenMax.to('html, body', 0.5, { scrollTop: ITEM_ATIVO.offset().top - 100, delay: 0.2, ease: Expo.easeInOut });
				TweenMax.to(ITEM_ATIVO, 0.8, { transform: 'translateX('+(-window.innerWidth)+'px)', delay: 1, ease: Expo.easeIn });
				TweenMax.to(ITEM_ATIVO.find('.computer'), 0.6, { transform: 'translateX('+(-ITEM_ATIVO.width())+'px)', delay: 1.1, ease: Expo.easeIn });
				TweenMax.to(ITEM_ATIVO.find('.info'), 0.7, { transform: 'translateX('+(-ITEM_ATIVO.width())+'px)', delay: 1.1, ease: Expo.easeIn });
				TweenMax.to(Loaded, 1.5, { css: { right: 0 }, delay: 0.9, ease: Expo.easeInOut });
				TweenMax.to(Loaded.find('.wrp'), 1.5, { opacity: 1 , delay: 1.1, ease: Expo.easeOut});
				$('body').css('overflow', 'hidden');
				ITEM_ATIVO.addClass('item-ativo');

			}

			/* CARREGANDO PROJETO */

			$.ajax({

				type: 'POST',
				url: 'src/templates/trabalhos/' + projeto,
				success: function (data) {

					TweenMax.to(loading, 0.5, { opacity: 0 });
					Loaded.find('.wrp').html(data);

					var bgColor = Loaded.find('.wrp .trab-estilo').css('background-color');
					Loaded.css('background-color', bgColor);

					requestAnimationFrame(transitions);

				},
				error: function () {

					alert('Isso não era pra acontecer!\nPor favor, avisa pra gente no Facebook! :-(');

				}

			});

		},

		removerProjeto: function (projeto) {
			
			var self = this,
				Lista = $(this.TRABALHOS).find('.lista'),
				Loaded = $(this.TRABALHOS).find('.trabalho-loaded'),
				ITEM_ATIVO = Lista.find('li[data-projeto="'+projeto+'"]'),
				ITENS_ATIVOS = Lista.find('li.item-ativo');

			mainNav.esconderBtnVoltar();

			TweenMax.set(Loaded, { css: { right: 'inherit', left: 168 }});
			TweenMax.set([ITEM_ATIVO, ITENS_ATIVOS], { transform: 'translateX('+window.innerWidth+'px)' });
			TweenMax.set([ITEM_ATIVO.find('.computer, .info'), ITENS_ATIVOS.find('.computer, .info')], { transform: 'translateX('+ITEM_ATIVO.width()+'px)' });

			function transitions () {
				
				TweenMax.killTweensOf([Loaded, ITEM_ATIVO, ITENS_ATIVOS, ITEM_ATIVO.find('.computer, .info'), ITENS_ATIVOS.find('.computer, .info')]);
				TweenMax.to('html, body', 0.5, { scrollTop: ITEM_ATIVO.offset().top - 100, delay: 0.2, ease: Expo.easeInOut });
				TweenMax.to(Loaded, 1.5, {css: { width: 0 }, delay: 0.2, ease: Expo.easeInOut });
				TweenMax.to(Loaded.find('.wrp'), 1, { opacity: 0, delay: 0.8, ease: Expo.easeOut, onComplete: removeContent });
				TweenMax.to([ITEM_ATIVO, ITENS_ATIVOS], 1, { transform: 'translateX(0px)', delay: 0.8, ease: Expo.easeOut });
				TweenMax.to([ITEM_ATIVO.find('.computer'), ITENS_ATIVOS.find('.computer')], 1, { transform: 'translateX(0px)', delay: 0.9, ease: Expo.easeOut });
				TweenMax.to([ITEM_ATIVO.find('.info'), ITENS_ATIVOS.find('.info')], 1, { transform: 'translateX(0px)', delay: 1, ease: Expo.easeOut });
				$('body').css('overflow', 'auto');
				ITEM_ATIVO.removeClass('item-ativo');

			}

			function removeContent () {
				Loaded.find('.wrp').html('');
			}

			requestAnimationFrame(transitions);

		}

	})

	return TrabalhosView;


})