jQuery(document).ready(function () {
    
    jQuery(window).resize(function() {
        initResizing();
    });
    
});

initResizing = function() {
    
    initFooterNavigation();
    
    if(jQuery('body.landing').find('.multipleList').length > 0) {   
        initArticleResizeCarouselList('#articleFavourites');
    }
    if(jQuery('body.articleDetail').find('#articleRecommend').length > 0) {   
        initArticleResizeCarouselList('#articleRecommend');
    }
    if(jQuery('body.articleDetail').find('#articleTopseller').length > 0) {   
        initArticleResizeCarouselList('#articleTopseller');
    }
};