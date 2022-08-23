jQuery(document).ready(function () {
    
    if(jQuery('body.article.list').find('.list-form-filter').length > 0) {      
        initArticleShopTaxEvent(); 
    }
    
});


initArticleShopTaxEvent = function() {
    
    jQuery("#input_shop").unbind('change').bind('change', function(e) {   
        
        var value = jQuery(this).val();
        jQuery("#input_tax option").prop("disabled", false);
        
        if(value != -1) {
            jQuery("#input_tax option[data-shop]:not([data-shop*='" + value + "'])").prop("disabled", true);
        }
        
        if(jQuery('#input_tax option:selected').prop('disabled') == true){         
           jQuery("#input_tax").val(-1);
           jQuery( ".list-form-filter" ).submit();
        }
        
    });
    
};