$(function() {
	


    //Ymap start
    var spinner = $('.ymap-container').children('.loader');
    var check_if_load = 0;
    var myMap, myPlacemark;

    function init() {
        myMap = new ymaps.Map('map', {
            center: [55.779003, 37.629475],
            zoom: 16,
            controls: []
        });
        // myMap.behaviors.disable('scrollZoom');
        // myMap.behaviors.disable('drag');
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),
            myPlacemark = new ymaps.Placemark([55.779003, 37.629475], {
                hintContent: 'г. Москва, ул. Щепкина, д.28, офис 413',
                balloonContent: 'г. Москва, ул. Щепкина, д.28, офис 413'
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'img/map.webp',
                iconImageSize: [62, 62],
                iconImageOffset: [-15, -42]
            });
        var zoomControl = new ymaps.control.ZoomControl({
            options: {
                size: "auto",
                position: {
                    top: 120,
                    left: 15
                }
            }
        });
        myMap.controls.add(zoomControl);
        myMap.geoObjects.add(myPlacemark);

        //Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
        var layer = myMap.layers.get(0).get(0);
        //Решение по callback-у для определния полной загрузки карты: http://ru.stackoverflow.com/questions/463638/callback-загрузки-карты-yandex-map
        waitForTilesLoad(layer).then(function () {
            //Скрываем
            spinner.removeClass('is-active')
        });
    };

    function waitForTilesLoad(layer) {
        return new ymaps.vow.Promise(function (resolve, reject) {
            var tc = getTileContainer(layer),
                readyAll = true;
            tc.tiles.each(function (tile, number) {
                if (!tile.isReady()) {
                    readyAll = false;
                }
            });
            if (readyAll) {
                resolve();
            } else {
                tc.events.once("ready", function () {
                    resolve();
                });
            }
        });
    }
    
    
    
    
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



    // custom select
    // custom select
    // custom select

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
            if (navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)
            ) {
                x();
            }
            else {
                y();
            }
        }
    }

});