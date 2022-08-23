jQuery(document).ready(function () {
    
    if(jQuery('body.stock.list').find('#stock-form').length > 0) {   
        initArticleStockForm();  
        initStockReloadEvent();
        initStockDatePicker();
    }
    
});

var stockValidator = null;

initArticleStockForm = function() {
    
    stockValidator = jQuery('#stock-form').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};


initStockReloadEvent = function() {
    
    jQuery('#stock_combineId').unbind('change').bind('change', function(e) {  
        
        var articleId = parseInt(jQuery(this).find(':selected').data('articleid'));
        var combineId = parseInt(jQuery(this).find(':selected').data('combineid'));
         
        if(articleId > 0 && combineId > 0) {
            var url = jQuery('#stockArticleChoose').data("reloadarticleurl");
            url = url.replace(/_0_/, articleId);
            url = url.replace(/_1_/, combineId);
        } else {
            var url = jQuery('#stockArticleChoose').data("reloadurl");
        }
        
        window.location = url;
        
    });
};

initStockDatePicker = function() {
    
    jQuery.datetimepicker.setLocale('de');
    jQuery('#stock_stockDate').datetimepicker({
        timepicker: false,
        format: 'd.m.Y',
        debug: true
    });
    
};
