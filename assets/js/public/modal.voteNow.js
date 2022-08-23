jQuery(document).ready(function () {
    
    if(jQuery('body.articleDetail').find('#voteNowModal').length > 0) {   
        initArticleRatingModal();    
    }
    
});

initArticleRatingModal = function() {
    
    jQuery('#voteNowModal').on('shown.bs.modal', function () {
       
       prepareModalRating();
       initModalRatingForm();
       
    });

};

prepareModalRating = function() {
    
    jQuery("#rating_star").starRating({
        readOnly: false,
        starSize: 66,
        totalStars: 5,
        useFullStars: false,
        forceRoundUp: false,
        starShape: 'straight',
        disableAfterRate: false,
        ratedColor: '#4bbee6',
        hoverColor: '#4bbee6',
        starGradient: {
            start: '#4bbee6',
            end: '#66c8ea'
        },callback: function(currentRating, $el){
            jQuery('#vote_stars').val(currentRating);
        }
    });
};

initModalRatingForm = function() {
    
    jQuery('#form-voteNowModal').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};