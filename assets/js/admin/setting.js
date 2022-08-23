jQuery(document).ready(function () {

    if(jQuery('body.setting.detail').find('#setting-form').length > 0) {
        initSettingForm();
    }

});

var settingValidator = null;

initSettingForm = function() {
    
    settingValidator = jQuery('#setting-form').validator({
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }
    });

};