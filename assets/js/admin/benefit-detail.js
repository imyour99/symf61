jQuery(document).ready(function () {
    
    if(jQuery('body.benefit.detail').find('#benefit-form').length > 0) {
        prepareBenefitOptionsSettings(false);
        initBenefitForm();
        initBenefitUpload(true);
    }
    
});


var benefitValidator = null;
var beneifitUpload = null;
var ipBenefit = null;
var ipcBenefit = null;
var isBenefitError = false;

initBenefitForm = function() {
    
    benefitValidator = jQuery('#benefit-form').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};

prepareBenefitOptionsSettings = function(destroyIt) {
    
    if(jQuery('#benefit_id').val()) {
        jQuery('#benefit_imgFile').prop('required',true);
        jQuery('#benefit_cacheFile').prop('required',false);
    } else {
        jQuery('#benefit_imgFile').prop('required',false);
        jQuery('#benefit_cacheFile').prop('required',true);
    }
   
    destroyBenefitValidator(destroyIt);
    
};

destroyBenefitValidator = function(destroyIt)  {
    
    if(destroyIt == true) {       
        benefitValidator.validator('destroy');
        initBenefitForm();
    }
    
};

initBenefitUpload = function(isPreset) {

    var data = {};
    data['uploadId'] = jQuery("#benefit_upload");
    data['isPreset'] = isPreset;
    data['imgFileId'] = '#benefit_imgFile';
    data['cacheFileId'] = '#benefit_cacheFile';  
    data['extraData'] = {};
    data['extraData']['extension'] = 'benefit';
    data['extraData']['filetype'] = 'image';
    data['extraData']['id'] = jQuery('#benefit_id').val();
    data['extraData']['imgFile'] = jQuery(data['imgFileId']).val();
    data['extraData']['cacheFile'] = jQuery(data['cacheFileId']).val();
    data['maxFileSize'] = 1000;
    data['allowedFileTypes'] = ['image'];
    data['allowedFileExtensions'] = ['png'];
    data['maxFileCount'] = 1;
    data['overwriteInitial'] = false;
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