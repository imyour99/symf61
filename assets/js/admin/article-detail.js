jQuery(document).ready(function () {
    
    if(jQuery('body.article.detail').find('.nav-tabs').length > 0) {
    
        initArticleTabEvent();
        
        if(jQuery('body.article.detail').find('#article-tab .nav-item button#article-basic-tab.active').length > 0) {
            initArticleBasic();
        } else if(jQuery('body.article.detail').find('#article-tab .nav-item button#article-language-tab.active').length > 0) {
            initArticleLanguage();
        } else if(jQuery('body.article.detail').find('#article-tab .nav-item button#article-variantlist-tab.active').length > 0) {
            initArticleVariantList();
        } else if(jQuery('body.article.detail').find('#article-tab .nav-item button#article-variant-tab.active').length > 0) {
            initArticleVariant();
        } else if(jQuery('body.article.detail').find('#article-tab .nav-item button#article-media-tab.active').length > 0) {
            initArticleMedias();
        }
        
    }
    
});

initArticleTabEvent = function() {
    
    jQuery('button.nav-link[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {

        switch (e.relatedTarget.id) {
            case 'article-basic-tab':
                articleBasicValidator.validator('destroy');
                break;
            case 'article-language-tab':
                articleLanguageValidator.validator('destroy');
                break;
            case 'article-variantlist-tab':
                break;
            case 'article-variant-tab':
                articleVariantValidator.validator('destroy');
                break;
            case 'article-media-tab':
                destroyArticleMedias();
                break;
        }
        
        switch (e.target.id) {
            case 'article-basic-tab':
                initArticleBasic();
                break;
            case 'article-language-tab':
                initArticleLanguage();
                break;
            case 'article-variantlist-tab':
                initArticleVariantList();
                break;
            case 'article-variant-tab':
                initArticleVariant();
                break;
            case 'article-media-tab':
                initArticleMedias();
                break;
        }
        
    })

};