jQuery(document).ready(function () {
    
    if(jQuery('body.checkOut-root').find('#checkOut-discount-form').length > 0) {
        initCheckoutDiscountForm();
    }
    
});

initCheckoutDiscountForm = function() {
    
    jQuery('#checkOut-discount-form').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};
