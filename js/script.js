/*
 * File    : script.js
 * Author  : HREE
 *
 * SUMMARY :
 * INIT
 * FUNCTIONS
 */



(function(){



/* **************************************** *
 * INIT
 * **************************************** */
motion();
share();
gallery();
clipboard();
bgm();
pin_motion();



/* **************************************** *
 * FUNCTIONS
 * **************************************** */
function motion(){

    // TEXT UP
    const motionUp = document.querySelectorAll('.motion-up');

    motionUp.forEach((item)=>{
        let start = item.getAttribute('data-motion-start');
        let delay = item.getAttribute('data-motion-delay');
        if( start == undefined ) { start = 'top 80%' };
        if( delay == undefined ) { delay = 0 };

        gsap.set(item, {y: 20, autoAlpha: 0});
        ScrollTrigger.create({
            trigger: item,
            start: start,
            //once: true,
            //markers: 1,
            onEnter: function(){
                gsap.to(item, {
                    y: 0, 
                    autoAlpha: 1, 
                    duration: 0.8,
                    rotation: 0,
                    ease: 'power1.out',
                    delay: delay
                });
            }
        });
    });

    // IMG SCALE
    gsap.to(".main-visual__img img", {
        scale: 2, // 확대 비율 (최대 크기)
        scrollTrigger: {
            trigger: ".main-intro",
            start: "top bottom",
            end: "bottom 20%",
            scrub: true,
        }
    });

    // LETTER SECTION
    // ScrollTrigger.create({
    //     trigger: '.main-letter',
    //     start: 'top 80%',
    //     //markers: 1,
    //     onEnter: function(){
    //         gsap.to('.main-letter__img--groom .main-letter__img-desc', {autoAlpha: 1, duration: 1})
    //         gsap.to('.main-letter__img--bride', {autoAlpha: 1, duration: 1, delay: 1})
    //         gsap.to('.main-letter__img--bride .main-letter__img-desc', {autoAlpha: 1, duration: 1, delay: 2})
    //     }
    // });

    
}



function share(){
    Kakao.init('276a8b83db146933e461c882d45fd7ce'); 
    document.querySelector('.share-btn').addEventListener('click',() => {
        Kakao.Link.sendCustom({
            templateId: 120426,
        });
    })
}



function gallery(){

    const lightbox = GLightbox({
        selector: '.main-gallery__item',
        touchNavigation: true,
        loop: true,
        zoomable: true,
    });
    
}



function clipboard(){

    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const container = document.querySelector('.main-account .wrap');
            const textToCopy = button.getAttribute('data-copy');
          
            navigator.clipboard.writeText(textToCopy)

            // 기존 메시지 제거
            const oldMsg = container.querySelector('.copy-message');
            if (oldMsg) oldMsg.remove();

            // 새 메시지 생성
            const msg = document.createElement('p');
            msg.textContent = '계좌번호가 복사되었습니다';
            msg.classList.add('copy-message');
            container.appendChild(msg);

            setTimeout(() => {
                msg.classList.add('hide');
                setTimeout(() => msg.remove(), 500);
            }, 1000);
        });
    });
     
}


function bgm(){
    const bgm = document.getElementById('bgm');
    const toggleBtn = document.querySelector('.main-visual__bgm-toggle');
    let isPlaying = false;

    toggleBtn.addEventListener('click', () => {
        if (isPlaying) {
          bgm.pause();
          toggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
          bgm.play();
          toggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        isPlaying = !isPlaying;
    });
      
}



function pin_motion(){

    const imgItems = document.querySelectorAll('.main-intro__pin-img-item');
    const txtItems = document.querySelectorAll('.main-intro__pin-txt-item');
    const totalSteps = imgItems.length - 1;  // 전환 횟수

    // pin 고정
    ScrollTrigger.create({
        trigger: '.main-intro__pin',
        start: 'top top',
        end: `+=${totalSteps * 100}%`, // 각 아이템 당 100% 스크롤
        pin: true,
        scrub: true,
        anticipatePin: 1,
        //markers: 1,
    });

    // 이미지 전환 타임라인
    const imgTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.main-intro__pin',
        start: 'top top',
        end: `+=${totalSteps * 100}%`,
        scrub: true,
    }
    });

    imgItems.forEach((item, index) => {
    if (index === 0) return; // 첫 번째는 기본 노출

    imgTl
        .to(imgItems[index - 1], { opacity: 0, duration: 1 }, index)
        .fromTo(item, { opacity: 0 }, { opacity: 1, duration: 1 }, index);
    });

    // 텍스트 전환 타임라인
    const txtTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.main-intro__pin',
        start: 'top top',
        end: `+=${totalSteps * 100}%`,
        scrub: true,
    }
    });

    txtItems.forEach((item, index) => {
    //if (index === 0) return;

    txtTl
        .to(txtItems[index - 1], { opacity: 0, duration: 1 }, index)
        .fromTo(item, { opacity: 0 }, { opacity: 1, duration: 1 }, index);
    });

}



})();