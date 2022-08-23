jQuery(document).ready(function () {
    if (jQuery('body').find('#formContact').length > 0) {
        jQuery('#formContact').validator({
            disable: false,
            feedback: {
                success: 'fas fa-check',
                error: 'fas fa-times'
            }
        });
    }
});
