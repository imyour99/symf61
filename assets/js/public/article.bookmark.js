jQuery(document).ready(function () {
    
    if( jQuery('body.landing').find('.articleBookmarkSVG').length > 0 || 
        jQuery('body.articleDetail').find('.articleBookmarkSVG').length > 0 || 
        jQuery('body.articleList').find('.articleBookmarkSVG').length > 0) {
    
        initArticleBookmark();    
    }
    
});

initArticleBookmark = function() {

    jQuery(".articleBookmarkSVG").unbind('click').bind('click', function(event) {  
        
        event.preventDefault();
        
        var articleBookmarkSVG = this;
        jQuery(articleBookmarkSVG).tooltip('dispose');
        jQuery(articleBookmarkSVG).animate({opacity: '0.4'}, "slow");
        
        if(jQuery(articleBookmarkSVG).hasClass("favorite")) {
            jQuery.ajax( jQuery(articleBookmarkSVG).data("delurl") )
                .done(function() {
                    jQuery(articleBookmarkSVG).removeClass("favorite", 500);
                    jQuery(articleBookmarkSVG).tooltip(
                        {
                            delay: { "show": 100, "hide": 100 },
                            html: true,
                            title: jQuery(articleBookmarkSVG).data("transdel"),
                            placement: 'right'
                        });
                    jQuery(articleBookmarkSVG).tooltip('show');
                })
                .fail(function() {})
                .always(function() {});
        } else {
            jQuery.ajax( jQuery(articleBookmarkSVG).data("addurl") )
                .done(function() {
                    jQuery(articleBookmarkSVG).addClass("favorite", 500);
                    jQuery(articleBookmarkSVG).tooltip(
                        {
                            delay: { "show": 100, "hide": 100 },
                            html: true,
                            title: jQuery(articleBookmarkSVG).data("transadd"),
                            placement: 'right'
                        });
                    jQuery(articleBookmarkSVG).tooltip('show');
                    
                    trackingGTMaddProductToWishlist(jQuery(articleBookmarkSVG).data("currentcombineid"));
                })
                .fail(function() {})
                .always(function() {});
        }
            
        jQuery(articleBookmarkSVG).animate({opacity: '1'}, "slow");
        
    });
    
};