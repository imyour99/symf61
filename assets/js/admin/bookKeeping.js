jQuery(document).ready(function () {
    
    if(jQuery('body.bookKeeping.filter').find('.list-form-filter').length > 0) {
        prepareBookKeepingForm();
        initBookKeepingForm();
        initBookKeepingFilter();
    }
    
});

var bookKeepingFilter = null;

prepareBookKeepingForm = function() {
    
    jQuery('#input_shop').prop('required',true);
    jQuery('#input_month').prop('required',true);
    jQuery('#input_paymentId').prop('required',true);
    
};

initBookKeepingForm = function() {
    
    bookKeepingFilter = jQuery('#list-form-filter-accordion').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};

initBookKeepingFilter = function() {
    
  jQuery("#toogleListFilter" ).trigger( "click" );
  
};