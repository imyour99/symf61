jQuery(document).ready(function () {
    
    if(jQuery('body.changePassword').find('#changePassword-form').length > 0) {
        initChangePasswordForm();
    }
    
});


initChangePasswordForm = function() {
  
    jQuery('#changePassword-form').validator({
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }
    });
    
};