// import Slider from './slider'

let slider = new Slider();
slider.start('carousel__slider');

// Табы
const tabsBtn = document.querySelectorAll('.catalog__tab');
const tabsItems = document.querySelectorAll('.catalog__content');

function onTabClick(item) {
    item.addEventListener('click', function() {
        let currentBtn  = item;
        let tabId = currentBtn.getAttribute('data-tab');
        let currentTab = document.querySelector(tabId);

        if( ! currentBtn.classList.contains('catalog__tab--active') ) {
            tabsBtn.forEach(function(item) {
                item.classList.remove('catalog__tab--active');
            });
            tabsItems.forEach(function(item) {
                item.classList.remove('catalog__content--active');
            });
    
    
            currentBtn.classList.add('catalog__tab--active');
            currentTab.classList.add('catalog__content--active');
        };
    });
};

tabsBtn.forEach(onTabClick);
document.querySelector('.catalog__tab:nth-child(1) ').click();

// Показ пульсометров по дефолту
let catalogItemContents = document.querySelectorAll('.catalog-item__content');
function showContent (item) {
    item.classList.add('catalog-item__content--active');
};
catalogItemContents.forEach(showContent);


// Переключение по ссылке
let catalogItemLinks = document.querySelectorAll('.catalog-item__link');
let catalogItemLists = document.querySelectorAll('.catalog-item__list');
let catalogItemBack = document.querySelectorAll('.catalog-item__back');
let catalogItemPulsometer = document.querySelectorAll('.catalog-item__subtitle');


// добавляем классы в ссылку и  скрытый лист
const addClassToArray = (array) => {
    for (let i = 0; i < array.length; i++) {
        array[i].setAttribute('data-index', i);
    };
};

addClassToArray(catalogItemLinks);
addClassToArray(catalogItemLists);
addClassToArray(catalogItemContents);
addClassToArray(catalogItemBack);





let addClassActive = (array, classActive, linkData) => {
    array.forEach((item) => {
        let dataInfo = item.getAttribute('data-index');
        if (dataInfo == linkData) {
            item.classList.add(classActive);
        };
    });
};

let removeClassActive = (array, classActive, linkData) => {
    array.forEach((item) => {
        let dataInfo = item.getAttribute('data-index');
        if (dataInfo == linkData) {
            item.classList.remove(classActive);
        };
    });
};


// Получаем цифру из класса ссылки
catalogItemLinks.forEach((currentLink) => {
    currentLink.addEventListener('click', (event)=> {
        event.preventDefault();
        let linkData = currentLink.getAttribute('data-index');

        addClassActive(catalogItemLists, 'catalog-item__list--active', linkData);
        removeClassActive(catalogItemContents, 'catalog-item__content--active', linkData);
    });
});

catalogItemBack.forEach((currentBack) => {
    currentBack.addEventListener('click', (event) => {
        event.preventDefault();
        let linkData = currentBack.getAttribute('data-index');

        removeClassActive(catalogItemLists, 'catalog-item__list--active', linkData);
        addClassActive(catalogItemContents, 'catalog-item__content--active', linkData);
    });
});


const modalBtnConsultation = document.querySelectorAll('button[data-modal="consultation"]');
const modalBtnOrder = document.querySelectorAll('.button--mini');

const overlay = document.querySelector('.overlay');
const modalWindows = document.querySelectorAll('.modal');
const modalWindowConsultation = document.querySelector('#consultation');
const modalWindowOrder = document.querySelector('#order');
const modalClose = document.querySelectorAll('.modal__close');


function showModalConsultation () {
    modalBtnConsultation.forEach((btn) => {
        btn.addEventListener('click', () => {
            overlay.classList.toggle('visible');
            modalWindowOrder.classList.remove('visible');
            modalWindowConsultation.classList.add('visible');
            modalWindowConsultation.classList.remove('hidden');
        });
    });
};

showModalConsultation();

function showModalOrder () {
    modalBtnOrder.forEach((btn) => {
        btn.addEventListener('click', () => {
            const parent = btn.closest('.catalog-item');
            const content = parent.firstElementChild.firstElementChild;
            const title = content.children[1];
            const titleInner = title.textContent;
            modalWindowOrder.children[2].innerHTML = titleInner;
            overlay.classList.toggle('visible');
            modalWindowOrder.classList.add('visible');
            modalWindowOrder.classList.remove('hidden');
            modalWindowConsultation.classList.remove('visible');
        });
    })
}
showModalOrder();

// Нажатие на крестик закрывает модальные окна

function closeModalWindow() {
    modalClose.forEach((close) => {
        close.addEventListener('click', () => {
            overlay.classList.remove('visible');
            modalWindows.forEach((window) => {
                modalWindows.forEach((window) => {
                    window.classList.add('hidden');
                    window.classList.remove('visible');
                })
                
            })
        });   
    });
};
closeModalWindow();























