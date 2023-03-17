document.addEventListener('DOMContentLoaded', function() {
	
    // counter up
//     function VanillaCounter() {
//         let elements = document.querySelectorAll('[data-vanilla-counter]')
//         elements.forEach(i => {
//             let data = {
//                 startAt: parseInt(i.getAttribute('data-start-at')),
//                 endAt: parseInt(i.getAttribute('data-end-at')),
//                 delay: parseInt(i.getAttribute('data-delay')) || 0,
//                 format: '{}',
//                 time: parseInt(i.getAttribute('data-time')) || 0.1
//             }
//             if (i.getAttribute('data-format')) {
//                 data.format = i.getAttribute('data-format')
//             } else if (i.innerHTML != "") {
//                 data.format = i.innerHTML
//             }
//             console.log(data.format)
//             if (data.startAt == null) {
//                 throw new Error('data-start-at attribute is required')
//             }
//             if (data.endAt == null) {
//                 throw new Error('data-end-at attribute is required')
//             }
//             var counter = data.startAt
//             i.innerHTML = data.format.replace('{}', counter)
//             var intervalTime = Math.ceil(data.time / (data.endAt - data.startAt))
//             setTimeout(() => {
//                 var interval = setInterval(intervalHandler, intervalTime)
//                 function intervalHandler() {
//                     counter += (data.endAt - data.startAt) / Math.abs(data.endAt - data.startAt) * 1
//                     i.innerHTML = data.format.replace('{}', counter)
//                     if (counter == data.endAt) {
//                         clearInterval(interval)
//                     }
//                 }
//             }, data.delay)
//         })
//     }
//    // Получаем нужный элемент
//     var element = document.querySelector('.numbers__box');
//         var Visible = function (target) {
//         // Все позиции элемента
//         var targetPosition = {
//             top: window.pageYOffset + target.getBoundingClientRect().top,
//             left: window.pageXOffset + target.getBoundingClientRect().left,
//             right: window.pageXOffset + target.getBoundingClientRect().right,
//             bottom: window.pageYOffset + target.getBoundingClientRect().bottom
//             },
//             // Получаем позиции окна
//             windowPosition = {
//             top: window.pageYOffset,
//             left: window.pageXOffset,
//             right: window.pageXOffset + document.documentElement.clientWidth,
//             bottom: window.pageYOffset + document.documentElement.clientHeight
//             };

//         if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
//             targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
//             targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
//             targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
//             // Если элемент полностью видно, то запускаем следующий код
//             console.clear();
//             //console.log('Вы видите элемент :)');
//             VanillaCounter();
//         } else {
//             // Если элемент не видно, то запускаем этот код
//             //console.clear();
//         };
//     };
//     // Запускаем функцию при прокрутке страницы
//     window.addEventListener('scroll', function() {
//         Visible(element);
//     });
    

    
    
    
    
    
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