jQuery(document).ready(function () {
    
    if(jQuery('body.checkOut-address').find('#checkOut-address-form').length > 0) {
        initCheckoutAddress();
    }
    
});

var checkoutAddressValidator = null;

initCheckoutAddress = function() {
    
    prepareCheckoutAddressForm(false);
    initCheckoutAddressForm();  
    initCheckoutAddressEvent();
    iniCheckoutDateOfBirthDatePicker();
    
};


prepareCheckoutAddressForm = function(destroyIt) {
    
    if(jQuery('#user_userPerson_sex').val() == 'c') {
        jQuery("#form-group-userPerson-uStIdNr").show();
        jQuery("#form-group-userPerson-firm").show();

        jQuery('#user_userPerson_firm').prop('required',true);

    } else {
        jQuery("#form-group-userPerson-uStIdNr").hide();
        jQuery("#form-group-userPerson-firm").hide();

        jQuery('#user_userPerson_firm').prop('required',false);
        
    }
    
    /*
    if(jQuery('#checkOut_isDelivery').is(':checked') == true) {      
        
        showCheckoutDelivery();
        
        var deliveryCounter = parseInt(jQuery('#checkOut-delivery-selection input[type=radio]').length);

        if(deliveryCounter <= 1) {
            
            hideCheckoutDeliverySelection();
            showCheckoutDeliveryAddress();
            enableDeliveryAddress();
            
        } else {
            
            showCheckoutDeliverySelection();
            var selectedId = jQuery("input[name='user[delivery][selectId]']:checked").val(); 

            if(selectedId !== undefined && selectedId == '-1') {
                showCheckoutDeliveryAddress();
                enableDeliveryAddress();
            } else {
                hideCheckoutDeliveryAddress();
                disableDeliveryAddress();
            }
            
        }
    } else {
        hideCheckoutDelivery();
        disableDeliveryAddress();
    }
    */
   
    destroyArticleVariantValidator(destroyIt);
   
};


destroyArticleVariantValidator = function(destroyIt)  {
    
    if(destroyIt == true) {       
        checkoutAddressValidator.validator('destroy');
        initCheckoutAddressForm();
    }
    
};


initCheckoutAddressForm = function() {
    
    checkoutAddressValidator = jQuery('#checkOut-address-form').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};

initCheckoutAddressEvent = function() {
    
    jQuery('#user_userPerson_sex').unbind('change').bind('change', function(e) {  
        prepareCheckoutAddressForm(true);
    });
    
    /*
    jQuery('#checkOut_isDelivery').unbind('change').bind('change', function(e) {  
        prepareCheckoutAddressForm(true);
    });

    jQuery("input[type=radio][name='user[delivery][selectId]']").unbind('change').bind('change', function(e) {
        prepareCheckoutAddressForm(true);
    });

    jQuery('#checkOut-delivery-address a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        prepareCheckoutAddressForm(true);
    });

    jQuery('#user_delivery_sex').unbind('change').bind('change', function(e) {  
        prepareCheckoutAddressForm(true);
    });
    */
};

iniCheckoutDateOfBirthDatePicker = function() {

    jQuery.datetimepicker.setLocale('de');
    jQuery('#user_userPerson_dateOfBirth').datetimepicker({
        timepicker: false,
        format: 'd.m.Y',
        debug: true
    });
    
};

showCheckoutDelivery = function() {
    jQuery('#checkOut-delivery').show("fast"); 
};

hideCheckoutDelivery = function() {
    jQuery('#checkOut-delivery').hide("slow");   
};

showCheckoutDeliveryAddress = function() {
    jQuery('#checkOut-delivery-address').show("fast"); 
};

hideCheckoutDeliveryAddress = function() {
    jQuery('#checkOut-delivery-address').hide("slow"); 
};


showCheckoutDeliverySelection = function() {
    jQuery('#checkOut-delivery-selection').show("fast"); 
};

hideCheckoutDeliverySelection = function() {
    jQuery('#checkOut-delivery-selection').hide("slow");   
};

/*

getActiveDeliveryTab = function () {
    
    var className = jQuery('#checkOut-delivery-address ul.nav-tabs li.nav-item a.active').attr('class');
    
    className = className.replace(/nav-link/, '');
    className = className.replace(/active/, '');
    className = className.replace(/disabled/, '');
    className = className.replace(/ /, '');
    className = className.trim();
    
    return(className);
    
};


enableDeliveryAddress = function() {
    
    var deliveryTab = getActiveDeliveryTab();
    
    if( deliveryTab == 'deliveryPackstationForm' ) {       
        jQuery('#form-group-delivery-packstation').show("fast"); 
        jQuery('#form-group-delivery-street').hide("slow");
        jQuery('#user_delivery_isPackstation').val(1);   
        jQuery('#user_delivery_packStation').prop('required',true);
        jQuery('#user_delivery_postNumber').prop('required',true);
        jQuery('#user_delivery_street').prop('required',false);
    } else {
        jQuery('#form-group-delivery-packstation').hide("slow");
        jQuery('#form-group-delivery-street').show("fast"); 
        jQuery('#user_delivery_isPackstation').val(0);
        jQuery('#user_delivery_packStation').prop('required',false);
        jQuery('#user_delivery_postNumber').prop('required',false);
        jQuery('#user_delivery_street').prop('required',true); 
    }
    
    jQuery('#user_delivery_sex').prop('required',true);
    jQuery('#user_delivery_firstName').prop('required',true);
    jQuery('#user_delivery_lastName').prop('required',true);
    jQuery('#user_delivery_zipCode').prop('required',true);
    jQuery('#user_delivery_city').prop('required',true);
    jQuery('#user_delivery_country').prop('required',true);
    
    if(jQuery('#user_delivery_sex').val() == 'c') {
        jQuery("#form-group-userDelivery-firm").show();
        jQuery('#user_delivery_firm').prop('required',true);
    } else {
        jQuery("#form-group-userDelivery-firm").hide();
        jQuery('#user_delivery_firm').prop('required',false);
    }
    
};

disableDeliveryAddress = function() {
    
    jQuery('#user_delivery_isPackstation').val(0);
    jQuery('#user_delivery_sex').prop('required',false);
    jQuery('#user_delivery_firm').prop('required',false);
    jQuery('#user_delivery_firstName').prop('required',false);
    jQuery('#user_delivery_lastName').prop('required',false);
    jQuery('#user_delivery_packStation').prop('required',false);
    jQuery('#user_delivery_postNumber').prop('required',false);
    jQuery('#user_delivery_street').prop('required',false);
    jQuery('#user_delivery_zipCode').prop('required',false);
    jQuery('#user_delivery_city').prop('required',false);
    jQuery('#user_delivery_country').prop('required',false);
        
};*/