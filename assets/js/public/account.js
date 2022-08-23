jQuery(document).ready(function () {

    if (jQuery('body').find('#formAccountData').length > 0) {     
        initAccountData();
    }
    
    if (jQuery('body').find('#formAccountPassword').length > 0) {
        initAccountPassword(); 
    }
    
    if (jQuery('body').find('#formAccountEmail').length > 0) {
        initAccountEmail();
    }
    
    /*
    if (jQuery('body').find('#formCreditData').length > 0) {
        initAccountCredit();
    }
    */
});

initAccountData = function() {
    initAccountValidator();
    initAccountDateOfBirth();
    initAccountAnrede();
};

initAccountValidator = function() {
    
    jQuery('#formAccountData').validator({
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }
    });
    
};

initAccountDateOfBirth = function() {
        
    jQuery.datetimepicker.setLocale('de');
    jQuery('#user_userPerson_dateOfBirth').datetimepicker({
        timepicker: false,
        format: 'd.m.Y'
    });

    jQuery('#user_userPerson_dateOfBirth_button').unbind('click').bind('click', function (e) {
        e.preventDefault();
        jQuery('#user_userPerson_dateOfBirth').focus();
    });
    
};

initAccountAnrede = function() {
    
    jQuery("#company").hide();
    jQuery("#uStId").hide();
    
    if (jQuery("#user_userPerson_sex").val() === 'c') {
        jQuery("#company").show();
        jQuery("#uStId").show();
        jQuery('#user_userPerson_firm').prop('required', true);
    }

    jQuery('#user_userPerson_sex').on('change', function () {
        if (this.value === 'c') {
            jQuery("#company").show("slow");
            jQuery("#uStId").show("slow");
            jQuery('#user_userPerson_firm').prop('required', true);

        } else {
            jQuery("#company").hide("hide");
            jQuery("#uStId").hide("hide");
            jQuery('#user_userPerson_firm').prop('required', false);
        }

    });
};

initAccountPassword = function() {
    
    jQuery('#formAccountPassword').validator({
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }
    });
        
};

initAccountEmail = function() {
    
    jQuery('#formAccountEmail').validator({
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }
    });
        
};