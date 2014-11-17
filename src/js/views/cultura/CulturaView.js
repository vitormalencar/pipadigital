define([

	'views/nav/MainNavView',
	'text!templates/cultura/culturaTemplate.html'	

], function (

	MainNavView,
	culturaTemplate

) {


	var CulturaView = Backbone.View.extend({

		el: '#load-content',
		CULTURA: '#Cultura',
		ww: window.innerWidth,
		wh: window.innerHeight,

		render: function () {

			var self = this;

			this.$el.html(culturaTemplate);
			this.resizeBlock();
			this.apaixonados();
			this.pessoas();

			console.log('cultura');


			// NAV
			var mainNav = new MainNavView;
			mainNav.render();
			mainNav.itemActive('cultura');
			mainNav.showSubmenu('cultura');
			mainNav.pagInterna();


		},

		resizeBlock: function () {

			var self = this;
			var fullHeightEl = $(this.CULTURA).find('[full-height]');

			fullHeightEl.css({ height: this.wh });

			$(window).on('resize', function () {
				fullHeightEl.css({ height: self.wh });
			});

		},

		apaixonados: function () {


			// SOLUÇÃO ENCONTRADA EM:
			// http://codepen.io/chapko/pen/IlvmJ


			var canvas = document.getElementById('canvas'),
				ctx = canvas.getContext('2d');

			var WIDTH = 1000,
				HEIGHT = 583,
				ALPHA_THRESHOLD = 60;

			canvas.width = WIDTH;
			canvas.height = HEIGHT;

			var canvasX, canvasY,
				isMouseDown = false,
				particles,
				imageData = ctx.createImageData(WIDTH, HEIGHT);

			function updateCanvasCoordinates() {
				var rect = canvas.getBoundingClientRect();
				canvasX = rect.left;
				canvasY = rect.top;
			}
			updateCanvasCoordinates();
			window.onresize = updateCanvasCoordinates;


			// CRIANDO PARTÍCULAS
			//
			function createParticles (ctx, xoffset, yoffset) {
				
				var w = ctx.canvas.width,
					h = ctx.canvas.height,
					imageData = ctx.getImageData(0, 0, w, h),
					pixels = imageData.data,
					particles = [], x, y;

				for(var i=0; i < pixels.length; i+=4) {
					if(pixels[i+3] > ALPHA_THRESHOLD) {

						var color = [
							pixels[i],
							pixels[i+1],
							pixels[i+2],
							pixels[i+3]
						];

						x = (i/4) % imageData.width;
						y = (i/4) / imageData.width | 0;

						particles.push({
							x: Math.random() * WIDTH,
							y: Math.random() * HEIGHT,
							sx: x + xoffset,
							sy: y + yoffset,
							fx: 0,
							fy: 0,
							vx: 0,
							vy: 0,
							color: color
						});

					}
				}

				return particles;
			}


			function init () {
				
				var canvas = document.createElement('canvas'),
					ctx = canvas.getContext('2d'),
					xoffset = (WIDTH - this.width) / 2,
					yoffset = (HEIGHT - this.height) / 2;

				canvas.width = this.width;
				canvas.height = this.height;
				ctx.drawImage(this, 0, 0, this.width, this.height);
				particles = createParticles(ctx, xoffset, yoffset);
				initEvents();
				start();

			}


			var image = new Image();
			image.crossOrigin = 'Anonymous';
			image.onload = init;
			image.src = 'src/img/cultura-apaixonados.png';

			function start() {
			    draw();
			}

			function update() {
			    var p, dx, dy;
			    for (var i = 0; i < particles.length; i++) {
			        p = particles[i];
			        dx = (p.sx - p.x);
			        dy = (p.sy - p.y);
			        p.vx = p.fx + dx * 0.04;
			        p.vy = p.fy + dy * 0.04;
			        p.x += p.vx;
			        p.y += p.vy;
			    }
			}

			function draw() {
			    requestAnimationFrame(draw);
			    var i, d = imageData.data;
			    for (i = 3; i < d.length; i += 4) {
			        d[i] = 0;
			    }
			    for (i = 0; i < particles.length; i++) {
			        fillPixel(d, particles[i].x, particles[i].y, particles[i].color);
			    }
			    ctx.putImageData(imageData, 0, 0);
			    update();
			}

			function fillPixel(data, x, y, color) {
			    x = Math.round(x);
			    y = Math.round(y);
			    if (x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT) {
			        return;
			    }
			    var index = (y * WIDTH + x) * 4;
			    data[index] = color[0];
			    data[index + 1] = color[1];
			    data[index + 2] = color[2];
			    data[index + 3] = color[3];
			}

			function initEvents() {
			    
			    canvas.addEventListener('mouseover', function (event) {
			        cursorForce(event);
			        isMouseDown = true;
			    });

			    document.body.addEventListener('mousedown', function (event) {
			    	cursorForce(event);
			        isMouseDown = true;
			    })
			    
			    document.body.addEventListener('mousemove', function (event) {
			        if (isMouseDown) {
			            cursorForce(event);
			        }
			    });
			    
			    document.body.addEventListener('mouseup', function () {
			        clearForce();
			        isMouseDown = false;
			    });
			}

			function randomForce() {
			    for (var i = 0; i < particles.length; i++) {
			        particles[i].fx = (Math.random() - 0.5) * 15;
			        particles[i].fy = (Math.random() - 0.5) * 15;
			    }
			}

			function cursorForce(event) {
			    var mx = event.pageX - canvasX;
			    var my = event.pageY - canvasY;
			    var p, dx, dy, d;
			    for (var i = 0; i < particles.length; i++) {
			        p = particles[i];
			        dx = p.x - mx;
			        dy = p.y - my;
			        d = Math.sqrt(dx*dx + dy*dy);

			        // randomize direction
			        dx += (Math.random() - 0.5) * d * 1;
			        dy += (Math.random() - 0.5) * d * 1;

			        // Newton's magic
			        d = d * d * d;
			        p.fx = Math.min(50000 / d, 0.3) * dx;
			        p.fy = Math.min(50000 / d, 0.3) * dy;
			    }
			}

			function clearForce() {
			    for (var i = 0; i < particles.length; i++) {
			        particles[i].fx = particles[i].fy = 0;
			    }
			}

		},


		pessoas: function () {

			var self = this,
				Pessoas = $('#pessoas'),
				lista = Pessoas.find('.os-fodas'),
				item = lista.find('li');
	

			item.each(function (i, el) {

				var el = $(el),
					infoTitle = el.find('.title'),
					infoRole = el.find('.role'),
					infoSocialIcons = el.find('.social .icon'),
					colorOpacity = el.find('.color-opacity'),
					pImg = el.find('.p-img .p-img-wrp img');

				//TweenMax.to(pImg, 0.1, { scale: 1.2 });
				TweenMax.to([infoTitle, infoRole, infoSocialIcons], 0.1, { css: { transform: 'translateY(15px)' } });

				el
				.on('mouseover', function () {
					TweenMax.to(colorOpacity, 0.5, { opacity: 0.8, ease: Expo.easeOut });
					TweenMax.staggerTo([infoTitle, infoRole], 0.3, { css: { transform: 'translateY(0px)', opacity: 1} , ease: Expo.easeOut, delay: 0.1 }, 0.1);
					TweenMax.staggerTo(infoSocialIcons, 0.3, { css: { transform: 'translateY(0px)', opacity: 1} , ease: Expo.easeOut, delay: 0.2 }, 0.1);
				})
				.on('mouseleave', function () {
					TweenMax.killTweensOf([infoTitle, infoRole, infoSocialIcons]);
					TweenMax.to(colorOpacity, 0.3, { opacity: 0, ease: Expo.easeOut });
					TweenMax.to([infoTitle, infoRole, infoSocialIcons], 0.1, { css: { transform: 'translateY(15px)', opacity: 0 }, ease: Expo.easeOut, delay: 0.1 });
				});

			});


		}


	});

	return CulturaView;


});