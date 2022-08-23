jQuery(document).ready(function () {
    
    if (jQuery('body.blogList').find('#blogList').length > 0) {
        let ias = new InfiniteAjaxScroll(
                '#blogList', {
                    item: '.blog-item-row',
                    spinner: '#blogListSpinner',
                    pagination: '#blogListPagination',
                    next: '#blogListPaginationNext',
                    logger: false
                }
        );
    }

});
