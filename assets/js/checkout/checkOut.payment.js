jQuery(document).ready(function () {
    
    if(jQuery('body.checkOut-payment').find('#checkOut-payment-form').length > 0) {
        initCheckoutPayment();
    }
    
});

initCheckoutPayment = function() {
    
    initCheckOutPaymentValidation();
    initCheckoutPaymentTooltip();
    initCheckoutPaymentEvent();
    initCheckoutPaymentTrigger();
    
};

initCheckOutPaymentValidation = function() {
    
    jQuery('#checkOut-payment-form').validator({
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};

initCheckoutPaymentTooltip = function() {
    
    var options = {};
    options['trigger'] = 'click';
    options['html'] = true;
    
    jQuery('.btn-tooltip').tooltip(options);
    
};

initCheckoutPaymentEvent = function() {
  
    jQuery("input[type=radio][name='payment[paymentId]']").unbind('change').bind('change', function(e) {  
        
        var data = {};
        data['paymentId']  = jQuery("input[name='payment[paymentId]']:checked").val(); 
    
        jQuery.ajax({
            type: 'POST',
            url: jQuery("#checkOut-payment-form" ).data("ajaxurl"),
            data: data,
            beforeSend: function() { // Start loading                              
               jQuery("#checkOut-payment-button").attr('disabled', true);
               jQuery("#checkOut-basket-calculation").empty().append('<div class="ajaxBox"><div class="spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div></div>'); 
            }, 
            success: function (response) {                  
                if(response && typeof response === 'object') {            
                    if(response.html !== undefined && response.html ) {     
                        jQuery("#checkOut-basket-calculation" ).empty().append(response.html);   
                        jQuery("#checkOut-payment-button").attr('disabled', false);
                        initCheckOutPaymentValidation();
                    }
                }             
            }
        });
        
    });
     
};

initCheckoutPaymentTrigger = function() {
    
    if(jQuery("input[type=radio][name='payment[paymentId]']").length == 1) {
        if(jQuery('body.checkOut-payment').find('#payment_11').length > 0) {
            jQuery("#payment_11").prop("checked", true).trigger( "change" );
        }
        
    }
        
};