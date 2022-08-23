jQuery(document).ready(function () {
    
    if(jQuery('body.howto.detail').find('#howto-form').length > 0) {
        prepareHowtoOptionsSettings(false);
        initHowtoForm();
        initHowtoUpload(true);
    }
    
});

var howtoValidator = null;

initHowtoForm = function() {
    
    howtoValidator = jQuery('#howto-form').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};

prepareHowtoOptionsSettings = function(destroyIt) {
    
    if(jQuery('#howto_id').val()) {
        jQuery('#howto_imgFile').prop('required',true);
        jQuery('#howto_cacheFile').prop('required',false);
    } else {
        jQuery('#howto_imgFile').prop('required',false);
        jQuery('#howto_cacheFile').prop('required',true);
    }
   
    destroyHowtoValidator(destroyIt);
    
};

destroyHowtoValidator = function(destroyIt)  {
    
    if(destroyIt == true) {       
        howtoValidator.validator('destroy');
        initHowtoForm();
    }
    
};

initHowtoUpload = function(isPreset) {
    
    var data = {};
    data['uploadId'] = jQuery("#howto_upload");
    data['isPreset'] = isPreset;
    data['imgFileId'] = '#howto_imgFile';
    data['cacheFileId'] = '#howto_cacheFile';  
    data['extraData'] = {};
    data['extraData']['extension'] = 'howto';
    data['extraData']['filetype'] = 'image';
    data['extraData']['id'] = jQuery('#howto_id').val();
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

/*
initHowtoUpload = function(isPreset) {
    
    howtoUpload.fileinput({
        
        theme: 'fas',
        language: "de",
        initialPreview: ipHowto,
        initialPreviewConfig: ipcHowto,
        maxFileSize: 3000,
        allowedFileTypes: ['image'],
        allowedFileExtensions: ["png"],  
        //showUpload: false, // hide upload button
        showRemove: false, // hide remove button
        overwriteInitial: false,
        browseClass: "btn btn-dark",
        uploadClass: "btn btn-dark",
        initialPreviewCount: 1,
        showPreview: true,
        uploadUrl: howtoUpload.data("uploadurl"), // server upload action
        uploadAsync: false,
        maxFileCount: 1,
        uploadExtraData: data,
        fileActionSettings : {
            showUpload : false  // Disable
        },
        previewSettings: {
            image: {    
                width: "150px", 
                height: "150px" 
            }
        },
        deleteExtraData: {
            filetype: data.filetype,
            extension: data.extension,
            id: jQuery('#howto_id').val(),
            cacheFile: jQuery('#howto_cacheFile').val(),
            imgFile: jQuery('#howto_imgFile').val()
        }
    }).on("filebatchselected", function(event, files) {   
        jQuery("#howto_upload").fileinput("upload");
        //jQuery(".fileinput-upload").trigger( "click" );
        //jQuery(".fileinput-upload-button").trigger( "click" );
        
    }).on('fileuploaded', function(e, params) {

    }).on('filebatchuploaderror', function(event, data, msg) {
        
        isHowtoError = true;
    }).on('filebatchuploadsuccess', function(event, data) {       
        
        getHowtoResponse(data);
        
    }).on('filebatchuploadcomplete', function(event, files, extra) {    
        
        if (isHowtoError === false) {
            destroyUploadBenefit();
        }       
        
    }).on('filedeleted', function(event, key, data) {        
        
         if(typeof data === 'object') {                         
            if(typeof data.responseJSON === 'object') {      
                if(data.responseJSON.return !== undefined) { 
                    if(data.responseJSON.return.deleteFile !== undefined && data.responseJSON.return.deleteFile === true) {
                        
                        ipHowto = [];
                        ipcHowto = [];
                        
                        if(jQuery('#howto_cacheFile').val()) {
                            jQuery('#howto_cacheFile').val('').trigger('blur');
                        } else {
                            jQuery('#howto_imgFile').val('').trigger('blur');
                        }
                        
                        destroyUploadHowto();
                        
                    } 
                }
            }
        } 
        
    });
     
};

getHowtoResponse = function(data) {
    
    if(typeof data.jqXHR === 'object') {    
        if(typeof data.jqXHR.responseJSON === 'object') {     

            if(data.jqXHR.responseJSON.error === undefined) { 
                isHowtoError = false;
            }

            if(data.jqXHR.responseJSON.return !== undefined && isHowtoError === false ) { 
                preparePresetHowto(data.jqXHR.responseJSON.return);
            }
       }
    }
    
};

preparePresetHowto = function(data) { 
    
    ipHowto = [];
    ipcHowto = [];
    
    if(data.initialPreview !== undefined && jQuery.isArray(data.initialPreview)) {   
        ipHowto = data.initialPreview;
    }
    
    if(data.initialPreviewConfig !== undefined && jQuery.isArray(data.initialPreviewConfig)) {   
        ipcHowto = data.initialPreviewConfig;
    }
    
    if(data.cacheFile !== undefined && data.cacheFile) { 
        jQuery('#howto_cacheFile').val(data.cacheFile).trigger('blur');
    }
    
    if(data.imageFile !== undefined && data.imageFile) { 
        jQuery('#howto_imgFile').val(data.imageFile).trigger('blur');
    }
    
};

destroyUploadHowto = function() {   
    howtoUpload.fileinput('clear');
    howtoUpload.fileinput('reset');
    howtoUpload.fileinput('destroy');
    initHowtoUpload(false);
};
*/