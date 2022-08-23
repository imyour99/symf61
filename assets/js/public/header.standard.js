jQuery(document).ready(function () {
    
    if(jQuery('header.standard').length > 0) {     
        initShowModalIsWrongShippingCountry();
    }
    
});

initShowModalIsWrongShippingCountry = function() {
    
    var showModalDelivery = jQuery("#head").attr('data-showmodaliswrongshippingcountry');
    
    if(showModalDelivery == 'showIt') {
        jQuery('#modalDeliveryAimIp').modal('show');         
        openWrongShippingCountryBody('#modalDeliveryAimIp');
    }
    
};


openWrongShippingCountryBody = function(id) {
    
    jQuery.ajax({
        type: 'POST',
        url: jQuery(id).data("url"),
        success: function (response) {               
            if(typeof response === 'object') {            
                if (response.template !== undefined) {
                    jQuery('#modalDeliveryAimIp-body').empty().html(response.template);
                }                
            }
        }
    });
};