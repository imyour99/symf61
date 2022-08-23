
initArticleMedias = function() {
    
    initArticleMediaFilinput();
    
};


initArticleMediaFilinput = function() {
    
    jQuery(".articleMediaUpload").each(function() {
        
        var articlecombineid = null;
        var data = {};     
        data['uploadId'] = jQuery("#" + jQuery(this).attr("id"));
        data['isPreset'] = true;       
        data['imgFileId'] = '';
        data['cacheFileId'] = ''; 
        
        if(data['uploadId'].data("articlecombineid") !== undefined) { 
            var articlecombineid = data['uploadId'].data("articlecombineid");
        }
        
        data['extraData'] = {};
        data['extraData']['extension'] = 'article';
        data['extraData']['filetype'] = 'image';
        data['extraData']['id'] = jQuery('#' + jQuery(this).attr("id") ).data("articleid");  
        data['extraData']['imgFile'] = '';
        data['extraData']['cacheFile'] = '';
        
        data['sortData'] = {};
        data['sortData']['filetype'] = data['extraData']['filetype'];
        data['sortData']['extension'] = data['extraData']['extension'];
        data['sortData']['id'] = data['uploadId'].data("articleid");
        data['sortData']['items'] = '';
        
        if(articlecombineid) { 
            data['extraData']['id2'] = articlecombineid;
            data['sortData']['id2'] = articlecombineid;
        }
        
        data['maxFileSize'] = 1000;
        data['allowedFileTypes'] = ['image'];
        data['allowedFileExtensions'] = ['jpg'];
        data['maxFileCount'] = 10;
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
    
    });
    
    uploadFileInput.init();
    
};

destroyArticleMedias = function() {
    
    var index = 0;
    jQuery(".articleMediaUpload").each(function() { 
        destroyUpload(index);
        index++;
    });

};  
