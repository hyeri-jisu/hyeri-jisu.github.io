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
share();
gallery();
calendar();
clipboard();



/* **************************************** *
 * FUNCTIONS
 * **************************************** */
function share(){
    Kakao.init('276a8b83db146933e461c882d45fd7ce'); 
    document.querySelector('.share-btn').addEventListener('click',() => {
        Kakao.Link.sendCustom({
            templateId: 120426,
        });
    })
}



function gallery(){

    lightGallery(document.querySelector('.main-gallery'), {
        animateThumb: false,
        zoomFromOrigin: false,
        allowMediaOverlap: true,
        toggleThumb: true,
        download: false
    });
    
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
        firstDay: 0,
        navTitles :  { 
            days : '<span>yyyy</span>년&nbsp;<span>MM</span>월',
            months: '<span>yyyy</span>년',
            years: '<span>yyyy1</span>년&nbsp;-&nbsp;<span>yyyy2</span>년'
        },
        prevHtml : '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M10 13L5 7.93671L10 3"></path></svg>',
        nextHtml : '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M6 13L11 7.93671L6 3"></path></svg>',
        selectedDates : '2025-07-20',
        selectOtherMonths : false,
        toggleSelected : false,
    })

}



function clipboard(){

    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function () {
          const container = this.closest('.main-account__item-list li');
          const span = container.querySelector('span');
          const textToCopy = span.textContent;
    
          navigator.clipboard.writeText(textToCopy)
        });
    });
     
}


})();