$(document).ready(function () {
	// Что-то случается при клике
	$('.block').on('click', function () {
		$('.block').toggleClass(' block');
	});
	// открытие попап окна по классу
	$(".popup-link").magnificPopup({

	});
	// textarea тянется вместе с содержимым
	autosize(document.querySelectorAll('textarea'));
	// табы
	$('.tabs').each(function () {
		let ths = $(this);
		ths.find('.tabs__item').not(':first').hide();
		ths.find('.tabs__link').click(function () {
			ths.find('.tabs__link').removeClass('active').eq($(this).index()).addClass('active');
			ths.find('.tabs__item').hide().eq($(this).index()).fadeIn()
		}).eq(0).addClass('active');
	});
	// спойлер
	$('.spoiler__body').hide(300);
	$(document).on('click', '.spoiler__head', function (e) {
		e.preventDefault()
		$(this).parents('.spoiler').toggleClass("active").find('.spoiler__body').slideToggle();
	});
	// слайдер
	$('.example__slider').slick({
		slidesToShow: 2,
		slidesToScroll: 2,
		dots: false,
		arrow: false,
		appendArrows: $('.example__slider-arrows'),
		appendDots: $('.example__slider-dots'),
		prevArrow: '<button class="slick-prev example__slider-prev" aria-label="Previous" type="button"><img src="img/arrow-left.png"></button>',
		nextArrow: '<button class="slick-next example__slider-next" aria-label="Next" type="button"><img src="img/arrow-right.png"></button>',
		responsive: [
			{
				breakpoint: 1210,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					dots: true,
					arrow: true,
				}
			},
		]
	});
	$('.__slider').slick({
		slidesToShow: 2,
		slidesToScroll: 2,
		dots: false,
		arrow: false,
		appendArrows: $('.__arrows'),
		appendDots: $('.__dots'),
		prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><img src="img/arrow-left.png"></button>',
		nextArrow: '<button class="slick-next" aria-label="Next" type="button"><img src="img/arrow-right.png"></button>',
	});
	// select
	let currentValue = '';
	let currentImg = '';
	$('.select__head').on('click', function () {
		$(this).next().toggleClass(' select__box--active');
		$(this).toggleClass(' select__head--active');
	})
	$('.select__item').on('click', function () {
		currentValue = $(this).children('span').text();
		currentImg = $(this).children('img').attr('src');
		$(this).closest('.select__box').children('.select__item').removeClass('select__item--curent')
		$(this).toggleClass('select__item--curent');
		$(this).closest('.select__box').siblings('.select__head').toggleClass('select__head--active');
		$(this).closest('.select__box').siblings('.select__head').children('span').html(currentValue);
		$(this).closest('.select__box').toggleClass(' select__box--active');
		$(this).closest('.select__box').siblings('.select__head').children('.select__chosed-icon').prop('src', currentImg);
		$(this).closest('.select__box').siblings('.select__input').children('input').attr('value', currentValue);
	});


	/* input file */
	let inputFile = $('#myInput');
	let button = $('#myButton');
	let filesContainer = $('#myFiles');
	let files = [];

	inputFile.change(function () {
		let newFiles = [];
		for (let index = 0; index < inputFile[0].files.length; index++) {
			let file = inputFile[0].files[index];
			newFiles.push(file);
			files.push(file);
		}

		$('.upload-has__delete').addClass('upload-has__delete--open');

		newFiles.forEach(file => {
			let fileElement = $(`<p>${file.name}</p>`);
			fileElement.data('fileData', file);
			filesContainer.append(fileElement);

			fileElement.click(function (event) {
				let fileElement = $(event.target);
				let indexToRemove = files.indexOf(fileElement.data('fileData'));
				fileElement.remove();
				files.splice(indexToRemove, 1);
			});
		});
	});
	button.click(function () {
		inputFile.click();
	});
	$('.upload-has__delete').on('click', function () {
		document.getElementById("myInput").value = "";
		document.getElementById("myFiles").innerHTML = "";
		$('.upload-has__delete').removeClass('upload-has__delete--open');
	});





	/* count input */
	// Убавляем кол-во по клику
	$('.quantity_inner .bt_minus').click(function () {
		let $input = $(this).parent().find('.quantity');
		let count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
	});
	// Прибавляем кол-во по клику
	$('.quantity_inner .bt_plus').click(function () {
		let $input = $(this).parent().find('.quantity');
		let count = parseInt($input.val()) + 1;
		count = count > parseInt($input.data('max-count')) ? parseInt($input.data('max-count')) : count;
		$input.val(parseInt(count));
	});
});