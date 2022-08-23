initArticleLanguage = function() {
    
    prepareArticleLanguageSettings(false);
    initArticleLanguageForm();  
    initArticleLanguageEvent();
    initArticleLanguagetinyMce();
    
};

prepareArticleLanguageSettings = function(destroyIt) { 
    destroyArticleLanguageValidator(destroyIt);
};

destroyArticleLanguageValidator = function(destroyIt)  {
    if(destroyIt == true) {       
        articleLanguageValidator.validator('destroy');
        initArticleLanguageForm();
    }
};

initArticleLanguageForm = function() { 
    articleLanguageValidator = jQuery('#article-language-form').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
};

initArticleLanguageEvent = function() {
    
    jQuery('#articleLanguage_language').unbind('change').bind('change', function(e) {  
        var language = jQuery(this).val();
        
        var url = jQuery(this).data("languagereloadurl");
        var newUrl = url.replace(/LG/, language);
        
        window.location = newUrl;
        
    });
};

initArticleLanguagetinyMce = function() {
    tinyMce.render('textarea#articleLanguage_description, textarea#articleLanguage_ingredients', 400);
};
