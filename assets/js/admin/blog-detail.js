var uploadElement = null;
var extension = null;

jQuery(document).ready(function () {
    
    if(jQuery('body.blog.detail').find('#blog-form').length > 0) {
        prepareBlogOptionsSettings(false);
        initBlogLanguagetinyMce();
        initBlogForm();
        initBlogShopResource();
        initBlogUpload(true);
        initBlogDatePicker();
        initArticleCombineResourceSelected();
        initBlogLanguageEvent();
    }

});

initBlogLanguageEvent = function() {

    jQuery('#blog_blogLanguages_0_language').unbind('change').bind('change', function(e) {
        if(jQuery('#blog_id').val()) {
            var language = jQuery(this).val();
            var url = jQuery(this).data("languagereloadurl");
            var newUrl = url.replace(/LG/, language);

            window.location = newUrl;
        }

    });
};

initBlogLanguagetinyMce = function() {  
    tinyMce.render('textarea#blog_blogLanguages_0_description', 1200);
};

initArticleCombineResourceSelected = function() {

    var val = jQuery("#blog_articleResourceOrder").val().split(',');
    jQuery.each(val, function(key, id) {
        jQuery('#blog_articleResource').multiSelect('select', id);
    });

};

initBlogDatePicker = function() {
    jQuery.datetimepicker.setLocale('de');
    jQuery('#blog_dateOfCreation').datetimepicker({
        timepicker: false,
        format: 'd.m.Y',
        debug: true
    });
};

initBlogShopResource = function() {
    jQuery('#blog_shopResource').multiSelect({
        selectableHeader: '<label for="blog_shopResource">Shop-Auswahl:</label>',
        selectionHeader: '<label >zugewiesene Shop(s):</label>',
    });

    jQuery('#blog_articleResource').multiSelect({
        keepOrder: true ,
        selectableHeader: '<label for="blog_articleResource">Artikel-Auswahl:</label>',
        selectionHeader: '<label >zugewiesene Artikel:</label>',
        afterSelect: function(values, text){

            jQuery('#blog_articleResource option[value="'+values+'"]').remove();
            jQuery('#blog_articleResource').append(jQuery("<option></option>").attr("value",values).attr('selected', 'selected'));

        },
        afterDeselect: function(values, text){

            jQuery('#blog_articleResource option[value="'+values+'"]').removeAttr('selected');

            var _self = this;

            if (this.$element.val() && this.$element.val().length <= 4 ){
                var selectables = this.$container.find('.ms-elem-selectable');
                selectables.removeClass(_self.options.disabledClass);
            }
        }
    });

};

var blogValidator = null;

initBlogForm = function() {
    
    blogValidator = jQuery('#blog-form').validator({
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};

prepareBlogOptionsSettings = function(destroyIt) {

    if(jQuery('#blog_id').val()) {
        jQuery('#blog_imageList').prop('required',true);
        jQuery('#blog_imageListCacheFile').prop('required',false);
        jQuery('#blog_imageDetail').prop('required',true);
        jQuery('#blog_imageDetailCacheFile').prop('required',false);

    } else {
        jQuery('#blog_imageList').prop('required',false);
        jQuery('#blog_imageListCacheFile').prop('required',true);
        jQuery('#blog_imageDetail').prop('required',false);
        jQuery('#blog_imageDetailCacheFile').prop('required',true);
        initBlogForm();
    }

    destroyBlogValidator(destroyIt);

};

destroyBlogValidator = function(destroyIt)  {

    if(destroyIt == true) {
        blogValidator.validator('destroy');
        initBlogForm();
    }

};

initBlogUpload = function(isPreset) {
    
    var data = {};
    data['uploadId'] = jQuery("#blog_list_upload");
    data['isPreset'] = isPreset;
    data['imgFileId'] = '#blog_imageList';
    data['cacheFileId'] = '#blog_imageListCacheFile'; 
    data['extraData'] = {};
    data['extraData']['extension'] = 'blogList';
    data['extraData']['filetype'] = 'image';
    data['extraData']['id'] = jQuery('#blog_id').val();
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
    
    var data = {};
    data['uploadId'] = jQuery("#blog_detail_upload");
    data['isPreset'] = isPreset;
    data['imgFileId'] = '#blog_imageDetail';
    data['cacheFileId'] = '#blog_imageDetailCacheFile';
    data['extraData'] = {};
    data['extraData']['extension'] = 'blogDetail';
    data['extraData']['filetype'] = 'image';
    data['extraData']['id'] = jQuery('#blog_id').val();
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