jQuery(document).ready(function () {
    
    if(jQuery('body.articleFaq.detail').find('#articleFaq-form').length > 0) {
        initArticleFaqForm();
    }
    
});

var dosageValidator = null;

initArticleFaqForm = function() {
    
    dosageValidator = jQuery('#articleFaq-form').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};