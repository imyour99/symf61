jQuery(document).ready(function () {

    if(jQuery('body.user.detail').find('#user-form').length > 0) {
        initUserShopResource();
        initUserRolesResource();
        initUserDatePicker();
        initUserOptions();
        initUserForm();
    }

});

initUserRolesResource = function() {
    jQuery('#user_roles').multiSelect({
        selectableHeader: '<label for="user_roles">verfügbare Shop Module:</label>',
        selectionHeader: '<label >zugewiesene Shop Module:</label>',
    });
};

initUserShopResource = function() {
    jQuery('#user_shopResource').multiSelect({
        selectableHeader: '<label for="user_shopResource">Shop-Auswahl:</label>',
        selectionHeader: '<label >zugewiesene Shop(s):</label>',
    });
};

initUserOptions = function () {

    jQuery("#user_userPerson_sex").unbind('change').bind('change', function(e) {
        if(this.value == 'c') {
            jQuery('#user_userPerson_firm').prop('required', true);
        } else {
            jQuery('#user_userPerson_firm').prop('required', false);
        }
    });

    jQuery("#user_descriminatorResource").unbind('change').bind('change', function(e) {
      
        if(this.value == 'administration') {
            jQuery('#user_roles').prop('required', true).prop('disabled', false);

            jQuery('#ms-user_roles').find('.ms-elem-selectable').removeClass('disabled');
            jQuery('#ms-user_roles').find('.ms-elem-selection').removeClass('disabled');

            jQuery('#ms-user_shopResource').find('.ms-elem-selectable').removeClass('disabled');
            jQuery('#ms-user_shopResource').find('.ms-elem-selection').removeClass('disabled');
            jQuery("#user_roles option").prop("disabled", false);
        } else {
            jQuery('#user_roles').val('').prop('required', false).prop('disabled', false);
            jQuery("#user_roles option:selected").removeAttr("selected");

            jQuery('#ms-user_roles').find('.ms-elem-selectable.ms-selected').show();
            jQuery('#ms-user_roles').find('.ms-elem-selection.ms-selected').hide();
            jQuery('#ms-user_roles').find('.ms-elem-selectable').addClass('disabled');
            jQuery('#ms-user_roles').find('.ms-elem-selection').addClass('disabled');

            jQuery('#ms-user_shopResource').find('.ms-elem-selectable.ms-selected').show();
            jQuery('#ms-user_shopResource').find('.ms-elem-selection.ms-selected').hide();
            jQuery('#ms-user_shopResource').find('.ms-elem-selectable').addClass('disabled');
            jQuery('#ms-user_shopResource').find('.ms-elem-selection').addClass('disabled');
            jQuery("#user_shopResource option:selected").removeAttr("selected");
        }
        
        if(this.value == 'guest' || this.value == 'consumer' || this.value == 'administration') {
            jQuery('#user_userPerson_adviceUserResource').prop('disabled', false);
        } else if(this.value == 'professional') {
            jQuery('#user_userPerson_adviceUserResource').val('').prop('disabled', true);
        }

    });

};

var userValidator = null;

initUserForm = function() {
    userValidator = jQuery('#user-form').validator({
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }
    });

};

initUserDatePicker = function() {
    jQuery.datetimepicker.setLocale('de');
    jQuery('#user_userPerson_dateOfBirth').datetimepicker({
        timepicker: false,
        format: 'd.m.Y',
        debug: true
    });
};