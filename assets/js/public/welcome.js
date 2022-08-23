jQuery(document).ready(function () {
    
    if(jQuery('body.welcome').find('.welcome-container').length > 0) {
        initWelcomeEvents();
        initWelcomeFormEvents('signIn');
        tooglePasswortForm();
    }
    
});

var signInValidator = null;
var signUpValidator = null;
var pwForgotValidator = null;

initWelcomeEvents = function() {
    
    jQuery('#signUpToggleBtn').unbind('click').bind('click', function(e) {   

        e.preventDefault();
        jQuery('.signIn-container, .signIn-footer, .forgot-footer, .forgot-container-main, .signUp-footer').hide();
        jQuery('.signIn-container-main, .signUp-container, .signIn-footer').show();           
        initWelcomeFormEvents('signUp');
        
    });
    
    jQuery('#signInToggleBtn').unbind('click').bind('click', function(e) {   
        
        e.preventDefault();
        jQuery('.signIn-footer, .signUp-container').hide();
        jQuery('.signIn-container, .forgot-footer, .signUp-footer').show();  
        jQuery('#forgotToggleBtn').text(jQuery('#signInFooter').data("button-topwforgot"));
        initWelcomeFormEvents('signIn');
        
    });
    
    jQuery('#forgotToggleBtn').unbind('click').bind('click', function(e) { 
        
        e.preventDefault();        
        
        jQuery('.signIn-container-main').slideToggle();  
        jQuery('.forgot-container-main').slideToggle();
        
        if (jQuery(this).text() == jQuery('#signInFooter').data("button-topwforgot")) {
            jQuery(this).text(jQuery('#signInFooter').data("button-tosignin"))
            initWelcomeFormEvents('pwForgot');
        } else {
            jQuery(this).text(jQuery('#signInFooter').data("button-topwforgot"));
            initWelcomeFormEvents('signIn');
        }
        
    });
    
};

tooglePasswortForm = function() {
    
    var toogleButton = urlParam('toggle');
    
    if(toogleButton) {
        jQuery("#forgotToggleBtn" ).trigger( "click" );
    }
};


initWelcomeFormEvents = function(type) {
    
    if(jQuery('.signUp-container').css('display') == 'block') {
        
        if(signInValidator) {
            signInValidator.validator('destroy');
            signInValidator = null;
        }
        
        if(pwForgotValidator) {
            pwForgotValidator.validator('destroy');
            pwForgotValidator = null;
        }
        
        prepareSignUpSettings(false);
        initSignUpValidator();
        initUserPersonSexEvent();
        
    } else {

        if(signUpValidator) {
            signUpValidator.validator('destroy');
            signUpValidator = null;
        }
        
        if(type == 'pwForgot') {
            
            if(signInValidator) {
                signInValidator.validator('destroy');
                signInValidator = null;
            }
            
            initPwForgotValidator();
            
            
        } else if(type == 'signIn') {
            
            if(pwForgotValidator) {
                pwForgotValidator.validator('destroy');
                pwForgotValidator = null;
            }
            
            initSignInValidator();
        }
        
       
    }
    
};


initSignUpValidator = function() {
    
    signUpValidator = jQuery('#welcomeSignUp').validator({
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};

initSignInValidator = function() {
    
    signInValidator = jQuery('#welcomeSignIn').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};

initPwForgotValidator = function() {
    
    pwForgotValidator = jQuery('#welcomeForgot').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};

prepareSignUpSettings = function(destroyIt) {
    
    // preset is false;
    destroySignUpValidator(destroyIt);
    
};


initUserPersonSexEvent = function() {
    
    jQuery('#user_userPerson_sex').unbind('change').bind('change', function(e) {  
        
        jQuery('#user_userPerson_sex option[value=""]').remove();
        
        if(jQuery(this).val() == 'c') {
            jQuery("#form-group-userPerson-uStIdNr").show();
            jQuery("#form-group-userPerson-firm").show();
            
            jQuery('#user_userPerson_firm').prop('required',true);
            
        } else {
            jQuery("#form-group-userPerson-uStIdNr").hide();
            jQuery("#form-group-userPerson-firm").hide();
            
            jQuery('#user_userPerson_firm').val('').prop('required',false);
            jQuery('#user_userPerson_uStIdNr').val('');
          
        }
        
        destroySignUpValidator(true);
        
    });
};


destroySignUpValidator = function(destroyIt)  {
    
    if(destroyIt == true) {       
        signUpValidator.validator('destroy');
        initSignUpValidator();
    }
    
};