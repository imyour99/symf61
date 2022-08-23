jQuery(document).ready(function () {
    
    if(jQuery('body.administration.list').find('.tablesorter-custom').length > 0) {
        initTableSort();
    }
    
});


initTableSort = function() {
    
    jQuery(".tablesorter-custom").tablesorter({
        imgAttr         : 'data-sort',
        widgets         : ['zebra', 'columns'],
        usNumberFormat  : false,
        sortReset       : true,
        sortRestart     : true
    });
    
};