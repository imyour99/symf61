jQuery(document).ready(function () {
    
    if(jQuery('body.dosage.detail').find('#dosage-form').length > 0) {
        initArticleDosageTinyMce();
        initDosageForm();
    }
    
});

var dosageValidator = null;

initDosageForm = function() {
    
    dosageValidator = jQuery('#dosage-form').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};

initArticleDosageTinyMce = function() {
    
    var selectorIds = '';
    
    jQuery(".articleDosageHtml").each(function() {
        if(selectorIds.length > 0) {
            selectorIds += ', ';
        }
        selectorIds += '#'+ this.id;
    });
    
    tinyMce.render(selectorIds, 650);
    
};