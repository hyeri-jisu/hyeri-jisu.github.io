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
//pin_motion();



/* **************************************** *
 * FUNCTIONS
 * **************************************** */
function motion(){

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

    // TEXT SPLIT
    const motionSplitTriggers = [];
    const motionSplit = document.querySelectorAll('.motion-split');

    motionSplit.forEach((item) => {
        gsap.set(item, { autoAlpha: 0 });

        const trigger = ScrollTrigger.create({
            trigger: item,
            start: 'top 80%',
            once: true,
            //markers: 1,
            onEnter: function(){
                let split = SplitText.create(item, { type: "words", aria: "hidden" });
                gsap.to(item, { autoAlpha: 1 });
                gsap.from(split.words, {
                    opacity: 0,
                    duration: 1,
                    ease: "sine.out",
                    stagger: 0.1,
                });
            },
        });

        motionSplitTriggers.push(trigger);
    });

    function refreshMotionSplitTriggers() {
        motionSplitTriggers.forEach(trigger => trigger.refresh());
    }
    

    // TEXT UP
    const motionUpTriggers = [];
    const motionUp = document.querySelectorAll('.motion-up');

    motionUp.forEach((item) => {
        let start = item.getAttribute('data-motion-start') || 'top 80%';
        let delay = item.getAttribute('data-motion-delay') || 0;

        gsap.set(item, { y: 20, autoAlpha: 0 });

        const trigger = ScrollTrigger.create({
            trigger: item,
            start: start,
            once: true,
            // markers: true,
            onEnter: function () {
                gsap.to(item, {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    rotation: 0,
                    ease: 'power1.out',
                    delay: delay,
                });
            },
        });

        motionUpTriggers.push(trigger);
    });

    function refreshMotionUpTriggers() {
        motionUpTriggers.forEach(trigger => trigger.refresh());
    }

    // PIN
    const imgItems = document.querySelectorAll('.main-intro__pin-img-item');
    const txtItems = document.querySelectorAll('.main-intro__pin-txt-item');
    const totalSteps = imgItems.length - 1;

    // pin
    ScrollTrigger.create({
        trigger: '.main-intro__pin',
        start: 'top top',
        end: `+=${totalSteps * 100}%`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        //markers: 1,
        onEnter: () => {
            setTimeout(() => {
                refreshMotionUpTriggers();
                refreshMotionSplitTriggers();
            }, 200);
        }
    });

    // pin img
    const imgTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.main-intro__pin',
            start: 'top top',
            end: `+=${totalSteps * 100}%`,
            scrub: true,
        }
    });

    imgItems.forEach((item, index) => {
        if (index === 0) return;
        imgTl.to(imgItems[index - 1], { opacity: 0, duration: 1 }, index);
        imgTl.fromTo(item, { opacity: 0 }, { opacity: 1, duration: 1 }, index);
    });

    // pin txt
    const txtTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.main-intro__pin',
            start: 'top top',
            end: `+=${totalSteps * 100}%`,
            scrub: true,
        }
    });

    txtItems.forEach((item, index) => {
        txtTl.to(txtItems[index - 1], { opacity: 0, duration: 1 }, index);
        txtTl.fromTo(item, { opacity: 0 }, { opacity: 1, duration: 1 }, index);
    });
    
}



function share(){
    Kakao.init('276a8b83db146933e461c882d45fd7ce'); 
    document.querySelector('.main-account__share-btn').addEventListener('click',() => {
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
            const container = document.querySelector('.main-account');
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
    const bgm = document.querySelector('.main-visual__bgm-audio');
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
        onEnter: () => {
            ScrollTrigger.refresh();
            console.log('onEnter')
        },
        onLeave: () => {
            console.log('onLeave')
        }
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