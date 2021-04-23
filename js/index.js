// pre load image
var w = window.innerWidth,
	img = (w > 1024) ? ['img/img-01.jpg', 'img/img-02.jpg', 'img/img-03.jpg', 'img/img-04.jpg'] :
		['img/img-01-m.jpg', 'img/img-02-m.jpg', 'img/img-03-m.jpg', 'img/img-04-m.jpg']; // check device image

//console.log(w);
function imgpreload(imgs, callback) {
	"use strict";
	var loaded = 0,
		forceStop = true,
		images = [];
	imgs = Object.prototype.toString.apply(imgs) === '[object Array]' ? imgs : [imgs];
	var inc = function () {
		loaded += 1;
		if (loaded === imgs.length && callback) {
			callback(images);
		}
	};
	for (var i = 0; i < imgs.length; i++) {
		images[i] = new Image();
		images[i].onabort = inc;
		images[i].onerror = inc;
		images[i].onload = inc;
		images[i].src = imgs[i];
	}
}
setTimeout(function () {
	imgpreload(img, function (images) {
		document.body.className = 'docReady';
		setTimeout(function () {
			document.getElementById('loader').style.display = 'none';
			forceStop = false;
		}, 1500);
	});
}, 3000);



var cubeRoll = document.getElementById('cube-roller'),
	cubemain = document.getElementsByClassName('cube-main'),
	cubeBox = document.getElementsByClassName('cube-box'),
	cubeSlider = document.querySelectorAll('.cube-slider'),
	boxFront = document.getElementById("CS-1"),
	boxBottom = document.getElementById("CS-2"),
	boxBack = document.getElementById("CS-3"),
	boxTop = document.getElementById("CS-4"),
	arrow = document.querySelector('.arrows'),
	mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel",
	rxAdd = 90,
	cX = 0,
	active = 1,
	scrollIntervel = 1030,
	crH = window.innerHeight,
	pers3D, transZ, cXBtm, cXTp;

var cube3d = {
	cubeScroll: function () {

		window.addEventListener(mousewheelevt, function (e) {
			var evt = window.event || e //equalize event object
			if (evt.wheelDelta < 0) {
				if (forceStop)
					return;

				forceStop = true;
				cube3d.downSetup();	// Scroll down
				setTimeout(function () { forceStop = false; }, scrollIntervel + 50);
			} else {
				if (forceStop)
					return;

				forceStop = true;
				cube3d.upSetup();	// Scroll Up
				setTimeout(function () { forceStop = false; }, scrollIntervel + 50);
			}
			setTimeout(function () {	// Reset Rodate after complete 360 deg
				cube3d.resetRodate();
			}, scrollIntervel);

			return false;

		});
		window.addEventListener("keyup", function (e) { //Keyboard Control
			if (e.which == 40) {
				if (forceStop)
					return;

				forceStop = true;
				cube3d.downSetup();	// Scroll down
				setTimeout(function () { forceStop = false; }, scrollIntervel + 50);
			} else if (e.which == 38) {
				if (forceStop)
					return;

				forceStop = true;
				cube3d.upSetup();	// Scroll Up
				setTimeout(function () { forceStop = false; }, scrollIntervel + 50);
			}

			setTimeout(function () {	// Reset Rodate after complete 360 deg
				cube3d.resetRodate();
			}, scrollIntervel);

			return false;
		});
	},
	cubeinitialSetup: function () {
		cX = 0,
			pers3D = crH * 8 - 500,
			transZ = crH / 2;
		boxFront.classList.add('_active_cnt');
		cubeRoll.style.transform = "perspective(" + pers3D + "px) translateZ(-" + transZ + "px)";
		Array.from(cubeSlider).forEach(function (ele) {
			ele.style.transformOrigin = "50% 50% -" + transZ + "px";
		});

		cube3d.cubeRodate();
		cube3d.cubeScroll();
	},
	cubeResizeSetup: function () {
		crH = cubeRoll.outerHeight,
			pers3D = crH * 8 - 500,
			transZ = crH / 2;

		cubeRoll.style.transform = "perspective(" + pers3D + "px) translateZ(-" + transZ + "px)";

		Array.from(cubeSlider).forEach(function (ele) {
			ele.style.transformOrigin = "50% 50% -" + transZ + "px";
		});
		cube3d.cubeRodate();
	},
	downSetup: function () {
		cX += rxAdd;
		active += 1;

		document.querySelector('._active_cnt').classList.remove('_active_cnt');
		cubeRoll.classList.remove('_up');
		cubeRoll.classList.add('_down');
		setTimeout(function () {
			cube3d.cubeRodate();
		}, 0);
		cube3d.addcontentAnimateclass();	// Control Classes
		if (active > 4) {
			active = 1;
			document.getElementById('CS-' + active).classList.add('_active_cnt');
		} else {
			document.getElementById('CS-' + active).classList.add('_active_cnt');
		}
	},
	upSetup: function () {
		cX -= rxAdd;
		active -= 1;
		document.querySelector('div._active_cnt').classList.remove('_active_cnt');

		cubeRoll.classList.remove('_down');
		cubeRoll.classList.add('_up');
		setTimeout(function () {
			cube3d.cubeRodate();
		}, 0);
		cube3d.addcontentAnimateclass();	// Control Classes
		if (active <= 0) {
			active = active + 4;
			document.getElementById('CS-' + active).classList.add('_active_cnt');
		} else {
			document.getElementById('CS-' + active).classList.add('_active_cnt');
		}
	},
	resetRodate: function () {
		if (cX >= 360 || cX <= -360) {
			cX = 0;
			cube3d.cubeRodate();

			Array.from(cubeSlider).forEach(function (ele) {
				ele.style.transition = "transform 0s ease";
			});
		}
	},
	addcontentAnimateclass: function () {
		cubeRoll.classList.remove('_active');
		setTimeout(function () {
			cubeRoll.classList.add('_tempTrans');
			cubeRoll.classList.add('_active');
			arrow.classList.add('hide');
		}, 50);
		setTimeout(function () {
			cubeRoll.classList.remove('_tempTrans');
		}, scrollIntervel + 40);
	},
	cubeRodate: function () {
		cXBtm = cX - rxAdd;
		cXTp = cX + rxAdd;
		Array.from(cubeSlider).forEach(function (ele) {
			ele.style.transition = "transform 1s ease";
		});

		boxFront.style.transform = "perspective(" + pers3D + "px) rotateX(" + cX + "deg) translateZ(0px)";
		boxBottom.style.transform = "perspective(" + pers3D + "px) rotateX(" + cXBtm + "deg)";
		boxBack.style.transform = "perspective(" + pers3D + "px) rotateX(" + cX + "deg) rotateY(180deg) rotateZ(180deg) translateZ(0px)";
		boxTop.style.transform = "perspective(" + pers3D + "px) rotateX(" + cXTp + "deg) translateZ(0px)";


	}
}

cube3d.cubeinitialSetup();	// init
window.addEventListener('resize', function () {	// Resize
	cube3d.cubeResizeSetup();
});
if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
	setInterval(function () { cube3d.downSetup(); }, 5000);
}
