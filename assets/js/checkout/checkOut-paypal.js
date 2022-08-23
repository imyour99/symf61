initCheckoutOverviewForPayPal = function() {

};

initEnablePayPalCheckout = function() {
    if(jQuery('body.checkOut-overview').find('#paypal-button').length > 0) {
        enablePayPalCheckout();
    }
};

initDisablePayPalCheckout = function() {   
    if(jQuery('body.checkOut-overview').find('#paypal-button').length > 0) {
        disablePayPalCheckout();
    }
};


enablePayPalCheckout = function() {
    jQuery('#shop-button').hide();
    jQuery('#paypal-button').show();
};

disablePayPalCheckout = function() {
    jQuery('#shop-button').show();
    jQuery('#paypal-button').hide();
};
