jQuery(document).ready(function () {
    
    if(jQuery('footer.standard').length > 0) {     
        initScrollToTop();
        initFooterNavigation();
    }
    
});


initScrollToTop = function() {
    
    jQuery('#footerChevronElement').unbind('click').bind('click', function (e) {
        e.preventDefault();
        jQuery('html, body').animate({
            scrollTop: jQuery("#headerNavbarBrand").offset().top
        }, 1200);
    });
  
};

initFooterNavigation = function() {
    
    if(jQuery('footer.standard').find('.links-bar-head').length > 0) {
        if (jQuery(window).width() < 768) {
            jQuery('.links-bar-head').unbind('click').bind('click', function(e) {   
                jQuery(this).next('ul').slideToggle();
            });
        } else {         
            jQuery('.links-bar-head').unbind('click');
            jQuery('.links-bar-head').each(function() {
                jQuery(this).next('ul').show();
            });
        }
    }
    
};