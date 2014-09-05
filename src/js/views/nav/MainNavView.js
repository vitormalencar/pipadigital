define([
	'text!templates/nav/navTemplate.html'
], function (
	navTemplate
){

	var MainNavView = Backbone.View.extend({

		el: '#main-nav',
		blcContent: '.blc-interno',

		render: function () {

			this.$el.html(navTemplate);

		},

		pagInterna: function () {
			this.$el.addClass('pag-interna');
		},

		itemActive: function (id) {
			this.$el.find('li.'+ id).addClass('active');
		},

		showSubmenu: function (id) {

			var self = this,
				li = this.$el.find('.'+id),
				submenu = li.find('.submenu'),
				submenuH = submenu.attr('data-height'),
				blc = $(this.blcContent);

			TweenMax.to(submenu, 1, { height: submenuH, ease: Expo.easeOut });
			submenu.addClass('open');

			submenu.find('a').on('click', function () {

				var _href = $(this).attr('href');
				$('html, body').stop().animate({ scrollTop: $(_href).offset().top }, 500);
				submenu.find('li.active').removeClass('active');
				$(this).parent().addClass('active');

				return false;

			});

			/* ATIVAÇÃO SUBMENU COM SCROLL */

			var prev,
				n = 0,
				blcId = blc.find('.bloco').map(function (i, el) {
					return { 
						top: $(el).offset().top,
						id: el.id
					}
				});

			function closest () {
				var b,
					top = $(window).scrollTop(),
					i = blcId.length;
				while(i--) {
					b = blcId[i];
					if(top >= b.top - (window.innerHeight / 2)) {
						return b;
					}
				}
			}

			$(document).on('scroll', function () {

				var h = closest();
				if(!h) return;
				
				if(prev) {
					prev.parent().removeClass('active');
				}

				var li = submenu.find('li a[href="#'+ h.id +'"]');
				li.parent().addClass('active');
				prev = li;

			});

		},

		closeSubmenu: function () {
			if(this.$el.find('.submenu.open')) {
				var openedSub = $('.submenu.open');
				TweenMax.to(openedSub, 1, { height: 0, ease: Expo.easeOut });
			}
		},

		hideNavWhenScroll: function () {

			var self = this;

			$(window).on('scroll', function () {

				if($(this).scrollTop() >= (window.innerHeight-350)) {
					TweenMax.to(self.$el, 1, { left: -500, ease: Expo.easeOut });
				}else {
					TweenMax.to(self.$el, 1, { left: 0, ease: Expo.easeOut });
				}

			});

		},


	});

	return MainNavView;

});