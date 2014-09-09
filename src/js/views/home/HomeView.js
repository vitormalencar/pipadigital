define([
	'views/nav/MainNavView',
	'text!templates/home/homeTemplate.html'
], function (
	MainNavView,
	homeTemplate
){

	var HomeView = Backbone.View.extend({
		
		el: '#load-content',

		events: {

			'mouseover .btn-blog' : 'btnBlogOnHover',
			'mouseleave .btn-blog' : 'btnBlogOnLeave',
			'click .btn-blog' : 'btnBlogClick'

		},

		render: function () {

			this.$el.html(homeTemplate);
			this.HOME = $('#Home');

			this.fullViewportElements();
			this.blogPosts();
			this.btnBlog();
			this.featureSlider();

			// NAV
			var mainNav = new MainNavView;
			mainNav.render();
			mainNav.closeSubmenu();
			mainNav.$el.removeClass('pag-interna');
			mainNav.hideNavWhenScroll();

		},

		featureSlider: function() {

			var FeatureSct = $('#feature'),

				btnNext = FeatureSct.find('.btn-next'),
				btnPrev = FeatureSct.find('.btn-prev'),
				btnNextSVG = Snap('.btn-next svg'),
				btnPrevSVG = Snap('.btn-prev svg'),

				Slider = FeatureSct.find('.slider'),
				sld = Slider.find('.sld');


			// CARREGANDO SVGs
			//
			Snap.load('src/svg/arrow-symb-sliders.svg', function (f) {

				var symb = f.select('path');
				btnNextSVG.append(symb).attr({ fill: '#575757' });

			});

			Snap.load('src/svg/arrow-symb-sliders.svg', function (f) {

				var symb = f.select('path');
				btnPrevSVG.append(symb).attr({ fill: '#575757' });

			});


			$('.btn-control-slider').each(function () {
				var t = $(this);
				t.on('mouseover', function () { TweenMax.to(t, 0.5, { opacity: 0.8 }); })
				.on('mouseleave', function () { TweenMax.to(t, 0.5, { opacity: 0.2 }); });
			});


			// HOVER NO .INFO DOS SLIDERS
			//
			sld.find('.info').on('mouseover', function () {
				TweenMax.to($(this).find('h4, p'), 0.8, { color: '#c2c2c2', ease: Expo.easeOut });
			})
			.on('mouseleave', function () {
				TweenMax.to($(this).find('h4, p'), 0.8, { color: '#ffffff', ease: Expo.easeOut });
			});


			//this.pipaParticles();


			// ROYALSLIDER
			//
			Slider.royalSlider({
				autoPlay: {
					enabled: true,
					delay: 8000,
					pauseOnHover: false,
					stopAtAction: false
				},
				block: {
					moveEffect: 'none',
					speed: 800,
					delay: 200
				},
				navigateByClick: false,
				transitionType: 'fade',
				slidesSpacing: 0,
				arrowsNav: false,
				controlNavigation: 'none',
				keyboardNavEnabled: true,
				loop: true,
				easeInOut: 'easeInOutExpo'
			});


			var sldConfig = Slider.data('royalSlider');


			btnPrev.on('click', function () { sldConfig.next(); });
			btnNext.on('click', function () { sldConfig.prev(); });

		},

		blogPosts: function () {

			var BlogList = $('#blog-articles'),
				header = BlogList.find('.header'),
				posts = BlogList.find('.posts-list'),
				post = posts.find('.post-item');

			// SOLUÇÃO GRAYSCALE, SUPORTADO POR TODOS OS NAVEGADORES (ATÉ O O IE6)
			//

			post.each(function () {
				
				var t = $(this),
					infoDtl = t.find('.info .dtl'),
					infoCat = t.find('.info .category'),
					infoAut = t.find('.info .autor'),
					infoTit = t.find('.info .title'),
					img = t.find('.img img'),
					imgLeftPos = parseInt(img.css('margin-left'));

				img.addClass('grayscale').css({ opacity: 0.20 });

				t.on('mouseover', function () {
					requestAnimationFrame(mouseover);
				})

				.on('mouseleave', function () {
					requestAnimationFrame(mouseleave);
				});

				function mouseover () {
					posts.find('.posts-list.over').removeClass('over');
					t.addClass('over');

					TweenMax.to(t, 2, { boxShadow: 'rgb(0, 0, 0) 0 0 80px -20px', ease: Expo.easeOut, delay: 0.3 });
					TweenMax.to(infoDtl, 0.5, { width: '100%', ease: Expo.easeOut });
					TweenMax.to(img, 45, { marginLeft: (imgLeftPos - 350), delay: 0.5 });
				}

				function mouseleave () {
					TweenMax.killTweensOf(t);
					TweenMax.killTweensOf(img);

					TweenMax.to(t, 0.9, { boxShadow: 'rgb(0, 0, 0) 0 0 0px 0px', ease: Expo.easeOut });
					TweenMax.to(infoDtl, 0.5, { width: '0%', ease: Expo.easeOut });
					TweenMax.to(img, 1, { marginLeft: imgLeftPos });
				}

			});


			// FIXAR HEADER DOS POSTS
			//
			$(window).on('scroll', function () {

				var sct = $(this).scrollTop(),
					blogSct = $('#blog-articles').offset().top;

				if(blogSct <= sct) {
					$('#blog-articles .header, #blog-articles .posts-list').addClass('fixed');
				}else{
					$('#blog-articles .header, #blog-articles .posts-list').removeClass('fixed');
				}

			});


			///
			///

			if($.browser.opera || $.browser.safari){
				var $images = $("img.grayscale")
				, imageCount = $images.length
				, counter = 0;

				$images.one("load",function(){
					counter++;
					if (counter == imageCount) {
						console.log('image-loaded');
					}
				}).each(function () {
				if (this.complete) {
						$(this).trigger("load");
					}
				});
			};

			// IE10+
			if (this.getIEVersion() >= 10){
				$('img.grayscale').each(function(){
					var el = $(this);
					el.css({"position":"absolute"}).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({"position":"absolute","z-index":"5","opacity":"0"}).insertBefore(el).queue(function(){
						var el = $(this);
						el.parent().css({"width":this.width,"height":this.height});
						el.dequeue();
					});
					this.src = grayscaleIE10(this.src);
				});
				
				function grayscaleIE10(src){
					var canvas = document.createElement('canvas');
					var ctx = canvas.getContext('2d');
					var imgObj = new Image();
					imgObj.src = src;
					canvas.width = imgObj.width;
					canvas.height = imgObj.height; 
					ctx.drawImage(imgObj, 0, 0); 
					var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
					for(var y = 0; y < imgPixels.height; y++){
						for(var x = 0; x < imgPixels.width; x++){
							var i = (y * 4) * imgPixels.width + x * 4;
							var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
							imgPixels.data[i] = avg; 
							imgPixels.data[i + 1] = avg; 
							imgPixels.data[i + 2] = avg;
						}
					}
					ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
					return canvas.toDataURL();
				};
			};


		},	

		btnBlog: function () {

			// BOTAO 'BLOG'
			//
			var btnBlog = $('.btn-blog'),
				btnBlogArrow = Snap('#btn-blog-arrow'),
				btnBlogCircle = Snap('#btn-blog-circle');
			
			Snap.load('src/svg/arrow.svg', function (f) {

				var arrow = f.select('path');
				btnBlogArrow.append(arrow);
				arrow.attr({ fill: '#ffffff' });

			});

			btnBlogCircle.circle(45, 45, 45).attr({ fill: "#383838" });

		},

		fullViewportElements: function () {

			// ELEMENTOS QUE TOMAM A VIEWPORT INTEIRA (FULL-SCREEN)
			//

			var ww = window.innerWidth,
				wh = window.innerHeight;


			$('[full-viewport]').css({
				width: ww,
				height: wh
			});

			$(window).on('resize', function () {

				ww = window.innerWidth;
				wh = window.innerHeight;

				$('[full-viewport]').css({
					width: ww,
					height: wh
				});

			});

		},

		pipaParticles: function () {

			var SEPARATION = 100,
				AMOUNTX = 50,
				AMOUNTY = 50;

			var container, camera, scene, renderer;
			var particles, particle, count = 0;
			var mouseX = 0, mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			init();
			animate();

			function init () {
				
				container = document.createElement('div.rsABlock');
				$('.sld.pipa').append(container);

				camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
				camera.position.z = 1000;

				scene = new THREE.Scene();
				particles = new Array();

				var PI2 = Math.PI * 2;
				var material = new THREE.SpriteCanvasMaterial({
					color: 0x3c3c3c,
					program: function (context) {
						context.beginPath();
						context.arc(0, 0, 0.5, 0, PI2, true);
						context.fill();
					}
				});

				var i = 0;

				for(var ix=0; ix < AMOUNTX; ix++) {
					for(var iy=0; iy < AMOUNTY; iy++) {

						particle = particles[i++] = new THREE.Sprite(material);
						particle.position.x = ix * SEPARATION - ((AMOUNTX*SEPARATION) / 2);
						particle.position.z = iy * SEPARATION - ((AMOUNTY*SEPARATION) / 2);
						scene.add(particle);

					}
				}

				renderer = new THREE.CanvasRenderer({alpha: true});
				renderer.setSize(window.innerWidth, window.innerHeight);
				container.appendChild(renderer.domElement);

				document.addEventListener('mousemove', onDocumentMouseMove, false);
				document.addEventListener('touchstart', onDocumentTouchStart, false);
				document.addEventListener('touchmove', onDocumentTouchMove, false);

				window.addEventListener('resize', onWindowResize, false);

			}


			function onWindowResize () {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize(window.innerWidth, window.innerHeight);

			}


			function onDocumentMouseMove (event) {
				
				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;

			}

			function onDocumentTouchStart (event) {
				
				if(event.touches.length === 1) {
					event.preventDefault();
					mouseX = event.touches[0].pageX - windowHalfX;
					mouseY = event.touches[0].pageY - windowHalfY;
				}

			}

			function onDocumentTouchMove (event) {
				
				if(event.touches.length === 1) {
					event.preventDefault();
					mouseX = event.touches[0].pageX - windowHalfX;
					mouseY = event.touches[0].pageY - windowHalfY;
				}

			}

			function animate () {
				
				requestAnimationFrame(animate);
				render();

			}

			function render () {
				
				camera.position.x += (mouseX - camera.position.x) * .05;
				camera.position.y += (-mouseY-camera.position.y) * .05;
				camera.lookAt(scene.position);

				var i = 0;

				for (var ix = 0; ix < AMOUNTX; ix ++) {
					for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

						particle = particles[ i++ ];
						particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
							( Math.sin( ( iy + count ) * 0.5 ) * 50 );
						particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 +
							( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;

					}
				}

				renderer.render(scene, camera);
				count += 0.1;

			}


		},	

		btnBlogOnHover: function () {

			TweenMax.to('#btn-blog-circle', 0.3, { top: -25, ease: Expo.easeOut });
			TweenMax.to('.btn-blog h4', 0.8, { top: -5, ease: Expo.easeOut, delay: 0.2 });
			TweenMax.to('#btn-blog-arrow', 0.8, { top: -5, ease: Expo.easeOut, delay: 0.3 });

		},

		btnBlogOnLeave: function () {

			TweenMax.to('#btn-blog-circle', 0.4, { top: 200, ease: Expo.easeOut });
			TweenMax.to('.btn-blog h4', 0.4, { top: 0, ease: Expo.easeOut });
			TweenMax.to('#btn-blog-arrow', 0.4, { top: 0, ease: Expo.easeInOut });

		},

		btnBlogClick: function () {

			var sc = $('#blog-articles').offset().top;
			TweenMax.to('html, body', 1, { scrollTop: sc, ease: Expo.easeOut });

		},

		getIEVersion: function () {
			var rv = -1;
			if (navigator.appName == 'Microsoft Internet Explorer'){
				var ua = navigator.userAgent;
				var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
				if (re.exec(ua) != null)
				rv = parseFloat( RegExp.$1 );
			}
			else if (navigator.appName == 'Netscape'){
				var ua = navigator.userAgent;
				var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
				if (re.exec(ua) != null)
				rv = parseFloat( RegExp.$1 );
			}
			return rv;
		}

	});

	return HomeView;

})
