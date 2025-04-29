
(function(){



/* **************************************** *
* INIT
* **************************************** */
main_visual_motion();
appear_motion();
pin_motion();
bg_change();
marqee();
gallery();
calendar();



/* **************************************** *
* FUNCTION
* **************************************** */
function main_visual_motion(){
    // bg
    gsap.to(".main-visual__bg", {
        scale: 1.5, // 확대 비율 (최대 크기)
        scrollTrigger: {
            trigger: ".section-intro",
            start: "top bottom",
            end: "bottom 20%",
            scrub: true,
        }
    });

    // title
    gsap.to(".main-visual__title", {
        fontSize: '32px',
        top: '10%',
        scrollTrigger: {
            trigger: ".section-intro",
            start: "top bottom",
            end: "top 60%",
            scrub: true, 
        }
    });

    // img
    gsap.to(".main-visual__img", {
        yPercent: -200, 
        scrollTrigger: {
            trigger: ".section-intro", 
            start: "top bottom", 
            end: "bottom top",
            scrub: true,
        }
    });
}



function appear_motion(){
    const targets = document.querySelectorAll('.appear-motion')

    gsap.set(targets, {opacity: 0})
    targets.forEach((target) => {
        if (target.closest('.section-intro__three')) return;

        ScrollTrigger.create({
            trigger: target,
            start: 'top 80%',
            onEnter: function(){
                gsap.to(target, {
                    opacity: 1,  
                    ease: 'power1.inOut', 
                });
            }
        });
    })
}


function pin_motion(){

    const imgItems = document.querySelectorAll('.section-intro__img-item');
    const txtItems = document.querySelectorAll('.section-intro__txt-item');
    const totalSteps = imgItems.length - 1;  // 전환 횟수

    // pin 고정
    ScrollTrigger.create({
        trigger: '.section-intro__second',
        start: 'top top',
        //end: `+=${totalSteps * 100}%`, // 각 아이템 당 100% 스크롤
        pin: true,
        scrub: true,
        anticipatePin: 1,
    });

    // 이미지 전환 타임라인
    const imgTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.section-intro__second',
        start: 'top top',
        //end: `+=${totalSteps * 100}%`,
        scrub: true,
    }
    });

    imgItems.forEach((item, index) => {
    if (index === 0) return; // 첫 번째는 기본 노출

    imgTl
        .to(imgItems[index - 1], { opacity: 0, duration: 0.5 }, index)
        .fromTo(item, { opacity: 0 }, { opacity: 1, duration: 0.5 }, index);
    });

    // 텍스트 전환 타임라인
    const txtTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.section-intro__second',
        start: 'top top',
        //end: `+=${totalSteps * 100}%`,
        scrub: true,
    }
    });

    txtItems.forEach((item, index) => {
    if (index === 0) return;

    txtTl
        .to(txtItems[index - 1], { opacity: 0, duration: 0.5 }, index)
        .fromTo(item, { opacity: 0 }, { opacity: 1, duration: 0.5 }, index);
    });



}



function bg_change(){
    const text = document.querySelectorAll('.section-intro__three .appear-motion');

    // 생성된 트리거를 배열로 저장
    const textTriggers = [];

    gsap.set(text, { opacity: 0 });

    text.forEach((item) => {
        const trigger = ScrollTrigger.create({
            trigger: item,
            start: 'top 80%',
            //markers: true,
            onEnter: function(){
                gsap.to(item, {
                    opacity: 1,  
                    ease: 'power1.inOut', 
                });
            }
        });

        textTriggers.push(trigger);
    });


    ScrollTrigger.create({
        trigger: '.section-intro__three',
        start: 'top 50%',
        end: 'bottom 50%',
        //markers: 1,
        onEnter: function(){
                // 나중에 특정 트리거들만 새로고침
            textTriggers.forEach(trigger => trigger.refresh());

            gsap.to('.section-intro', {
                background: '#fff',
                ease: 'power1.inOut', 
            });

            document.querySelector('.layer-01').classList.add('fixed')
            document.querySelector('.layer-02').classList.add('fixed')
        },
        onLeave: function(){
            document.querySelector('.layer-01').classList.remove('fixed')
            document.querySelector('.layer-02').classList.remove('fixed')
        },
        onLeaveBack: function(){
            gsap.to('.section-intro', {
                background: '#000',
                ease: 'power1.inOut', 
            });
            document.querySelector('.layer-01').classList.add('fixed')
            document.querySelector('.layer-02').classList.add('fixed')
        },
        onEnterBack: function(){
            document.querySelector('.layer-01').classList.add('fixed')
            document.querySelector('.layer-02').classList.add('fixed')
        }
    });

    ScrollTrigger.create({
        trigger: '.section-location',
        start: 'top 40%',
        //markers: 1,
        onEnter: function(){
            gsap.to('.section-date__bg', {
                opacity: 0,  
                ease: 'power1.inOut', 
            });
        },
        onLeaveBack: function(){
            gsap.to('.section-date__bg', {
                opacity: 1,
                ease: 'power1.inOut', 
            });
        }
    });


}


function marqee(){
    gsap.to(".section-marquee__left", {
        x: 300, 
        ease: "none",
        scrollTrigger: {
            trigger: ".section-marquee",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        },
    });

    gsap.to(".section-marquee__right", {
        x: -300,
        ease: "none",
        scrollTrigger: {
            trigger: ".section-marquee",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        },
    });

    ScrollTrigger.create({
        trigger: '.section-marquee',
        start: 'top 20%',
        //markers: 1,
        onEnter: function(){
            gsap.to('.layer-02', {
                background: '#000',
                ease: 'power1.inOut', 
            });
            gsap.to('.section-marquee__item', {
                color: '#8d9366',
                ease: 'power1.inOut', 
            });
        },
        onLeaveBack: function(){
            gsap.to('.layer-02', {
                background: '#fff',
                ease: 'power1.inOut', 
            });
            gsap.to('.section-marquee__item', {
                color: '#000',
                ease: 'power1.inOut', 
            });
        },
    });

}


function gallery(){

    // gsap.utils.toArray(".panel").forEach((panel, i) => {
    //     gsap.from(panel, {
    //       opacity: 1,
    //       scale: 1.1,
    //       y: 0,
    //       duration: 1,
    //       scrollTrigger: {
    //         trigger: panel,
    //         start: "top 80%",
    //         end: "bottom 60%",
    //         toggleActions: "play none none reverse",
    //         markers: 1 // 디버깅용 마커
    //       }
    //     });
    //   });

    const gallery = document.querySelectorAll('.section-gallery .box')

    gallery.forEach((item)=>{
        const img = item.querySelector('img')
        gsap.set(item, { scale: 0.6 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                //markers: true
            }
        });

        tl
        .to(item, { scale: 1, duration: 1, ease: 'power1.out' })
        .to(img, { scale: 1.15, y:-50, duration: 1, ease: 'power1.out' })
        .to(item, { scale: 0.6, duration: 0.6, ease: 'circ.in' });

    })

}



function calendar(){

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

}

        
})();    




// var JT = JT || {};
// JT.slide = {
        
//     up: function( selector, duration=500, callback=undefined ) {

//         selector.style.transitionProperty = 'height, margin, padding';
//         selector.style.transitionDuration = duration + 'ms';
//         selector.style.boxSizing          = 'border-box';
//         selector.style.height             = selector.offsetHeight + 'px';
//         selector.offsetHeight;
//         selector.style.overflow           = 'hidden';
//         selector.style.height             = 0;
//         selector.style.paddingTop         = 0;
//         selector.style.paddingBottom      = 0;
//         selector.style.marginTop          = 0;
//         selector.style.marginBottom       = 0;

//         window.setTimeout( () => {
//             selector.style.display = 'none';
//             selector.style.removeProperty('height');
//             selector.style.removeProperty('padding-top');
//             selector.style.removeProperty('padding-bottom');
//             selector.style.removeProperty('margin-top');
//             selector.style.removeProperty('margin-bottom');
//             selector.style.removeProperty('overflow');
//             selector.style.removeProperty('transition-duration');
//             selector.style.removeProperty('transition-property');

//             if( typeof callback === 'function' ) {
//                 callback();
//             }
//         }, duration);

//     },

//     down: function( selector, duration=500, callback=undefined ) {

//         selector.style.removeProperty('display');
//         let display = window.getComputedStyle(selector).display;
//         if ( display === 'none' ) display = 'block';
//         selector.style.display = display;
        
//         const height = selector.offsetHeight;

//         selector.style.overflow           = 'hidden';
//         selector.style.height             = 0;
//         selector.style.paddingTop         = 0;
//         selector.style.paddingBottom      = 0;
//         selector.style.marginTop          = 0;
//         selector.style.marginBottom       = 0;
//         selector.offsetHeight;
//         selector.style.boxSizing          = 'border-box';
//         selector.style.transitionProperty = 'height, margin, padding';
//         selector.style.transitionDuration = duration + 'ms';
//         selector.style.height             = height + 'px';
//         selector.style.removeProperty('padding-top');
//         selector.style.removeProperty('padding-bottom');
//         selector.style.removeProperty('margin-top');
//         selector.style.removeProperty('margin-bottom');

//         window.setTimeout( () => {
//             selector.style.removeProperty('height');
//             selector.style.removeProperty('overflow');
//             selector.style.removeProperty('transition-duration');
//             selector.style.removeProperty('transition-property');

//             if( typeof callback === 'function' ) {
//                 callback();
//             }
//         }, duration);

//     },

//     toggle: function( selector, duration=500, callback=undefined ) {
        
//         if ( window.getComputedStyle(selector).display === 'none' ) {
//             this.down(selector, duration, callback);
//         } else {
//             this.up(selector, duration, callback);
//         }

//     }

// }

// // accordion
// const container = document.querySelector('.jt-accordion');

// 	// Toggle the accordion
// 	// Delegate click event to keep alive after adding content via ajax
//     container.addEventListener('click', function(e){

//         if( !!e.target.closest('.jt-accordion__head') ) {

//             const item = e.target.closest('.jt-accordion__item');

//             if( item.classList.contains('jt-accordion--loading') ) return;
//             item.classList.add('jt-accordion--loading');

//             item.classList.toggle('jt-accordion--active');
//             JT.slide.toggle( item.querySelector('.jt-accordion__content-inner'), 500, function(){
//                 item.classList.remove('jt-accordion--loading');
//             });

//         }

//         return false;

//     });