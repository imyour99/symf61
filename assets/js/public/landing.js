jQuery(document).ready(function () {
    
    if(jQuery('body.landing').find('.multipleList').length > 0) {  
        initArticleCarouselList('#articleFavourites');
    }
    
    if(jQuery('body.landing').find('.landing-rating').length > 0) {
        initVotesRating();
    }
    
    if(jQuery('body.landing').find('#landing-newsletter-form').length > 0) {
        initDasboardNewsletterValidator();
    }
    
});

initVotesRating = function() {
    
    jQuery(".landing-rating").starRating({
        readOnly: true,
        starSize: 30,
        totalStars: 5,
        useFullStars: false,
        forceRoundUp: false,
        starGradient: {
            start: '#4bbee6',
            end: '#66c8ea'
        }
    });
    
};

initDasboardNewsletterValidator = function() {

    jQuery('#landing-newsletter-form').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};