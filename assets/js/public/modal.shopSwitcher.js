jQuery(document).ready(function () {
    
    if(jQuery('body').find('#shopSwitcherRemoteDesktop, #shopSwitcherRemoteMobil').length > 0) {
        initShopSwitcher();
    }
    
});

initShopSwitcher = function() {
    
    jQuery('#shopSwitcherModal').on('show.bs.modal', function (e) {

        var button = jQuery(e.relatedTarget);
        var modal = jQuery(this);
        
        modal.find('.modal-body').html('<div class="text-center"><div class="spinner-grow text-primary"></div></div>');
        modal.find('.modal-body').load(button.data("remote"), function() {
           changeShopSwitcherDeliveryEvent(); 
        });
        
    });
    
};

changeShopSwitcherDeliveryEvent = function() {
    
    jQuery("#shopSwitcher_delivery").unbind('change').bind('change', function(e) {               
        
        var lang = jQuery( "#shopSwitcher_language" ).val();
        var shop = jQuery(this).find(':selected').data('shop');
        var shopLanguages = jQuery("#shopSwitcher_language").data("shop-languages");
        jQuery('#shopSwitcher_language').empty();
        
        var options = jQuery("#shopSwitcher_language");       
        if(typeof shopLanguages === 'object') {         
            if(typeof shopLanguages[shop] === 'object') {      
                jQuery.each(shopLanguages[shop], function(val, text) {
                    options.append(jQuery("<option />").val(val).text(text));
                });
            }
        }
        
        jQuery('#shopSwitcher_language > option[value *= "'+lang+'"] ').attr('selected',true);
        
    });
        
};