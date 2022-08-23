/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery(document).ready(function () {

    if(jQuery('body.banner.detail').find('#banner-form').length > 0) {
        
        initBannerUpload(true);
        initBannerShopResource();
        
        prepareBannerSettings(false);
        initBannerForm();
        eventBannerForm();
        
    }

});

initBannerForm = function() {

    bannerValidator = jQuery('#banner-form').validator({
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }
    });

};

prepareBannerSettings = function(destroyIt) {
    
    if(jQuery("#banner_location").val() === 'homeTop') {   
        
        jQuery(jQuery("#banner_location")).prop('disabled', true);
        jQuery('#banner_hiddenLocation').val(jQuery("#banner_location").val());
        
        uploadFileInput.refreshExtension(0,getBannerExtension());
        uploadFileInput.enable(0);  
        
        jQuery('#banner_label').text('Bild Upload(1400px * 470px, jpg)');
        jQuery('#banner_callToActionClass').prop('disabled', false);
        jQuery('#banner_headlineClass').prop('disabled', false);
        jQuery('#banner_infoClass').prop('disabled', false);
        jQuery('#isAimLinkBlank').prop('disabled', false);
        jQuery('#banner_callToActionClass').find(':disabled').prop('disabled', false);
        jQuery('#banner_headlineClass').find(':disabled').prop('disabled', false);
        jQuery('#banner_infoClass').find(':disabled').prop('disabled', false);
        jQuery('#isAimLinkBlank').find(':disabled').prop('disabled', false);
            
    } else if((jQuery("#banner_location").val() === 'homeMiddle') || (jQuery("#banner_location").val() === 'homeBottom')) {  
        
        jQuery(jQuery("#banner_location")).prop('disabled', true);
        jQuery('#banner_hiddenLocation').val(jQuery("#banner_location").val());
        
        uploadFileInput.refreshExtension(0,getBannerExtension());
        uploadFileInput.enable(0);
        
        if (jQuery("#banner_location").val() === 'homeMiddle') {
            jQuery('#banner_label').text('Bild Upload(900px * 758px, jpg)');
        } else if(jQuery("#banner_location").val() === 'homeBottom') {  
            jQuery('#banner_label').text('Bild Upload(1170px * 295px, jpg)');
        }
        
        jQuery('#banner_callToActionClass').prop('disabled', true);
        jQuery('#banner_headlineClass').prop('disabled', true);
        jQuery('#banner_infoClass').prop('disabled', true);
        jQuery('#isAimLinkBlank').prop('disabled', true);
        jQuery('#banner_callToActionClass').find(':disabled').prop('disabled', true);
        jQuery('#banner_infoClass').find(':disabled').prop('disabled', true);
        jQuery('#banner_headlineClass').find(':disabled').prop('disabled', true);
        jQuery('#isAimLinkBlank').find(':disabled').prop('disabled', true);
        
        
    } else {
        jQuery(jQuery("#banner_location")).prop('disabled', false);
        uploadFileInput.disable(0);
        
        jQuery('#banner_callToActionClass').prop('disabled', true);
        jQuery('#banner_headlineClass').prop('disabled', true);
        jQuery('#banner_infoClass').prop('disabled', true);
        jQuery('#isAimLinkBlank').prop('disabled', true);
        jQuery('#banner_callToActionClass').find(':disabled').prop('disabled', true);
        jQuery('#banner_infoClass').find(':disabled').prop('disabled', true);
        jQuery('#banner_headlineClass').find(':disabled').prop('disabled', true);
        jQuery('#isAimLinkBlank').find(':disabled').prop('disabled', true);
    }
    
    if(jQuery('#banner_id').val()) {
        jQuery('#banner_image').prop('required',true);
        jQuery('#banner_cacheFile').prop('required',false);
    } else {
        jQuery('#banner_image').prop('required',false);
        jQuery('#banner_cacheFile').prop('required',true);
    }
    
    destroyBannerValidator(destroyIt);

};

getBannerExtension = function() {
    return(jQuery('#banner_location').val() + 'Banner');  
};

eventBannerForm = function() {
    
    jQuery('#banner_location').unbind('change').bind('change', function(e) {  
        prepareBannerSettings(true);
    });
    
};

destroyBannerValidator = function(destroyIt)  {

    if(destroyIt == true) {
        bannerValidator.validator('destroy');
        initBannerForm();
    }

};

initBannerShopResource = function() {
    jQuery('#banner_shopResource').multiSelect({
        selectableHeader: '<label for="banner_shopResource">Shop-Auswahl:</label>',
        selectionHeader: '<label >zugewiesene Shop(s):</label>',
    });
};

initBannerUpload = function(isPreset) {
    
    var bannerExtension = null;
    if(getBannerExtension()) {
        bannerExtension = getBannerExtension();
    }
    
    var data = {};
    data['uploadId'] = jQuery("#banner_upload");
    data['isPreset'] = isPreset;
    data['imgFileId'] = '#banner_image';
    data['cacheFileId'] = '#banner_cacheFile';  
    data['extraData'] = {};
    data['extraData']['extension'] = bannerExtension;
    data['extraData']['filetype'] = 'image';
    data['extraData']['id'] = jQuery('#banner_id').val();
    data['extraData']['imgFile'] = jQuery(data['imgFileId']).val();
    data['extraData']['cacheFile'] = jQuery(data['cacheFileId']).val();
    data['maxFileSize'] = 1000;
    data['allowedFileTypes'] = ['image'];
    data['allowedFileExtensions'] = ['jpg'];
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