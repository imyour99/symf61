jQuery(document).ready(function () {
    
    if(jQuery('body.checkOut-start').find('#checkOut-signIn-form').length > 0) {
        initCheckoutSignInValidator();
    }
    
});


initCheckoutSignInValidator = function() {
    
    jQuery('#checkOut-signIn-form').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};