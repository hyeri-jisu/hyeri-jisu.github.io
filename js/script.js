var JT = JT || {};

// calendar
new AirDatepicker('.calendar', {
    inline : true,
    locale : {
        days :  ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'] ,
        daysMin: ['일', '월', '화', '수', '목', '금', '토'],
        months: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
        monthsShort: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
        clear: '취소',
        dateFormat: 'yyyy-MM-dd',
    },
    onRenderCell({date, cellType}) {
        let dates = [1, 5, 10, 15, 25, 30],
            emoji = ['💕', '💍', '💒', '👰', '🤵'],
            isDay = cellType === 'day',
            _date = date.getDate(),
            shouldChangeContent = isDay && dates.includes(_date),
            randomEmoji = emoji[Math.floor(Math.random() * emoji.length)];
    
        return {
            html: shouldChangeContent ? randomEmoji : undefined,
            classes: shouldChangeContent ? '-emoji-cell-' : undefined,
            attrs: {
                title: shouldChangeContent ? randomEmoji : ''
            }
        }
    },
    firstDay: 0,
    navTitles :  { 
        days : '<span>yyyy</span>년&nbsp;<span>MM</span>월',
        months: '<span>yyyy</span>년',
        years: '<span>yyyy1</span>년&nbsp;-&nbsp;<span>yyyy2</span>년'
    },
    prevHtml : '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M10 13L5 7.93671L10 3"></path></svg>',
    nextHtml : '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M6 13L11 7.93671L6 3"></path></svg>',
    //buttons : [cancelButton, inquiryButton],
    selectedDates : '2025-07-20',
    selectOtherMonths : false,
    toggleSelected : false,
})




// gallery
const galleryItem = document.querySelectorAll('.gallery-item');

galleryItem.forEach((item, index) => {

    ScrollTrigger.create({
        trigger: item,
        start: 'top 40%',
        end: 'bottom 40%',
        //markers: 1,
        onEnter: () => {
            if( (index+1) % 2 === 0 ){
                gsap.to(item, {rotation: -5})
            } else {
                gsap.to(item, {rotation: 5})
            }
        },
        onLeave: () => {
            gsap.to(item, {rotation: 0})
        },
        onLeaveBack: () => {
            if( (index+1) % 2 === 0 ){
                gsap.to(item, {rotation: -5})
            } else {
                gsap.to(item, {rotation: 5})
            }
        },
    });
});

JT.slide = {
        
    up: function( selector, duration=500, callback=undefined ) {

        selector.style.transitionProperty = 'height, margin, padding';
        selector.style.transitionDuration = duration + 'ms';
        selector.style.boxSizing          = 'border-box';
        selector.style.height             = selector.offsetHeight + 'px';
        selector.offsetHeight;
        selector.style.overflow           = 'hidden';
        selector.style.height             = 0;
        selector.style.paddingTop         = 0;
        selector.style.paddingBottom      = 0;
        selector.style.marginTop          = 0;
        selector.style.marginBottom       = 0;

        window.setTimeout( () => {
            selector.style.display = 'none';
            selector.style.removeProperty('height');
            selector.style.removeProperty('padding-top');
            selector.style.removeProperty('padding-bottom');
            selector.style.removeProperty('margin-top');
            selector.style.removeProperty('margin-bottom');
            selector.style.removeProperty('overflow');
            selector.style.removeProperty('transition-duration');
            selector.style.removeProperty('transition-property');

            if( typeof callback === 'function' ) {
                callback();
            }
        }, duration);

    },

    down: function( selector, duration=500, callback=undefined ) {

        selector.style.removeProperty('display');
        let display = window.getComputedStyle(selector).display;
        if ( display === 'none' ) display = 'block';
        selector.style.display = display;
        
        const height = selector.offsetHeight;

        selector.style.overflow           = 'hidden';
        selector.style.height             = 0;
        selector.style.paddingTop         = 0;
        selector.style.paddingBottom      = 0;
        selector.style.marginTop          = 0;
        selector.style.marginBottom       = 0;
        selector.offsetHeight;
        selector.style.boxSizing          = 'border-box';
        selector.style.transitionProperty = 'height, margin, padding';
        selector.style.transitionDuration = duration + 'ms';
        selector.style.height             = height + 'px';
        selector.style.removeProperty('padding-top');
        selector.style.removeProperty('padding-bottom');
        selector.style.removeProperty('margin-top');
        selector.style.removeProperty('margin-bottom');

        window.setTimeout( () => {
            selector.style.removeProperty('height');
            selector.style.removeProperty('overflow');
            selector.style.removeProperty('transition-duration');
            selector.style.removeProperty('transition-property');

            if( typeof callback === 'function' ) {
                callback();
            }
        }, duration);

    },

    toggle: function( selector, duration=500, callback=undefined ) {
        
        if ( window.getComputedStyle(selector).display === 'none' ) {
            this.down(selector, duration, callback);
        } else {
            this.up(selector, duration, callback);
        }

    }

}

const container = document.querySelector('.jt-accordion');

	// Toggle the accordion
	// Delegate click event to keep alive after adding content via ajax
    container.addEventListener('click', function(e){

        if( !!e.target.closest('.jt-accordion__head') ) {

            const item = e.target.closest('.jt-accordion__item');

            if( item.classList.contains('jt-accordion--loading') ) return;
            item.classList.add('jt-accordion--loading');

            item.classList.toggle('jt-accordion--active');
            JT.slide.toggle( item.querySelector('.jt-accordion__content-inner'), 500, function(){
                item.classList.remove('jt-accordion--loading');
            });

        }

        return false;

    });