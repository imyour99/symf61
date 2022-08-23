jQuery(document).ready(function () {
    
    if(jQuery('body.order.list').find('.form-select-list').length > 0) {
        initAdminOrderListEvent();
    }
    
    if(jQuery('body.order.list').find('[data-toggle="tooltip"]').length > 0) {      
        initAdminOrderListTooltip(); 
    }
    
});

initAdminOrderListEvent = function() {
    initAdminOrderListIsPaidEvent();
    initAdminOrderListStatusEvent();
};

initAdminOrderListIsPaidEvent = function() {
    
    jQuery(".form-select-isPaid").unbind('change').bind('change', function(e) {     

        e.preventDefault();     
        var id = parseInt(jQuery(this).attr("id").replace(/isPaid-/, ''));        
        jQuery( "#form-isPaid-" + id ).submit();
        
    });
    
};

initAdminOrderListStatusEvent = function() {
    
    jQuery(".form-select-status").unbind('change').bind('change', function(e) {     
        
        e.preventDefault();     
        var id = jQuery(this).attr("id");        
        var orderId = parseInt(id.replace(/status-/, ''));        
        var selected = jQuery(this).val();
        
        if(selected == '-1') {
            stornoAdminOrderListStatus(id, orderId);
        } else {
            jQuery( "#form-status-" + orderId ).submit();
        }
        
    });
};

initAdminOrderListTooltip = function() {
    jQuery('[data-toggle="tooltip"]').tooltip();
};

stornoAdminOrderListStatus = function(id, orderId) {
    
    startBootstrapConfirmation(jQuery("#" + id));
    
    jQuery('#modalEventId').unbind('click').bind('click', function(e) {  
        jQuery( "#form-status-" + orderId).submit();
    });
  
    jQuery('#modalCancelId').unbind('click').bind('click', function(e) {  
        jQuery('#status-' + orderId).val(jQuery('#oldStatus-' + orderId).val());
    });
     
    
};