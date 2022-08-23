jQuery(document).ready(function () {
    
    if(jQuery('body.articleVote').find('#articleVote-form').length > 0) {   
        initVotingDetailForm();
        preparVotingDetailForm(true); 
        eventVotingDetailForm();
        initVotingDatePicker();    
        initVotingRating();    
        initVotingIcon(true);
    }
    
});

var votingDetailValidator = null;

initVotingDetailForm = function() {
    
    votingDetailValidator = jQuery('#articleVote-form').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};

eventVotingDetailForm = function() {
    
    jQuery("input[type=radio][name='articleVotings[isLandingPage]']").unbind('change').bind('change', function(e) {
        preparVotingDetailForm(true);
    });
    
};

preparVotingDetailForm = function(destroyIt) {
    
    if(jQuery('#articleVotings_isLandingPage_1').is(':checked') == true) {
        jQuery('#articleVotings_title').prop('required',true).prop('disabled', false);
    } else {
        jQuery('#articleVotings_title').val('').prop('required',false).prop('disabled', true);
    }
    
    prepareVotingUserForm();
    destroyVotingDetailForm(destroyIt);
    
};

prepareVotingUserForm = function() {
    
    var required = true;
    var disabled = false;
    var userId = jQuery('#articleVotings_userId').val();
    
    if(userId > 0) {
        jQuery('#articleVotings_userId').prop('disabled', false);
        required = false;
        disabled = true;
        
        jQuery('#articleVotings_firstName').val('');
        jQuery('#articleVotings_lastName').val('');
        jQuery('#articleVotings_city').val('');
        
    } else {
        jQuery('#articleVotings_userId').prop('disabled', true);
    }
    
    jQuery('#articleVotings_firstName').prop('required',required).prop('disabled', disabled);
    jQuery('#articleVotings_lastName').prop('required',required).prop('disabled', disabled);
    jQuery('#articleVotings_city').prop('required',required).prop('disabled', disabled);
    
    if(jQuery('#articleVotings_isLandingPage_1').is(':checked') == false && userId == '') {
        jQuery('#articleVotings_city').val('').prop('required',false).prop('disabled', true);
    }
    
};

destroyVotingDetailForm = function(destroyIt)  {
    
    if(destroyIt == true) {       
        votingDetailValidator.validator('destroy');
        initVotingDetailForm();
    }
    
};


initVotingDatePicker = function() {
    jQuery.datetimepicker.setLocale('de');
    jQuery('#articleVotings_voteDate').datetimepicker({
        timepicker: false,
        format: 'd.m.Y',
        debug: true
    });
};


initVotingRating = function() {
    
    jQuery("#rating_star").starRating({
        initialRating: jQuery('#articleVotings_rating').val(),
        readOnly: false,
        starSize: 40,
        totalStars: 5,
        useFullStars: false,
        forceRoundUp: false,
        starShape: 'straight',
        disableAfterRate: false,
        ratedColor: '#F39200',
        starGradient: {
            start: '#FF5722',
            end: '#F39200'
        },callback: function(currentRating, $el){
            jQuery('#articleVotings_rating').val(currentRating);
        }
    });
};

initVotingIcon = function(isPreset) {
    
    var data = {};
    data['uploadId'] = jQuery("#voting-userImg");
    data['isPreset'] = isPreset;
    data['imgFileId'] = '#articleVotings_userImg';
    data['cacheFileId'] = '#articleVotings_uploadImg';  
    data['extraData'] = {};
    data['extraData']['extension'] = 'articleVote';
    data['extraData']['filetype'] = 'image';
    data['extraData']['id'] = jQuery('#articleVotings_id').val();
    data['extraData']['imgFile'] = jQuery(data['articleVotings_userImg']).val();
    data['extraData']['cacheFile'] = jQuery(data['articleVotings_uploadImg']).val();
    data['maxFileSize'] = 1000;
    data['allowedFileTypes'] = ['image'];
    data['allowedFileExtensions'] = ['jpg'];
    data['maxFileCount'] = 1;
    data['overwriteInitial'] = true;
    data['initialPreviewCount'] = 1;
    data['showCaption'] = false;
    data['showRemove'] = false;
    data['showUpload'] = false;
    data['showClose'] = false;
    data['uploadAsync'] = false;
    data['showPreview'] = true;
    data['showBrowse'] = true;    
    
    uploadFileInput.render(data);
    uploadFileInput.init();
};