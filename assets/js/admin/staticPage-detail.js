jQuery(document).ready(function () {

    if(jQuery('body.staticPage.detail').find('#staticPage-form').length > 0) {
        initStaticOptionsSettings(false);
        initStaticPageShopResource();
        initStaticPageForm();
        initStaticPageUpload(true);    
        initStaticPageBannerTinyMce();
        initStaticPageTextTinyMce();
    }

});

initStaticPageShopResource = function() {
    jQuery('#staticPage_shopResource').multiSelect({
        selectableHeader: '<label for="staticPage_shopResource">Shop-Auswahl:</label>',
        selectionHeader: '<label >zugewiesene Shop(s):</label>',
    });
};

var staticPageValidator = null;

initStaticPageForm = function() {

    staticPageValidator = jQuery('#staticPage-form').validator({
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }
    });

};

initStaticPageBannerTinyMce = function() {  
    tinyMce.render('textarea#staticPage_banner', 600);
};

initStaticPageTextTinyMce = function() {
    tinyMce.render('textarea#staticPage_html', 1200);
};

initStaticOptionsSettings = function(destroyIt) {

    jQuery('#staticPage_pageAlias').prop('required',true);
    jQuery('#staticPage_imgFile').prop('required',false);
    jQuery('#staticPage_cacheFile').prop('required',false);
        
    destroyStaticPageValidator(destroyIt);

};

destroyStaticPageValidator = function(destroyIt)  {

    if(destroyIt == true) {
        staticPageValidator.validator('destroy');
        initStaticPageForm();
    }

};

initStaticPageUpload = function(isPreset) {
    
    var data = {};
    data['uploadId'] = jQuery("#staticPage_upload");
    data['isPreset'] = isPreset;
    data['imgFileId'] = '#staticPage_imgFile';
    data['cacheFileId'] = '#staticPage_cacheFile';  
    data['extraData'] = {};
    data['extraData']['extension'] = 'staticPage';
    data['extraData']['filetype'] = 'image';
    data['extraData']['id'] = jQuery('#staticPage_id').val();
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