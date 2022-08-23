jQuery(document).ready(function () {
    
    if(jQuery('body.checkOut-overview').find('#checkOut-overview-form').length > 0) {
        initCheckoutOverview();
    }
    
});

var checkoutOverviewValidator = null;

initCheckoutOverview = function() {
    
    initCheckoutOverviewForStripe();
    initDisablePayPalCheckout();
    initCheckOutOverviewValidation();
    validateCheckOutOverviewValidator();
    initCheckOutOverviewEventValid();
   
};

initCheckOutOverviewValidation = function() {
    
    checkoutOverviewValidator = jQuery('#checkOut-overview-form').validator({
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};

validateCheckOutOverviewValidator = function() {
    checkoutOverviewValidator.validator('validate');
};

initCheckOutOverviewEventValid = function() {
    
    checkoutOverviewValidator.on('validated.bs.validator', function() {
        
        var isError = jQuery('#checkOut-overview-form').validator().data('bs.validator').hasErrors();

        if(isError == false) {
            initEnablePayPalCheckout();
        } else {
            initDisablePayPalCheckout();
        }
        
    });
    
};

/*
destroyCheckoutOverviewValidator = function(destroyIt)  {
    if(destroyIt == true) {       
        checkoutOverviewValidator.validator('destroy');
        initCheckOutOverviewValidation();
    }
};
*/

/*
    //prepareCheckoutOverview(false);
    //initCheckOutOverviewEvent();
    //initCheckoutOverviewForStripe();
    //disableReturnForAdviceUserSearching();
    //initAdviceUserSearching();
    prepareCheckoutOverview = function(destroyIt) {

        initCheckoutOverviewForPayPal();
        destroyCheckoutOverviewValidator(destroyIt);

    };
*/

/*
initAdviceUserSearching = function() {
    
    jQuery('#checkout_adviceUser').autocomplete({
        treshold: 3,
        source: studioArray,
        onSelectItem: onSelectItem,
        highlightClass: 'orangeText'
    });
        
};

onSelectItem = function(item, element) {
    jQuery('#checkout_adviceUserId').val(item.value);
};

disableReturnForAdviceUserSearching = function() {
    
    jQuery('#checkout_adviceUser').keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
  
};
*/