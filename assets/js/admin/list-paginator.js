jQuery(document).ready(function () {
    
    if(jQuery('body.administration.list').find('.list-paginator').length > 0) {
        initPaginatorPager();
        initListActionEvent();
    }
    
});

initPaginatorPager = function() {
    
    jQuery('#paginatorPageBtn-top, #paginatorPageBtn-bottom').unbind('click').bind('click', function(e) { 
        
        e.preventDefault();
        
        var btnPos = this.id.replace(/paginatorPageBtn-/, '');
        var page = parseInt(jQuery('#paginator_page-' + btnPos).val());
        var url = jQuery('#paginator_page-' + btnPos).data("url");
        var pagesearch = jQuery('#paginator_page-' + btnPos).data("pagesearch");
        var sets = parseInt(jQuery('#paginator_page-' + btnPos).data("sets"));
        
        if(page >= 1 && page <= sets) {          
            var newUrl = url.replace(pagesearch, '/'+page);           
            jQuery(location).attr('href', newUrl);
        }
        
    });
    
};



initListActionEvent = function() {
    
    jQuery('#list-checkAll').unbind('change').bind('change', function(e) {  
        e.preventDefault();
        prepareListCheckAll(this);
    });
    
    jQuery('#list-action').unbind('change').bind('change', function(e) { 
        e.preventDefault();
        preparePaginatorAction(this);
    });
};

prepareListCheckAll = function($this) { 
    jQuery('input:checkbox.list-checkAll').prop('checked', jQuery($this).prop("checked"));
};

preparePaginatorAction = function($this) {
    
    if(jQuery($this).val() != '-1' ) {
            
        var idString = '';
        jQuery('.list-checkAll:checkbox:checked').each(function() {
            if(jQuery(this).val()) {
                if(idString != '') {  idString += ','; }
                idString += jQuery(this).val();
            }
        });

        if(idString.length > 0) {
            jQuery('#list-action-ids').val(idString);
            jQuery('#list-action-form').submit();
        } 
    }
        
};