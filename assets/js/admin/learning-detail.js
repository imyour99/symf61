jQuery(document).ready(function () {
    
    if(jQuery('body.learning.detail').find('#learning-form').length > 0) {
        prepareLearningOptionsSettings(false);
        initLearningForm();
        initLearningUpload(true);
    }
    
});


var learningValidator = null;
var beneifitUpload = null;
var ipLearning = null;
var ipcLearning = null;
var isLearningError = false;

initLearningForm = function() {
    
    learningValidator = jQuery('#learning-form').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};

prepareLearningOptionsSettings = function(destroyIt) {
    
    if(jQuery('#learning_id').val()) {
        jQuery('#learning_imgFile').prop('required',true);
        jQuery('#learning_cacheFile').prop('required',false);
    } else {
        jQuery('#learning_imgFile').prop('required',false);
        jQuery('#learning_cacheFile').prop('required',true);
    }
   
    destroyLearningValidator(destroyIt);
    
};

destroyLearningValidator = function(destroyIt)  {
    
    if(destroyIt == true) {       
        learningValidator.validator('destroy');
        initLearningForm();
    }
    
};

initLearningUpload = function(isPreset) {

    var data = {};
    data['uploadId'] = jQuery("#learning_upload");
    data['isPreset'] = isPreset;
    data['imgFileId'] = '#learning_imgFile';
    data['cacheFileId'] = '#learning_cacheFile';  
    data['extraData'] = {};
    data['extraData']['extension'] = 'learning';
    data['extraData']['filetype'] = 'image';
    data['extraData']['id'] = jQuery('#learning_id').val();
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