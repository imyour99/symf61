
let datas = [];

exports.render = function (configData) { 
    configData['uploadError'] = false;
    configData['initialPreview'] = false;
    configData['initialPreviewConfig'] = false;
    configData['isUploading'] = false;
    configData['upload'] = null;
    datas.push(configData);
};

exports.init = function () {    
    jQuery.each(datas, function(key, data) {
        initUpload(key);
    });  
};

exports.disable = function (key) {
    datas[key]['upload'].fileinput('disable');
};

exports.enable = function (key) {
    datas[key]['upload'].fileinput('enable');
};

exports.refreshExtension = function (key,extension) {
    datas[key]['extraData']['extension'] = extension;
    destroyUpload(key);
    initUpload(key);
};

initUpload = function(key) {
    
    datas[key]['upload'] = datas[key]['uploadId'];
    
    if(datas[key]['isPreset'] == true) {
         datas[key]['initialPreview'] = datas[key]['upload'].data("ip");
         datas[key]['initialPreviewConfig'] = datas[key]['upload'].data("ipc");
    }
    
    datas[key]['upload'].fileinput({
        theme: 'fas',
        language: "de",
        browseClass: "btn btn-dark",
        uploadClass: "btn btn-dark",
        fileActionSettings : {
            showUpload : false
        },
        previewSettings: {
            image: { width: "auto", height: "auto", 'max-width': "100%", 'max-height': "100%" }
        },
        initialPreview: datas[key]['initialPreview'],
        initialPreviewConfig: datas[key]['initialPreviewConfig'],
        maxFileSize: datas[key]['maxFileSize'],
        allowedFileTypes: datas[key]['allowedFileTypes'],
        allowedFileExtensions: datas[key]['allowedFileExtensions'],
        uploadUrl: datas[key]['upload'].data("uploadurl"), // server upload action
        maxFileCount: datas[key]['maxFileCount'],
        uploadExtraData: datas[key]['extraData'],
        deleteExtraData: {
            filetype: datas[key]['extraData']['filetype'],
            extension: datas[key]['extraData']['extension'],
            id: datas[key]['extraData']['id'],
            id2: function() { 
                if(datas[key]['extraData']['id2']  !== undefined) {
                    return(datas[key]['extraData']['id2']);
                }
                return null;
            },
            imgFile: function() { 
                if(jQuery(datas[key]['imgFileId']).val()  !== undefined) {
                    return(jQuery(datas[key]['imgFileId']).val());
                }
                return null;
            },
            cacheFile: function() { 
                if(jQuery(datas[key]['cacheFileId']).val()  !== undefined) {
                    return(jQuery(datas[key]['cacheFileId']).val());
                }
                return null;
            }
        },
        overwriteInitial: datas[key]['overwriteInitial'],
        initialPreviewCount: datas[key]['initialPreviewCount'],
        showCaption: datas[key]['showCaption'],
        showRemove: datas[key]['showRemove'],
        showUpload: datas[key]['showUpload'],
        showPreview: datas[key]['showPreview'],  
        showClose: datas[key]['showClose'],  
        showBrowse: datas[key]['showBrowse'],
        uploadAsync: datas[key]['uploadAsync'],
    }).on('filebatchuploaderror', function(event, value, msg) {
        datas[key]['uploadError'] = true;
    }).on("filebatchselected", function(event, files) {   
        if (datas[key]['isUploading'] === false) {   
            datas[key]['isUploading'] = true;
            jQuery(this).fileinput("upload");      
        }
    }).on('filebatchuploadsuccess', function(event, value) {
        getResponse(key,value);
    }).on('filebatchuploadcomplete', function(event, preview, config, tags, extraData) {
        if (datas[key]['uploadError'] === false) {
            datas[key]['isUploading'] = false;
            destroyUpload(key);
            initUpload(key);
        }
    }).on('filedeleted', function(event, index, value) {

        if(typeof value === 'object') {
            if(typeof value.responseJSON === 'object') {
                if(value.responseJSON.return !== undefined) {
                    if(value.responseJSON.return.deleteFile !== undefined && value.responseJSON.return.deleteFile === true) {
                        
                        datas[key]['initialPreview'] = [];
                        datas[key]['initialPreviewConfig'] = [];
                        
                        if(datas[key]['maxFileCount'] > 1) {
                            
                            if(value.responseJSON.return.initialPreview !== undefined && jQuery.isArray(value.responseJSON.return.initialPreview)) {   
                                datas[key]['initialPreview'] = value.responseJSON.return.initialPreview;
                                datas[key]['upload'].attr("data-ip", JSON.stringify(datas[key]['initialPreview']));
                            }

                            if(value.responseJSON.return.initialPreviewConfig !== undefined && jQuery.isArray(value.responseJSON.return.initialPreviewConfig)) {   
                                datas[key]['initialPreviewConfig'] = value.responseJSON.return.initialPreviewConfig;
                                datas[key]['upload'].attr("data-ipc", JSON.stringify(datas[key]['initialPreviewConfig']));
                            }

                            destroyUpload(key);
                            initUpload(key);
                            
                        } else {
                            
                            if(jQuery(datas[key]['cacheFileId']).val()) {
                                jQuery(datas[key]['cacheFileId']).val('').trigger('blur');
                            } else {
                                jQuery(datas[key]['imgFileId']).val('').trigger('blur');
                            }
                            
                            destroyUpload(key);
                            initUpload(key);
                            
                        }
                        

                    }
                }
            }
        }

    }).on('filesorted', function(event, params) {     
        
        if(datas[key]['upload'].data("articlesorturl") !== undefined) { 
            
            var sortList = '';

            jQuery.each(params.stack, function(key, item) {
                if(sortList) {  sortList += '-'; }
                sortList += item.key; 
            });
            
            if(sortList) {
            
                var data = {};
                
                datas[key]['sortData']['items'] = sortList;
                data = datas[key]['sortData'];
                
                jQuery.ajax({
                    type: 'POST',
                    url: datas[key]['upload'].data("articlesorturl"),
                    data: data,
                    success: function (response) {               
                        if(typeof response === 'object') {     

                        }
                    }
                });

            }
        
        }
              
    });
};

getResponse = function(key, value) {
    
    if(typeof value.jqXHR === 'object') {
        if(typeof value.jqXHR.responseJSON === 'object') {

            if(value.jqXHR.responseJSON.error === undefined) {
                datas[key]['uploadError'] = false;
            }

            if(value.jqXHR.responseJSON.return !== undefined && datas[key]['uploadError'] === false ) {
                preparePreset(key, value.jqXHR.responseJSON.return);
            }
        }
    }

};

preparePreset = function(key, value) {
    
    datas[key]['initialPreview'] = [];
    datas[key]['initialPreviewConfig'] = [];
         
    if(value.initialPreview !== undefined && jQuery.isArray(value.initialPreview)) {
        datas[key]['initialPreview'] = value.initialPreview;
    }

    if(value.initialPreviewConfig !== undefined && jQuery.isArray(value.initialPreviewConfig)) {
        datas[key]['initialPreviewConfig'] = value.initialPreviewConfig;
    }

    if(value.cacheFile !== undefined && value.cacheFile) {
        jQuery(datas[key]['cacheFileId']).val(value.cacheFile).trigger('blur');
    }

    if(value.imgFile !== undefined && value.imgFile) {
        jQuery(datas[key]['imgFileId']).val(value.imgFile).trigger('blur');
    }

};

destroyUpload = function(key) {
    datas[key]['isPreset'] = false;
    datas[key]['upload'].fileinput('clear');
    datas[key]['upload'].fileinput('reset');
    datas[key]['upload'].fileinput('destroy');
};