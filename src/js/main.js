'use strict';

const Handlebars = require('hbsfy/runtime');
// const T_header = require('./templates/partials/header.hbs');
const T_app = require('./templates/app.hbs');
const SlideScroll = require('slide-scroll');

if (document.readyState !== 'loading') init();
else document.addEventListener('DOMContentLoaded', init);

function init() {

	// Handlebars.registerPartial('P_header', T_header);
	document.getElementsByTagName('main')[0].innerHTML = T_app({});


	const ss = new SlideScroll({el:$('#volumeup')[0]});


	$('#volume-ctrl-slider').slider({
	    min: 0,
	    max: 100,
	    value: 0,
		range: 'min',
		animate: true,
		slide: function(event, ui) {

			let v = ui.value;

			if (v <= 25) {
				v = 0;
			} else if (25 < v && v <= 50) {
				v = 1;
			} else if (50 < v && v <= 75) {
				v = 2;
			} else {
				v = 3
			}

			$('.proto').removeClass('active hidden');
			$(`.proto:eq(${v})`).addClass('active');

			setTimeout(function(){
				$('.proto:not(.active)').addClass('hidden');
			},300);

			ss.to(0);
		}
	});

	$('header img').click(function(){
		$('#volumeup').toggleClass('menu-open');
	});

	$('nav a').click(function(){
		$('#volumeup').removeClass('menu-open');
	});
}
