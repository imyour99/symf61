jQuery(document).ready(function () {
    
    if(jQuery('body.order.detail').find('#order-form').length > 0) {
        initOrderDetailForm();
        prepareOrderDetailForm(true); 
        eventOrderDetailForm();
        eventOrderDetailIsPaid();
        initOrderDetailStatus();
    }
    
});

var orderDetailValidator = null;

initOrderDetailForm = function() {
    
    orderDetailValidator = jQuery('#order-form').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};

eventOrderDetailForm = function() {
    
    jQuery('#ordering_bill_sex').unbind('change').bind('change', function(e) {  
        prepareOrderDetailForm(true);
    });
    
    jQuery('#ordering_delivery_sex').unbind('change').bind('change', function(e) {  
        prepareOrderDetailForm(true);
    });
    
    jQuery("input[type=radio][name='ordering[delivery][isDelivery]']").unbind('change').bind('change', function(e) {
        prepareOrderDetailForm(true);
    });
   
    jQuery('#ordering_delivery_address_form a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        prepareOrderDetailForm(true);
    });
    
};

prepareOrderDetailForm = function(destroyIt) {
    
    if(jQuery('#ordering_bill_sex').val() == 'c') {  
        jQuery("#ordering_bill-firm").show();
        jQuery("#ordering_bill-uStIdNr").show();
        jQuery('#ordering_bill_firm').prop('required',true);
        
    } else {
        jQuery("#ordering_bill-firm").hide();
        jQuery("#ordering_bill-uStIdNr").hide();
        jQuery('#ordering_bill_firm').prop('required',false);
    }
    
    jQuery('#ordering_bill_street').prop('required',true);
    
    if(jQuery('#ordering_delivery_delivery').is(':checked') == true) {
        jQuery('#ordering_delivery_address_form').show("fast"); 
        requiredDeliveryAddressForm(true);
    } else {
        jQuery('#ordering_delivery_address_form').hide("slow");   
        requiredDeliveryAddressForm(false);
    }
    
    destroyOrderDetailForm(destroyIt);
    
};

destroyOrderDetailForm = function(destroyIt)  {
    
    if(destroyIt == true) {       
        orderDetailValidator.validator('destroy');
        initOrderDetailForm();
    }
    
};

getActiveDeliveryAddressTab = function () {
    
    if(jQuery('body.order.detail').find('#ordering_delivery_address_form ul.nav-tabs li.nav-item a.active').length > 0) {
        var className = jQuery('#ordering_delivery_address_form ul.nav-tabs li.nav-item a.active').attr('class');
        className = className.replace(/nav-link/, '');
        className = className.replace(/active/, '');
        className = className.replace(/disabled/, '');
        className = className.replace(/ /, '');
        className = className.trim();
        return(className);
    }
    
    return(null);

};

requiredDeliveryAddressForm =function(required) {
    
    var deliveryTab = getActiveDeliveryAddressTab();
    
    jQuery('#ordering_delivery_sex').prop('required',required);
    jQuery('#ordering_delivery_firstName').prop('required',required);
    jQuery('#ordering_delivery_lastName').prop('required',required);
    jQuery('#ordering_delivery_zipCode').prop('required',required);
    jQuery('#ordering_delivery_city').prop('required',required);
    jQuery('#ordering_delivery_country').prop('required',required);
    
    if(jQuery('#ordering_delivery_sex').val() == 'c') {  
        jQuery("#ordering_delivery-firm").show();
        jQuery('#ordering_delivery_firm').prop('required',required);
    } else {
        jQuery("#ordering_delivery-firm").hide();
        jQuery('#ordering_delivery_firm').prop('required',false);
    }
    
    if( deliveryTab == 'deliveryPackstationForm' ) {          
        jQuery('#ordering_delivery-packStation').show("fast"); 
        jQuery('#ordering_delivery-street').hide("slow");
        jQuery('#ordering_delivery_isPackstation').val(1);   
        jQuery('#ordering_delivery_packStation').prop('required',required);
        jQuery('#ordering_delivery_postNumber').prop('required',required);
        jQuery('#ordering_delivery_street').prop('required',false);
    } else {
        jQuery('#ordering_delivery-packStation').hide("slow");
        jQuery('#ordering_delivery-street').show("fast"); 
        jQuery('#ordering_delivery_isPackstation').val(0);   
        jQuery('#ordering_delivery_packStation').prop('required',false);
        jQuery('#ordering_delivery_postNumber').prop('required',false);
        jQuery('#ordering_delivery_street').prop('required',required); 
    }
    
};

eventOrderDetailIsPaid = function() {
    
    jQuery("#isPaid_isPaid").unbind('change').bind('change', function(e) {     
        e.preventDefault();     
        jQuery( "#order-ispaid-form").submit();
    });
    
};


initOrderDetailStatus = function() {
  
  if(jQuery("#orderStatus_isRequest").val() == true) {   
        initOrderDetailStatusFormValidator();
        jQuery("#orderStatus_status").unbind('change').bind('change', function(e) {     
            var selected = jQuery(this).val();
            if(selected == '-1') {
                stornoOrderDetailStatus();
            }
        });
  } else { 
      eventOrderDetailStatus();
  }

};

initOrderDetailStatusFormValidator = function() {
    
    jQuery('#order-status-form').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};

eventOrderDetailStatus = function() {
    
    jQuery("#orderStatus_status").unbind('change').bind('change', function(e) {     
        
        e.preventDefault();   
        var selected = jQuery(this).val();
        
        if(selected == '-1') {
            stornoOrderDetailStatus();
        } else {
            jQuery( "#order-status-form" ).submit();
        }
        
    });
    
};

stornoOrderDetailStatus = function() {
    
    startBootstrapConfirmation(jQuery("#orderStatus_status"));
    
    jQuery('#modalEventId').unbind('click').bind('click', function(e) {  
        jQuery( "#order-status-form" ).submit();
    });
  
    jQuery('#modalCancelId').unbind('click').bind('click', function(e) {  
        jQuery('#orderStatus_status').val(jQuery('#orderStatus_oldStatus').val());
    });
     
    
};