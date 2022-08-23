
var multipleShow = 3;
var scrollPosition = 0;
var multipleWidth = 0;
var itemWidth = 0;
var itemClick = 0;

initArticleResizeCarouselList = function(id) {
    
    var carouselWidth = parseInt(jQuery(id).outerWidth());
    var oldItemWidth = itemWidth;
    var lg = false;
    var md = false;
    var sm = false;
    
    //console.log(carouselWidth);
    
    if(carouselWidth > 992) {
        lg = true;
    } else if(carouselWidth > 768) {
        md = true;
    } else {
        sm = true;
    }
    
    if(lg == true) {
        multipleShow = 3;
    } else if(md == true) {
        multipleShow = 2;
    } else {
        multipleShow = 1;
    }
    
    /*
    var lg = window.matchMedia("(min-width: 992px)").matches;
    var md = window.matchMedia("(min-width: 768px)").matches;
    var sm = window.matchMedia("(min-width: 576px)").matches;
    var oldItemWidth = itemWidth;
    
    multipleShow = 3;
    if(lg == false && md == true) {
        multipleShow = 2;
    } else if(
        (md == false && sm == true) || 
        (lg == false && md == false && sm == false)
    ) {
        multipleShow = 1;
    }
    */
    
    multipleWidth = parseInt(jQuery(id + " .carousel-inner")[0].scrollWidth);
    itemWidth = parseInt(jQuery(id + " .carousel-item").width());
    
    //console.log('resize:' + lg + ' ' + md + ' ' + sm + ' ' + multipleShow + ' ' + multipleWidth + ' ' + itemWidth);
    
    if(oldItemWidth !== itemWidth) {
        reScrollCarouselPosition(id);
    }
    
};

initArticleCarouselList = function(id) {
    initArticleResizeCarouselList(id);
    eventArticleCarouselList(id);
};

eventArticleCarouselList = function(id) {
    
    jQuery(id + " .carousel-control-next").unbind('click').bind('click', function(event) {            
        event.preventDefault();
        scrollArticleCarousel(id, 'next');
    });
    
    jQuery(id + " .carousel-control-prev").unbind('click').bind('click', function(event) {      
        event.preventDefault();
        scrollArticleCarousel(id, 'prev');
    });

};

scrollArticleCarousel = function(id, direction) {
    
    var oldScrollPosition = scrollPosition;
    
    switch(direction) {
        case 'next':    if (scrollPosition < (multipleWidth - (itemWidth * multipleShow))) {
                            itemClick++;        
                        } else {
                            itemClick = 0;
                        }
                        break;
        
        case 'prev':    
                        itemClick--;
                        if(itemClick < 0) {
                            itemClick = jQuery(id + " .carousel-item" ).length -1;
                        }
                        break;
    }
    
    scrollPosition = itemWidth * itemClick;
    
    if(oldScrollPosition !== scrollPosition) {

        //console.log('scroll:' + scrollPosition + ' = itemClick:' + itemClick + ' * itemWidth:' + itemWidth);               
        jQuery(id + " .carousel-inner").animate({ scrollLeft: scrollPosition },600);
        
    }
};

reScrollCarouselPosition = function(id) {
    
    var oldScrollPosition = scrollPosition;
    scrollPosition = itemWidth * itemClick;
    
    if(oldScrollPosition !== scrollPosition) {
        if(scrollPosition <= 0) {
            scrollPosition = 0;
            itemClick = 0;
        }
        
        //console.log('rescroll oldScrollPosition:' + oldScrollPosition + ' != scrollPosition:' + scrollPosition);
        jQuery(id + " .carousel-inner").stop();
        jQuery(id + " .carousel-inner").animate({ scrollLeft: scrollPosition },200);
    }
    
};