jQuery(document).ready(function () {
    
    if(jQuery('body.articleList').find('#sidebarToggle').length > 0) {   
        initArticleListCategoryToggle();
    }
    
    if(jQuery('body.articleList').find('#articleListPagination').length > 0) {
        initArticleListScroll();
    }
        
});


initArticleListCategoryToggle = function() {
    jQuery('#sidebarToggle').unbind('click').bind('click', function(event) {  
        event.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    });
};

initArticleListScroll = function() {
    
    let ias = new InfiniteAjaxScroll(
        '#articleList', {
            item: '#articleList .card',
            spinner: '#articleListSpinner',
            pagination: '#articleListPagination',
            next: '#articleListPaginationNext',
            logger: false
        }
    );
    
    ias.on('appended', listIsScrolled);
    
};

listIsScrolled = function(event) {   
    //initTrackingArticleList(event.parent.childElementCount + 1);
    //initArticleCartButton();
};