$(document).ready(function() {
    /* Custom Select */
    //Получаем все "select" по селектору
    const selects = document.querySelectorAll('.select__item')
    //переборка по полученным "select"
    for (let i = 0; i < selects.length; i++) {
        const select = selects[i]
        //получаем все "option" внутри "select"
        const options = select.querySelectorAll('option')
        //создаем кастомный "select"
        const cSelect = document.createElement('div')
        const cSelectList = document.createElement('div')
        const cSelectCurrent = document.createElement('div');
        cSelectCurrent.setAttribute('tabindex', '0')

        select.setAttribute('tabindex', '-1')
        //задем классы и атрибуты кастомному "select"
        cSelect.className = 'custom-select'
        cSelectList.className = 'custom-select__list'
        cSelectCurrent.className = 'custom-select__current'
        //по умолчанию у button будет type="submit", поэтому меням на type="button" чтобы избежать отправку формы при клие на кастомный "select"
        cSelectCurrent.setAttribute('type', 'button')
        //создаем вложенность созданных элементов
        cSelect.append(cSelectCurrent, cSelectList)
        //добавляем кастоный "select" сразу после оргинального "select"
        select.after(cSelect)
        //получаем список и значения "option" из "select", затем создаём кастомный "option" для кастомного "select"
        const createCustomDom = function (x, y) {
            let selectItems = ''
            for (var i = 0; i < options.length; i++) {
                selectItems += '<button type="button" class="custom-select__item" data-value="' + options[i].value + '">' + options[i].text + '</button>'
            }
            cSelectList.innerHTML = selectItems
            x(), y();
        }
        //открываем-закрываем выпадающий список по клику
        const toggleClass = () => { cSelect.classList.toggle('custom-select--show') }
        //присваиваем текстовое первое значение "option" в кастомном "select"
        const currentTextValue = () => cSelectCurrent.textContent = cSelectList.children[0].textContent
        //получаем и задаем значения text/value 
        const currentValue = () => {
            const items = cSelectList.children
            for (var el = 0; el < items.length; el++) {
                let selectValue = items[el].getAttribute('data-value')
                let selectText = items[el].textContent
                items[el].addEventListener('click', () => {
                    cSelect.classList.remove('custom-select--show')
                    cSelectCurrent.textContent = selectText
                    select.value = selectValue
                })
            }
        }
        const desctopFn = () => {
            cSelectCurrent.addEventListener('click', toggleClass);
            cSelectCurrent.addEventListener('keydown', (event) => {
                if (event.code == 'Enter' || event.code == 'Escape') {
                    toggleClass()
                }
            });
        }
        const mobileFn = () => {
            for (let j = 0; j < selects.length; j++) {
                let mobileSelect = selects[j]
        mobileSelect.classList.add('select__item--mobile')
                mobileSelect.addEventListener('change', () => {
                    mobileSelect.nextElementSibling.querySelector('.custom-select__current').textContent = mobileSelect.value
                })
            }
        }
        createCustomDom(currentTextValue, currentValue)
        //закрываем выпадающий список по клику вне области кастомного селекта
        document.addEventListener('mouseup', (e) => {
            if (!cSelect.contains(e.target)) cSelect.classList.remove('custom-select--show')
        })
        detectmob(mobileFn, desctopFn)
        function detectmob(x, y) {
            if (0 == 1) {
                x();
            }
            else {
                y();
            }
        }
    }


    // калькулятор
    $(".calculator__group input").keyup(function () {
        $(this).val(thousandSeparator($(this).val().replace(/[^0-9]/g, "")));
        var yandex = $("[name='yandex']").val().replace(/\s/g, '');
        var google = $("[name='google']").val().replace(/\s/g, '');
        var priceyandex = $("[name='priceyandex']").val().replace(/\s/g, '');
        var pricegoogle = $("[name='pricegoogle']").val().replace(/\s/g, '');
        //var theme = $(".theme option").prop('selected', true).change().attr('data');
        var theme = "";

        $( ".calculator__group select option:selected" ).each(function() {
            theme += $( this ).attr('data') + " ";
        });

        if(priceyandex == ''){
            if(theme == undefined){
                resultyandex = (yandex / 100 * theme)*50;
            }else{
                resultyandex = (yandex / 100 * 25)*50;
            }
        }else{
            if(theme == undefined){
                resultyandex = (yandex / 100 * theme)*priceyandex;
            }else{
                resultyandex = (yandex / 100 * 25)*priceyandex;
            }
        }

        if(pricegoogle == ''){
            if(theme == undefined){
                resultgoogle = (google / 100 * theme)*50;
            }else{
                resultgoogle = (google / 100 * 25)*50;
            }
        }else{
            if(theme == undefined){
                resultgoogle = (google / 100 * theme)*pricegoogle;
            }else{
                resultgoogle = (google / 100 * 25)*pricegoogle;
            }
        }


        resultSUM = resultyandex+resultgoogle;
        var sumyear = resultSUM*12

        if(sumyear || resultSUM){
            $('.year span').text(thousandSeparator(Math.ceil(sumyear)));
            $('.month span').text(thousandSeparator(Math.ceil(resultSUM)));
        }else{
            $('.year span').text('0');
            $('.month span').text('0');
        }

    });

    $(".calculator__group select").change(function(){
        var yandex = $("[name='yandex']").val().replace(/\s/g, '');
        var google = $("[name='google']").val().replace(/\s/g, '');

        var priceyandex = $("[name='priceyandex']").val().replace(/\s/g, '');
        var pricegoogle = $("[name='pricegoogle']").val().replace(/\s/g, '');

        var theme = "";
        $( ".calculator__group select option:selected" ).each(function() {
            theme += $( this ).attr('data') + " ";
        });


        if(priceyandex == ''){
            resultyandex = (yandex / 100 * theme)*50;
        }else{
            resultyandex = (yandex / 100 * theme)*priceyandex;
        }

        if(pricegoogle == ''){
            resultgoogle = (google / 100 * theme)*50;
        }else{
            resultgoogle = (google / 100 * theme)*pricegoogle  
        }

        resultSUM = resultyandex+resultgoogle;
        var sumyear = resultSUM*12


        if(sumyear || resultSUM){
            $('.year span').text(thousandSeparator(Math.ceil(sumyear)));
            $('.month span').text(thousandSeparator(Math.ceil(resultSUM)));
        }else{
            $('.year span').text('0');
            $('.month span').text('0');
        }

    });

    var thousandSeparator = function (str) {
    var parts = (str + '').split('.'),
        main = parts[0],
        len = main.length,
        output = '',
        i = len - 1;

    while (i >= 0) {
        output = main.charAt(i) + output;
        if ((len - i) % 3 === 0 && i > 0) {
            output = ' ' + output;
        }
        --i;
    }

    if (parts.length > 1) {
        output += '.' + parts[1];
    }
    return output;
    };


    
    $('.custom-select__item').on('click', function(){
        if($(this).data('value') == 'Выберите тематику сайта'){
            $('.custom-select__current').removeClass('custom-select__current--notdef');
        } else {
            $('.custom-select__current').addClass('custom-select__current--notdef');
        }
    });

    $('.custom-select__item[data-value="Выберите тематику сайта"]').on('click', function(){
        $('.calopt0').prop('selected',true);
    });
    $('.custom-select__item[data-value="Реклама"]').on('click', function(){
        $('.calopt1').prop('selected',true);

    });
    $('.custom-select__item[data-value="Услуги"]').on('click', function(){
        $('.calopt2').prop('selected',true);
    })
    $('.custom-select__item[data-value="Ecommerce / online retail"]').on('click', function(){
        $('.calopt3').prop('selected',true);
    });
    $('.custom-select__item[data-value="Образование"]').on('click', function(){
        $('.calopt4').prop('selected',true);
    })
    $('.custom-select__item[data-value="Финансы"]').on('click', function(){
        $('.calopt5').prop('selected',true);
    });
    $('.custom-select__item[data-value="Юриспруденция"]').on('click', function(){
        $('.calopt6').prop('selected',true);
    })
    $('.custom-select__item[data-value="Медицина"]').on('click', function(){
        $('.calopt7').prop('selected',true);
    });
    $('.custom-select__item[data-value="Онлайн сервисы"]').on('click', function(){
        $('.calopt8').prop('selected',true);
    })
    $('.custom-select__item[data-value="Медицина"]').on('click', function(){
        $('.calopt7').prop('selected',true);
    });
    $('.custom-select__item[data-value="Онлайн сервисы"]').on('click', function(){
        $('.calopt8').prop('selected',true);
    })
    $('.custom-select__item[data-value="Программное обеспечение / IT"]').on('click', function(){
        $('.calopt9').prop('selected',true);
    });
    $('.custom-select__item[data-value="Телеком"]').on('click', function(){
        $('.calopt10').prop('selected',true);
    })
    $('.custom-select__item[data-value="Туризм"]').on('click', function(){
        $('.calopt11').prop('selected',true);
    });
    $('.custom-select__item[data-value="Недвижимость"]').on('click', function(){
        $('.calopt12').prop('selected',true);
    })
    $('.custom-select__item[data-value="Авто"]').on('click', function(){
        $('.calopt13').prop('selected',true);
    });
    

    $('.custom-select__item').on('click', function(){
        var yandex = $("[name='yandex']").val().replace(/\s/g, '');
        var google = $("[name='google']").val().replace(/\s/g, '');

        var priceyandex = $("[name='priceyandex']").val().replace(/\s/g, '');
        var pricegoogle = $("[name='pricegoogle']").val().replace(/\s/g, '');

        var theme = "";
        $( ".calculator__group select option:selected" ).each(function() {
            theme += $( this ).attr('data') + " ";
        });


        if(priceyandex == ''){
            resultyandex = (yandex / 100 * theme)*50;
        }else{
            resultyandex = (yandex / 100 * theme)*priceyandex;
        }

        if(pricegoogle == ''){
            resultgoogle = (google / 100 * theme)*50;
        }else{
            resultgoogle = (google / 100 * theme)*pricegoogle  
        }

        resultSUM = resultyandex+resultgoogle;
        var sumyear = resultSUM*12


        if(sumyear || resultSUM){
            $('.year span').text(thousandSeparator(Math.ceil(sumyear)));
            $('.month span').text(thousandSeparator(Math.ceil(resultSUM)));
        }else{
            $('.year span').text('0');
            $('.month span').text('0');
        }
    })

    // dropdown
    let dropdowns = document.querySelectorAll('.nav__dropdown');
	dropdowns.forEach(dropdown => {
        document.addEventListener('click', (e) => {
            if(!e.composedPath().includes(dropdown)){
                dropdown.classList.remove('nav__dropdown--open');
            }
        });

		dropdown.addEventListener('click', function(){
			dropdown.classList.toggle('nav__dropdown--open');
		});
	});

	// menu
	let burgerIcon = document.querySelector('.header__toggle-burger');
    let closeIcon = document.querySelector('.header__toggle-close');
    let menu = document.querySelector('.header__panel');
    let scrollObject = document.querySelector('.header__panel');

	burgerIcon.addEventListener('click', function(){
		closeIcon.classList.remove('hidden');
		burgerIcon.classList.add('hidden');
        menu.classList.add('header__panel--open');
        scrollLock.disablePageScroll(scrollObject);
    })
    closeIcon.addEventListener('click', function(){
		closeIcon.classList.add('hidden');
		burgerIcon.classList.remove('hidden');
        menu.classList.remove('header__panel--open');
        scrollLock.enablePageScroll(scrollObject);
    })

	// fixed header
	window.onscroll = function showHeader() {
        var header = document.querySelector('.header');
        if(window.pageYOffset > 100){
            header.classList.add('header_fixed');
        } else{
            header.classList.remove('header_fixed');
        }
    }

	// tabs
	let tab = document.querySelectorAll('.tabs__head'),
	tabContent = document.querySelectorAll('.tabs__item');
		tab.forEach(function(tab, i) {
		tab.addEventListener('click', function() {
			hideTab();
			this.classList.add('tabs__item--show');
			tabContent[i].classList.add('tabs__item--show');
		});
	});

	function hideTab() {
		tab.forEach((item) => {
			item.classList.remove('tabs__item--show');
		});
		tabContent.forEach((item) => {
			item.classList.remove('tabs__item--show');
		});
	}
	// accordion
	const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(el => {
        el.addEventListener('click', (e) => {
            const self = e.currentTarget;
            const control = self.querySelector('.accordion__control');
            const content = self.querySelector('.accordion__content');

            self.classList.toggle('open');

            // если открыт аккордеон
            if (self.classList.contains('open')) {
                control.setAttribute('aria-expanded', true);
                content.setAttribute('aria-hidden', false);
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                control.setAttribute('aria-expanded', false);
                content.setAttribute('aria-hidden', true);
                content.style.maxHeight = null;
            }
        });
    });





    let alreadyDone = false;
    $(window).on("scroll", function() {
        if($('.numbers__box').hasClass('animated') && alreadyDone == false){
            alreadyDone = true;
            runCounter();
        }
    })

    function runCounter () {
        $('.numbers__item-count').each(function(){

            function divideNumberByPieces(x, delimiter) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || " ");
            }

          const This = $(this);
          $({Count: This.text()}).animate(
            {Count: This.parent().attr("data-count")},
            {
              duration: 1500,
              easing: "linear",
              step: function(){
                This.text(Math.floor(this.Count))
              },
              complete: function(){
                This.text(this.Count).css({color:"red"});
                document.querySelector('.numbers__item-count--a').innerHTML = divideNumberByPieces(634522722);
                document.querySelector('.numbers__item-count--b').innerHTML = divideNumberByPieces(31245000);
                document.querySelector('.numbers__item-count--c').innerHTML = divideNumberByPieces(7062);
                document.querySelector('.numbers__item-count--d').innerHTML = divideNumberByPieces(50312);
              }
            }
          )
        })
    }
});