jQuery(document).ready(function () {
    
    jQuery('#sidebar-toggle').unbind('click').bind('click', function(e) {     
        e.preventDefault();
        jQuery("#wrapper").toggleClass("toggled");
    });
    
});