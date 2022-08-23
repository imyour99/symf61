jQuery(document).ready(function () {
    
    if(jQuery('body.account').find('#payment-stripe-form').length > 0) {
        initOrderOverviewForStripe();
    }
    
});


initCheckoutOverviewForStripe = function() {
  
    var checkoutButton = "#checkOut-overview-button";
    
    if (jQuery(checkoutButton).data('stripe-key') && jQuery(checkoutButton).data('stripe-js')) {
        
        loadStripeScript(checkoutButton, 'stripe-js');
        
        jQuery(checkoutButton).unbind('click').bind('click', function(e) {     
        if (jQuery(this).hasClass('disabled') === false) {
                e.preventDefault();

                jQuery(checkoutButton).attr('disabled', true);
                jQuery(checkoutButton).empty().html('<div class="ajaxBox text-center"><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div></div>');
               
                initStripeCheckout(checkoutButton);
            }
        });
    
    }
    
};

initOrderOverviewForStripe = function() {
    
    var button = "#stripe-button";
    
    if (jQuery(button).data('stripe-key') && jQuery(button).data('stripe-js')) {
        
        loadStripeScript(button, 'stripe-js'); 

        jQuery(button).unbind('click').bind('click', function(e) {     
            
            e.preventDefault();

            jQuery(button).attr('disabled', "disabled");
            jQuery(button).empty().html('<div class="ajaxBox text-center"><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div></div>');

            initStripeOrder(button);

        });
    }
};

loadStripeScript = function(id, dataLabel) {    
    jQuery.getScript(jQuery(id).data(dataLabel));
};

initStripeCheckout = function(buttonId) {
    
    var data = {};
    data['checkout'] = {};
    data.checkout['confirm'] = 1;

    if (document.getElementById('checkout_message')) {
        data.checkout['message'] = document.getElementById("checkout_message").value;
    }
    
    if(jQuery('body.checkOut-overview').find('.form-member').length > 0) {
        data.checkout['member'] = {};
        jQuery('.form-member').each(function(i, obj) { 
            data.checkout['member'][i+1] = jQuery(this).val();
        });
    }

    if (document.getElementById('checkout_adviceUserId')) {
        data.checkout['adviceUserId'] = document.getElementById("checkout_adviceUserId").value;
    }
    
    jQuery.ajax({
        type: 'POST',
        url: jQuery("#checkOut-overview-form").attr('action'),
        data: data,
        success: function (responseData) {               
            if(responseData && typeof responseData === 'object') {      
                if(responseData.sessionId !== undefined && responseData.sessionId ) {        
                    redirectStripe(buttonId, responseData.sessionId);
                }
            }
        },
        error: function(responseData) { 
            console.log(responseData);
        }
    });
    
};

redirectStripe = function(id, sessionId) {
    
    var stripe = Stripe(jQuery(id).data('stripe-key'));
    
    stripe.redirectToCheckout({
        sessionId: sessionId
    }).then(function (result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        console.log(result);
    });
    
};


initStripeOrder = function(id) {
    
    var data = {};
    data['orderData'] = {};
    data.orderData['orderId'] = jQuery(id).data('order-id');
    
    jQuery.ajax({
        type: 'POST',
        url: jQuery("#payment-stripe-form").attr('action'),
        data: data,
        success: function (responseData) {               
             if(responseData && typeof responseData === 'object') {     
                 if(responseData.sessionId !== undefined && responseData.sessionId ) {        
                    redirectStripe(id, responseData.sessionId);
                }
             }
        },
        error: function(responseData) { 
            console.log(responseData);
        }
    });
    
};