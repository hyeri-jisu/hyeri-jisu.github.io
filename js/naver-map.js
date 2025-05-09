const mapNaver = document.querySelector('.main-location__map');

if( mapNaver != null ){

    const container = mapNaver,
          lat       = mapNaver.getAttribute('data-lat'),
          lng       = mapNaver.getAttribute('data-lng'),
          zoom      = parseInt(mapNaver.getAttribute('data-zoom')),
          desktop   = ( !document.querySelector('html').classList.contains('mobile') ) ? true : false;

    const mapPosition = new naver.maps.LatLng(lat, lng);
    
    // Init
    const map = new naver.maps.Map(container, {
        center          : mapPosition,   // 지도 중심점의 좌표
        zoom            : zoom,          // 지도의 축척 레벨
        zoomControl     : desktop,       // 줌 컨트롤의 표시 여부
        scrollWheel     : false, 	     // 마우스 휠 동작으로 지도를 확대/축소할지 여부
        draggable    	: desktop        // 마우스로 끌어서 지도를 이동할지 여부
    });

    // Marker
    const markerSrc = mapNaver.getAttribute('data-marker-mo');
    const markerPosition = new naver.maps.LatLng(lat, lng);

    let marker;

    if( markerSrc != null ) {

        marker = new naver.maps.Marker({
            position: markerPosition, 
            map: map,
            icon: {
                url: markerSrc
            }
        });

    } else {

        marker = new naver.maps.Marker({
            position : markerPosition,
            map      : map
        });
        
    }

}