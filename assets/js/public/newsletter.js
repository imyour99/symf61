jQuery(document).ready(function () {
    if (jQuery('body.newsletter').find('#newsletter-form').length > 0) {     
        initNewsletterValidator();
    }
});



initNewsletterValidator = function() {
    
    jQuery('#newsletter-form').validator({
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }
    });
        
};