/*
    1.Форма поиска
    2. hamburger-menu
    3. Меню каталог
    4. Модальные окна
    5. header
    6.Мобильная строка поиска
    7. Faq-форма
    8. Маски
    9. Range-slider
    10. Добавление в избранное
*/


//1.Форма поиска
const searchInputs = document.querySelectorAll('.search-form > input');

if ( searchInputs.length ){
    searchInputs.forEach( inp => {
        const parent = inp.closest('.search-form');
        if ( inp.value.length ){
            parent.classList.add('active');
        } else{
            parent.classList.remove('active');
        }
        inp.addEventListener('input', function(e){
            if ( this.value.length ){
                parent.classList.add('active');
            } else{
                parent.classList.remove('active');
            }
        })
    } )
}

//1.КОНЕЦ: Форма поиска

//2. hamburger-menu

const hamburger = document.querySelector('.hamburger');
const hamburgerMenu = document.querySelector('.hm-container');
const closeHamburgerMenu = document.querySelector('.hamburger-menu__close-btn')

function closeHamMenu(){
    anime({
        targets: '.hamburger-menu',
        translate: '120%',
        duration: 500,
        delay: 200,
        easing: 'easeInOutQuint',
        
        complete: function(anim) {
            hamburgerMenu.classList.remove('show');
            this.animatables[0].target.removeAttribute('style');
            document.body.classList.remove('no-scroll');
        }
    });
}

hamburger.addEventListener('click', function(){
    hamburgerMenu.classList.add('show');
    document.body.classList.add('no-scroll');
});



hamburgerMenu.addEventListener('click', function(event){
    if ( event.target.classList.contains('hm-container') ){
        closeHamMenu();        
    }
});

closeHamburgerMenu.addEventListener('click', function(){
    closeHamMenu();    
})

//КОНЕЦ: 2. hamburger-menu


//3. Меню каталог

const openCatalog = document.querySelector('.catalog-btn');
const catalogContainer = document.querySelector('.catalog-menu-container');
const closeCatalogMenu = document.querySelector('.catalog-menu__close-btn');

function closeCatMenu(){
    anime({
        targets: '.catalog-menu-container',
        translate: '-120%',
        duration: 500,
        delay: 200,
        easing: 'easeInOutQuint',
        
        complete: function(anim) {
            catalogContainer.classList.remove('show');
            this.animatables[0].target.removeAttribute('style');
            document.body.classList.remove('no-scroll');
        }
    });
}

const categoriesCols = document.querySelector('.catalog-menu__categories-col');
const catalogMenuHeader = document.querySelector('.catalog-menu__header');

function setMaxHeightForCategoriesMenu(bottomOffset = 0){
    let vh = document.documentElement.clientHeight;
    let headerHeight = catalogMenuHeader.offsetHeight;
    categoriesCols.style.maxHeight = (vh - headerHeight - bottomOffset) + 'px';
    
}

window.addEventListener('resize', function(){
    setMaxHeightForCategoriesMenu(30);
})


openCatalog.addEventListener('click', function(){
    catalogContainer.classList.add('show');
    document.body.classList.add('no-scroll');
    setMaxHeightForCategoriesMenu(30);
})
closeCatalogMenu.addEventListener('click', function(){
    closeCatMenu()
})

catalogContainer.addEventListener('click', function(event){
    if ( event.target.classList.contains('catalog-menu-container') ){
        closeCatMenu()        
    }
});

const spoilerHeader = document.querySelectorAll('.spoiler-header');


function deploySpoiler(header, content, h){
    anime({
        targets: content,
        height: h,
        duration: 500,
        delay: 0,
        easing: 'easeInOutQuint',
        begin: function(anim) {
            header.classList.add('opened')
        },
        complete: function(anim) {
            header.classList.add('open');
            header.classList.remove('opened');
            content.style.height = 'auto';
        }
    });
}

function rollSpoiler(header, content){
    anime({
        targets: content,
        height: 0,
        duration: 500,
        delay: 0,
        easing: 'easeInOutQuint',
        begin: function(anim) {
            header.classList.add('closed');            
        },
        complete: function(anim) {
            header.classList.remove('open');
            header.classList.remove('closed');
            
        }
    });
}


if ( spoilerHeader.length ){

    

    window.addEventListener('resize', function(){
        let spoilerBodyStyled = document.querySelectorAll('.spoiler-body[style]');

        if ( spoilerBodyStyled.length ){
            const accordion = spoilerBodyStyled[0].closest('.accordion') ;

            if ( accordion.getAttribute('data-place') === 'menu' ){
                spoilerBodyStyled.forEach( sp => {
                    sp.removeAttribute('style');
                });
        
                let openHeaders = document.querySelectorAll('.spoiler-header.open');
                openHeaders.forEach( oh => {
                    oh.classList.remove('open');
                } )
            }
        }
        

        
    });



    spoilerHeader.forEach( tb => {
        tb.addEventListener('click', function(){
            
            const parentContainer = this.closest('.accordion');
            const isMenuAccrodion = ( parentContainer.getAttribute('data-place') === 'menu') ? true : false;     
        
            function openSpoilerBody(clickedHeader){
                const targetLink = clickedHeader.getAttribute('data-target');
                const target = document.querySelector(targetLink);
                

                if ( !clickedHeader.classList.contains('open') ){                    
                    const heightListContainer  = target.querySelector('* > [data-measure]').offsetHeight;
                    deploySpoiler(tb, target, heightListContainer);
                } else{
                    const heightListContainer  = target.querySelector('* > [data-measure]').offsetHeight;
                    target.style.height = target.offsetHeight + 'px';
                    rollSpoiler(tb, target);
                }
            }

            
            if ( isMenuAccrodion ){
                
                if (!this.classList.contains('opened') && !this.classList.contains('closed')){
                    let vw = document.documentElement.clientWidth;
                    const smBreakpoint = Number(getComputedStyle(document.documentElement).getPropertyValue('--bp-sm'));
                    
                    if (vw < smBreakpoint){
                        openSpoilerBody(this)
                    }
                    
                }
                  
            } else{
                if (!this.classList.contains('opened') && !this.classList.contains('closed')){
                    openSpoilerBody(this)
                    
                    
                }
            }


            
            
            

             
    
        })
    } )
}


const tabs = document.querySelectorAll('.tab');

if (tabs.length){

    tabs.forEach( tab => {
        tab.addEventListener('click', function(){
            if ( !this.classList.contains('active') ){
                const family = this.getAttribute('data-family');
                
                const activeTab = document.querySelector('.tab.active[data-family="'+family+'"]');
                console.log(activeTab);
                if ( activeTab ){
                    const activeSheetLink = activeTab.getAttribute('data-target');
                    const activeSheet  =  document.querySelector(activeSheetLink);

                    if ( activeSheet ) activeSheet.classList.remove('active');
                    
                    activeTab.classList.remove('active');
                }

                const newActiveSheetLink = this.getAttribute('data-target');
                const newActiveSheet = document.querySelector(newActiveSheetLink);
                if ( newActiveSheet )  newActiveSheet.classList.add('active');
                this.classList.add('active')
            }
        });
    } )

    
}
//3. КОНЕЦ: Меню каталог


//4. Модальные окна
let options = {
    zIndex: 1000, 
    //background: 'rgba(12, 130, 121, 0.5)', 
    displayModalContainer: 'flex', 
    displayModal: 'block', 

    closeSelectors: ['.close-btn'], 
    closeModalOnFogClick: true, 
    showModalAnimation: 'fadeIn', 
    closeModalAnimation: 'fadeOut',  
    showModalDuration: '300ms',
    closeModalDuration: '500ms',

    showFogAnimation: 'fadeInTop',
    closeFogAnimation: 'fadeOut',
    showFogDuration: '300ms',
    closeFogDuration: '500ms',
    documentCanScroll: false, 

    // 'modal-first' - сначала скрывается модальное окно - затем туман
    // 'along' - анимации закрытия тумана и окна происходят параллельно
    closeMode: 'modal-first',
    beforeClose: function(){console.log('before modal close');},
    afterClose: function(){console.log('close modal close');},
    beforeAppendModal: function(){console.log('before append modal');},
    afterShow: function(){console.log('after show modal');}

}





const modalCallBtns = document.querySelectorAll('[data-role="call-modal"]');

let calledModal;
modalCallBtns.forEach( btn => {
    btn.addEventListener('click', function(){
        const modalLink = this.getAttribute('data-target');
        
        calledModal = new easyModal(modalLink, options);
    });
} )

//4. КОНЕЦ: Модальные окна

//5. header

const header = document.querySelector('.header');
const profileMobNav = document.querySelector('.profile-mob-nav');
function styledHeader(){
    let halfHeaderHeight = header.offsetHeight / 3;



    if (window.pageYOffset > halfHeaderHeight ){
        header.classList.add('scrolled');

        if (profileMobNav){
            header.classList.add('hide-shadow');
        }

    } else{
        header.classList.remove('scrolled');
        if (profileMobNav){
            header.classList.remove('hide-shadow');
        }
    }
}


document.addEventListener('DOMContentLoaded', function(){
    styledHeader()
})



const tabletBottomMenu = document.querySelector('.tablet-bottom-menu');

function showTabletBottomMenu(){
    let halfHeaderHeight = header.offsetHeight / 3;

    if (window.pageYOffset > halfHeaderHeight ){
        tabletBottomMenu.classList.add('show');
    } else{
        tabletBottomMenu.classList.remove('show');
    }
}



function stickyProfileNav(){
    profileMobNav.style.top = ( header.offsetHeight ) + 'px';
}


window.addEventListener('scroll', function(){
    styledHeader()
    
    if ( profileMobNav ){
        stickyProfileNav();
    }

    if ( tabletBottomMenu ){
        showTabletBottomMenu()
    }


    

})
//5. КОНЕЦ: header

//6. Мобильная строка поиска
const mobSearchBtn = document.querySelector('.mob-search-btn');
const mobSearchContainer = document.querySelector('.bottom-menu__search-container'); 

mobSearchBtn.addEventListener('click', function(){
    if ( !this.classList.contains('active') ){
        this.classList.add('active');
        anime({
            targets: mobSearchContainer,            
            duration: 300,  
            opacity: 1,
            translateX: '0%',         
            easing: 'easeInOutQuint',
            begin: function(anim) {
                mobSearchContainer.style.display = 'block';
            },
        });
    } else{
        const self = this;
        anime({
            targets: mobSearchContainer,            
            duration: 300,  
            opacity: .5,
            translateX: '-150%',         
            easing: 'easeInOutQuint',
            complete: function(anim) {
                mobSearchContainer.style.display = 'none';
                
                self.classList.remove('active');
            },
        });
        
    }
})
//6. Конец: Мобильная строка поиска

//7. Faq-форма


let thanksOptions = {
    zIndex: 1000, 
    //background: 'rgba(12, 130, 121, 0.5)', 
    displayModalContainer: 'flex', 
    displayModal: 'flex', 

    closeSelectors: ['.close-btn'], 
    closeModalOnFogClick: true, 
    showModalAnimation: 'fadeInBottom', 
    closeModalAnimation: 'fadeOutTop',  
    showModalDuration: '300ms',
    closeModalDuration: '500ms',

    showFogAnimation: 'fadeIn',
    closeFogAnimation: 'fadeOut',
    showFogDuration: '300ms',
    closeFogDuration: '500ms',
    documentCanScroll: false, 

    // 'modal-first' - сначала скрывается модальное окно - затем туман
    // 'along' - анимации закрытия тумана и окна происходят параллельно
    closeMode: 'modal-first',
    beforeClose: function(){console.log('before modal close');},
    afterClose: function(){console.log('close modal close');},
    beforeAppendModal: function(){
        if ( calledModal ) calledModal.closeModal();
    },
    afterShow: function(){console.log('after show modal');}

}

const faqForms = document.querySelectorAll('.faq-from');

if ( faqForms.length ){
    faqForms.forEach( form => {
        form.onsubmit = function(event){
            event.preventDefault();
            
            
            let data_body = "name=" + this.name.value + '&phone=' +  this.phone.value + '&email=' +  this.email.value + '&theme=' +  this.theme.value + '&text=' +  this.text.value; 
            fetch("script-name.php", {
                method: "POST",
                body: data_body,
                headers:{"content-type": "application/x-www-form-urlencoded"} 
            })
            .then( (response) => {
                if (response.status !== 200) {
                    return Promise.reject();
                }
                
                this.name.value = "";
                this.phone.value = "";
                this.email.value = "";
                this.theme.value = "";
                this.text.value = "";

                return response.text()
            })
            .then(i => console.log(i))
            .catch(() => {
                console.log('ошибка')

                this.name.value = "";
                this.phone.value = "";
                this.email.value = "";
                this.theme.value = "";
                this.text.value = "";

                const thanksModal = new easyModal('.thanks-modal', thanksOptions);

                setTimeout(()=>{
                    thanksModal.closeModal();
                }, 2000)
            });
        }
    } )
}
//7. КОНЕЦ: Faq-форма

//8. Маски
const phoneMasks = document.querySelectorAll("input[name='phone']");
if (phoneMasks.length){
    phoneMasks.forEach( (input) => {
        IMask(
            input, {
              mask: '+{7}(000)000-00-00'
          });
    })
}

const productQtyInputs = document.querySelectorAll(".product__qty");
const bigProductQtyInputs = document.querySelectorAll(".big-product__qty");

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

if ( productQtyInputs.length ){
    productQtyInputs.forEach( (input) => {
        IMask(
            input, {
                mask: Number,
                min: 1,
        });
        
        input.addEventListener('blur', function(){
            if ( !isNumeric(this.value) ){
                this.value = 1;
            }
        });

        input.addEventListener('change', function(){
            const value = +this.value;
            if (value < 1) this.value = 1;
        })
    })
}
if ( bigProductQtyInputs.length ){
    bigProductQtyInputs.forEach( (input) => {
        IMask(
            input, {
                mask: Number,
                min: 1,
        });
        
        input.addEventListener('blur', function(){
            if ( !isNumeric(this.value) ){
                this.value = 1;
            }
        });

        input.addEventListener('change', function(){
            const value = +this.value;
            if (value < 1) this.value = 1;
            

            bigProductQtyInputs.forEach( inp => {
                inp.value = value;
            })
        })

        input.addEventListener('input', function(){
            
        })
    })
}
//8. КОНЕЦ: Маски

//9. Range-slider
const rangeSlider = document.getElementById('range-slider');


if ( rangeSlider ){
  
    const minRange = document.querySelector('.min-range');   
    const maxRange = document.querySelector('.max-range');  
    
    const minValue = Number( minRange.getAttribute('min') );
    const maxValue = Number( maxRange.getAttribute('max') );
    const stepRange = Number( maxRange.getAttribute('data-step') );

    
    
    const filtersList = document.querySelector('.filters-list');


  noUiSlider.create(rangeSlider, {
      start: [minRange.value, maxRange.value],
      connect: true,
      range: {
          'min': minValue,
          'max': maxValue
      },
      step: stepRange,
  
      
  });


  minRange.addEventListener('input', function(){
    let numMin = Number( this.value );
    let numMax = Number( maxRange.value );
    if (numMin > numMax) {
      numMin = numMax

      this.value = numMin;
    }
    rangeSlider.noUiSlider.set([numMin, null])
    //createRangeTag([numMin, numMax]);
  })

  minRange.addEventListener('blur', function(){
    
    if (this.value.length === 0){
      this.value = 0;
    }

    
  })

  maxRange.addEventListener('input', function(){
    let numMin = Number( minRange.value );
    let numMax = Number( this.value );
    if (numMax < numMin) {
      numMax = numMin

      
    }
    rangeSlider.noUiSlider.set([null, numMax])
    //createRangeTag([numMin, numMax]);
  })

  maxRange.addEventListener('blur', function(){
    
    if (this.value.length === 0){
      this.value = maxValue;
      rangeSlider.noUiSlider.set([null, maxValue])
    }
  })

  rangeSlider.noUiSlider.on('slide', function () { 
    let value = [Math.trunc(this.get()[0]), Math.trunc(this.get()[1])];
    minRange.value = value[0];
    maxRange.value = value[1];

    const targetContainer = document.querySelector('.ranges-wrapper.tooltip-target');
    
            
  });

  IMask(
    minRange, {
      mask: Number,
      min: minValue,
      max: maxValue
  });
  
  IMask(
    maxRange, {
      mask: Number,
      min: minValue,
      max: maxValue
  });

}
//9. КОНЕЦ: Range-slider


//10. Добавление в избранное
const addToFavoriteBtns = document.querySelectorAll('.product__add-favorite');
if ( addToFavoriteBtns.length ){
    addToFavoriteBtns.forEach( btn => {
        btn.addEventListener('click', function(){
            const product = this.closest('.product');
            if ( product ){
                if ( product.classList.contains('favorite') ){
                    product.classList.remove('favorite');
                } else{
                    product.classList.add('favorite');
                }
            } else{
                const product = this.closest('.big-product');
                if ( product.classList.contains('favorite') ){
                    product.classList.remove('favorite');
                } else{
                    product.classList.add('favorite');
                }
            }
            
            
        })
    } )
}


//11. Увеличение товаров в карточке

const productCardMinusBtns = document.querySelectorAll('.product__minus');
const productCardPlusBtns = document.querySelectorAll('.product__plus');

const bigProductCardMinusBtns = document.querySelectorAll('.big-product__minus');
const bigProductCardPlusBtns = document.querySelectorAll('.big-product__plus');

if ( productCardMinusBtns.length ){

    productCardMinusBtns.forEach( btn => {
        btn.addEventListener('click', function(){
            let parent =  this.closest('.product__buy-block');
            let inp = parent.querySelector('.product__qty');
            let value = inp.value;
            
            if ( !isNumeric(value) ) {
                inp.value = 1;
                const event = new Event('change');
                inp.dispatchEvent(event);
            } else{
                value = Number( value );
                value--;
                if (value < 1 ) value = 1
                inp.value = value;
                const event = new Event('change');
                inp.dispatchEvent(event);
            }
        })
    } )

    productCardPlusBtns.forEach( btn => {
        btn.addEventListener('click', function(){
            let parent =  this.closest('.product__buy-block');
            let inp = parent.querySelector('.product__qty');
            let value = inp.value;
            
            if ( !isNumeric(value) ) {
                inp.value = 1;

                const event = new Event('change');
                inp.dispatchEvent(event);
            } else{
                value = Number( value );
                value++;
                
                inp.value = value;
                const event = new Event('change');
                inp.dispatchEvent(event);
            }
        })
    } )
}

if ( bigProductCardMinusBtns.length ){

    bigProductCardMinusBtns.forEach( btn => {
        btn.addEventListener('click', function(){
            let parent =  this.closest('.big-product__buy-block');
            let inp = parent.querySelector('.big-product__qty');
            let value = inp.value;
            
            if ( !isNumeric(value) ) {
                inp.value = 1;
            } else{
                value = Number( value );
                value--;
                if (value < 1 ) value = 1
                inp.value = value;
                bigProductQtyInputs.forEach( inp => {
                    inp.value = value;
                })
            }
        })
    } )

    bigProductCardPlusBtns.forEach( btn => {
        btn.addEventListener('click', function(){
            let parent =  this.closest('.big-product__buy-block');
            let inp = parent.querySelector('.big-product__qty');
            let value = inp.value;
            
            if ( !isNumeric(value) ) {
                inp.value = 1;
            } else{
                value = Number( value );
                value++;
                
                inp.value = value;
                bigProductQtyInputs.forEach( inp => {
                    inp.value = value;
                })
            }
        })
    } )
}


//12. Сортировка 

const filterForm = document.querySelector('.filter');
const filterWrap = document.querySelector('.filter-wrap');


const sortPropBtns = document.querySelectorAll('button.prod-sort__prop');
sortPropBtns.forEach( btn => {
    btn.addEventListener('click', function(){
        if (!this.classList.contains('active')){
            let activeBtn = document.querySelector('.prod-sort__prop.active');

            if ( activeBtn ) activeBtn.classList.remove('active');

            const target = this.getAttribute('data-target');
            const value = this.getAttribute('data-value');

            const targetInput = document.querySelector('.filter input[name="'+target+'"]');
            targetInput.value = value;

            this.classList.add('active');

            
        }
    })
})


//13. Вид списка
const viewModeBtns =  document.querySelectorAll('.view-mode');
if  ( viewModeBtns.length ){
    viewModeBtns.forEach( btn => {
        btn.addEventListener('click',  function(){
            const mode = this.getAttribute('data-mode');
            const container = this.closest('.products-container');

            container.setAttribute('data-mode', mode);
        });
    } )
}

//14 Фильтрация
const uncheckFilterBtns = document.querySelectorAll('.selected-filter__uncheck');

if ( uncheckFilterBtns.length ){
    uncheckFilterBtns.forEach( btn => {

        btn.addEventListener('click', function(){
            const parent = this.closest('.selected-filter');
            const fieldType = parent.getAttribute('data-type');
            


            if ( fieldType == 'switch'){
                const target = parent.getAttribute('data-target');
                document.querySelector(target).checked = false;
            } 

            if ( fieldType == 'range'){
                const minValueLink = parent.getAttribute('data-min-target');
                const maxValueLink = parent.getAttribute('data-max-target');
                
                const minValueNode = document.querySelector(minValueLink);                
                minValueNode.value = minValueNode.getAttribute('min');
                const maxValueNode = document.querySelector(maxValueLink);
                maxValueNode.value = minValueNode.getAttribute('max');
                
            } 
            filterForm.submit();
        })
        
    })
}

const showMobFilter = document.querySelector('.show-mob-filter');
const filterClose = document.querySelector('.filter__close');
const parentSection = document.querySelector('.category-section');
    if ( showMobFilter ){
        showMobFilter.addEventListener('click', function(){
            filterWrap.classList.add('show');
            parentSection.style.zIndex = 900;
            
        });

        filterClose.addEventListener('click', function(){
            filterWrap.classList.remove('show');
            parentSection.style.zIndex = 1;
        })
    }
    
//КОНЕЦ: 14. Фильтрация


//Слайдер Рекоментуемое

let slider = new Swiper(".recommend-slider", {
    speed: 1000,
    /*autoplay: {
        delay: 6000,
    },*/
    slidesPerView: 1,
    spaceBetween: 50,
    loop: false,
    
    navigation: {
        nextEl: '.slider-nav.next',
        prevEl: '.slider-nav.prev',
    },
    breakpoints: {
        200: {
            slidesPerView: 2,
            spaceBetween: 0
        },

        680: {
            slidesPerView: 1,
            spaceBetween: 0
        },
        740: {
            slidesPerView: 2,
            spaceBetween: 0
        },

        992: {
            slidesPerView: 2,
            spaceBetween: 0
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 0
        },
        1600: {
            slidesPerView: 4,
            spaceBetween: 0
        },
        1800: {
            slidesPerView: 5,
            spaceBetween: 0
        }
    }
})

let hitsSlider = new Swiper(".slider-with-banner", {
    speed: 1000,
    /*autoplay: {
        delay: 6000,
    },*/
    slidesPerView: 1,
    spaceBetween: 50,
    loop: false,
    
    breakpoints: {
        
        200: {
            slidesPerView: 2,
            spaceBetween: 0
        },

        720: {
            slidesPerView: 3,
            spaceBetween: 0
        },

        1300: {
            slidesPerView: 4,
            spaceBetween: 0
        },
        1600: {
            slidesPerView: 5,
            spaceBetween: 0
        },


        1800: {
            slidesPerView: 6,
            spaceBetween: 0
        },
        2250: {
            slidesPerView: 7,
            spaceBetween: 0
        }
    }
})

let mainSliderCircles = document.querySelector('.main-slider-wrapper__circles');

let mainSlider = new Swiper(".main-slider", {
    speed: 1000,
    
    slidesPerView: 1,
    spaceBetween: 50,
    
    pagination: {
        el: '.main-slider__pagination',
        clickable: true,
    },
    
    
    
})
mainSlider.on('slideChange', function () {
    
    mainSliderCircles.classList.add('hide');
});
mainSlider.on('slideChangeTransitionEnd', function () {
    mainSliderCircles.classList.remove('hide');
})

let distSlider =  new Swiper(".distribution", {
    speed: 1000,
    
    slidesPerView: "auto",
    autoplay: {
        delay: 6000,
    },
    loop: true,
    navigation: {
        nextEl: '.dist-nav.next',
        prevEl: '.dist-nav.prev',
    },
    breakpoints: {
        200: {
            slidesPerView: "auto",
            spaceBetween: 12,
        },

        680: {
            slidesPerView: "auto",
            spaceBetween: 16
        },

        992: {
            slidesPerView: 4,
            spaceBetween: 24
        },

        1300: {
            slidesPerView: 5,
            spaceBetween: 24
        },
        1600: {
            slidesPerView: 8,
            spaceBetween: 24
        }
    }
    
})



const copyRequisites = document.querySelector('.copy-requisites');
if (copyRequisites){
    copyRequisites.addEventListener('click', function(){
        const reqList = document.querySelectorAll('.requisites-list__item');
        const copySuccess = document.querySelector('.copy-success');
        let text = '';
        if ( !copySuccess.classList.contains('show') ){
            reqList.forEach(item => {
                const title = item.querySelector('.requisites-list__title').innerHTML;
                const value = item.querySelector('.requisites-list__text').innerHTML;
    
                text = text + title +' : ' + value + ';' + '\r\n';
            })
    
            navigator.clipboard.writeText(text)
            .then(() => {
                copySuccess.classList.add('show');

                setTimeout(()=>{
                    copySuccess.classList.remove('show');
                }, 3000)
            })
        }
        
        
    
    })
}


const cProductQtyInputs = document.querySelectorAll('.c-product__qty');

if ( cProductQtyInputs.length ){
    cProductQtyInputs.forEach( inp => {
        inp.addEventListener('change', function(){
            let min = Number( this.getAttribute('data-min') );
            let value = Number( this.value );
            let parent = this.closest('.c-product__cart-buy-block');    
            if ( value < min){
                
                parent.classList.add('has-error');
            } else{
                parent.classList.remove('has-error');
            }
        })
        inp.addEventListener('input', function(){
            let min = Number( this.getAttribute('data-min') );
            let value = Number( this.value );
            let parent = this.closest('.c-product__cart-buy-block');    
            if ( value < min){
                
                parent.classList.add('has-error');
            } else{
                parent.classList.remove('has-error');
            }
        })
    } )
}


                


const authModalTabs = document.querySelectorAll('[data-family="auth-modal"]');
if ( authModalTabs.length ){
    authModalTabs.forEach( btn => {
        btn.addEventListener('click', function(){
            const event = new Event('resize');
            window.dispatchEvent(event);
        });
    })
}



const ordersList = document.querySelectorAll('.h-order');
if ( ordersList.length ){
    ordersList.forEach( order => {
        order.addEventListener('click', function(){

            if ( this.classList.contains('hover-active') ) return false


            if ( !this.classList.contains('active') ){
                this.classList.add('active')
            } else{
                this.classList.remove('active')
            }
        })
        order.addEventListener('mouseenter', function(){
            if ( this.classList.contains('active') ){
                this.classList.remove('active')
                
            } 
            this.classList.add('hover-active')
        })
        order.addEventListener('mouseleave', function(){
            this.classList.remove('hover-active')
        })
        //mouseover/mouseout
    }) 
}


const showBtnsPassword = document.querySelectorAll('.show-password-btn');

if ( showBtnsPassword.length ){
    showBtnsPassword.forEach( btn => {
        btn.addEventListener('click', function(){
            let parentWrap = this.closest('.password-wrap');
            let input = parentWrap.querySelector('input');
            if ( !this.classList.contains('active') ){
                this.classList.add('active');
                input.setAttribute('type', 'text');
            } else{
                this.classList.remove('active');
                input.setAttribute('type', 'password');
            }
        })
    } )


    let password = document.querySelector('#password');
    let retypePassword = document.querySelector('#retype-password');
    let savePassword = document.querySelector('#save-password')
    let  passwordMessageBox =  document.querySelector('.password-messages-box')


    password.addEventListener('input', function(){
        if (this.value.length > 0 && this.value === retypePassword.value ){
            savePassword.removeAttribute('disabled')
            passwordMessageBox.classList.add('success');
            retypePassword.classList.remove('error');
            passwordMessageBox.classList.remove('error');
        } else if (this.value.length === 0 || retypePassword.value.length === 0){
            savePassword.setAttribute('disabled', 'disabled');
            passwordMessageBox.classList.remove('error');
            passwordMessageBox.classList.remove('success');
            retypePassword.classList.remove('error');
        } else if (this.value.length > 0 && retypePassword.value.length > 0  && retypePassword.value !== this.value){
            savePassword.setAttribute('disabled', 'disabled');
            passwordMessageBox.classList.add('error');
            retypePassword.classList.add('error');
            passwordMessageBox.classList.remove('success');        
        }
    })
    retypePassword.addEventListener('input', function(){
        if (this.value.length > 0 && this.value === password.value ){
            savePassword.removeAttribute('disabled')
            passwordMessageBox.classList.add('success');
            passwordMessageBox.classList.remove('error');
            retypePassword.classList.remove('error');
        } else if (this.value.length === 0 || password.value.length === 0){
            savePassword.setAttribute('disabled', 'disabled');
            passwordMessageBox.classList.remove('error');
            passwordMessageBox.classList.remove('success');
            retypePassword.classList.remove('error');
        } else if (this.value.length > 0 && password.value.length > 0  && password.value !== this.value){
            savePassword.setAttribute('disabled', 'disabled');
            passwordMessageBox.classList.add('error');
            passwordMessageBox.classList.remove('success');   
            retypePassword.classList.add('error');     
        }
    })
}