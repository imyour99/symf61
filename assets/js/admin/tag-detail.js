jQuery(document).ready(function () {
    
    if(jQuery('body.tag.detail').find('#tag-form').length > 0) {
        initTagForm();
        addTagOptionEvent();
        deleteTagOptionEvent();    
    }
    
});

var tagValidator = null;

initTagForm = function() {
    
    tagValidator = jQuery('#tag-form').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};


destroyTagValidator = function()  {
    
    tagValidator.validator('destroy');
    initTagForm();

};



deleteTagOptionEvent = function() {

    jQuery('.btnArticleTagOptionsDelete').unbind('click').bind('click', function(e) {  
        var counter = parseInt(jQuery(this).attr("id").replace(/tag_articleTagOptions_delete_/, ''));     
        jQuery('#tag_articleTagOptions_'+counter).remove();
        destroyTagValidator();
    });
    
};

addTagOptionEvent = function() {

    jQuery('#tagArticleTagOptionsAdd').unbind('click').bind('click', function(e) {  
        addTagOption();
        destroyTagValidator();
        deleteTagOptionEvent();
    });
    
};

addTagOption = function() {
    
    var counter = jQuery('#articleTagOptions-field-list').children().length;
   
    var newOption = '';
    newOption +='<div id="tag_articleTagOptions___name__" class="articleTagOption" >';
    
    newOption +='<div class="form-row">';  
    
    
    newOption +='<div class="form-group col-md-2 col-sm-2 col-2 has-feedback"><label for="tag_articleTagOptions___name___title">interner Titel</label><div class="input-group">';
    newOption +='<input type="text" id="tag_articleTagOptions___name___title" name="tag[articleTagOptions][__name__][title]" required="required" class="form-control" maxlength="60" minlength="5" />'; 
    newOption +='<span class="fas form-control-feedback" aria-hidden="true"></span></div><div class="help-block with-errors"></div></div>';
    
    newOption +='<div class="form-group col-md-3 col-sm-3 col-3 has-feedback"><label for="tag_articleTagOptions___name___titleTranslation">Übersetzung</label><div class="input-group">';
    newOption +='<input type="text" id="tag_articleTagOptions___name___titleTranslation" name="tag[articleTagOptions][__name__][titleTranslation]" required="required" class="form-control" maxlength="60" minlength="5" />';
    newOption +='<span class="fas form-control-feedback" aria-hidden="true"></span></div><div class="help-block with-errors"></div></div>';
    
    newOption +='<div class="form-group col-md-3 col-sm-3 col-3 has-feedback"><label for="tag_articleTagOptions___name___urlAlias">Url</label><div class="input-group">';
    newOption +='<input type="text" id="tag_articleTagOptions___name___urlAlias" name="tag[articleTagOptions][__name__][urlAlias]" required="required" class="form-control" maxlength="60" minlength="5" pattern="^([a-zA-Z0-9])+" data-error="Es sind keine Leerzeichen und Sonderzeichen erlaubt, jede Tag URL muss eindeutig sein!" data-remote="/admin/tag/identifyUrl?tag[id]=" />';
    newOption +='<span class="fas form-control-feedback" aria-hidden="true"></span></div><div class="help-block with-errors"></div></div>';
    
    newOption +='<div class="form-group col-md-2 col-sm-2 col-2 has-feedback" ><label for="tag_articleTagOptions___name___score">Position</label><div class="input-group">';
    newOption +='<input type="number" id="tag_articleTagOptions___name___score" name="tag[articleTagOptions][__name__][score]" required="required" class="form-control" />';
    newOption +='<span class="fas form-control-feedback" aria-hidden="true"></span></div><div class="help-block with-errors"></div></div>';
    
    newOption +='<div class="col-md-2 col-sm-2 col-2"><label>&nbsp;</label><div class="input-group"><button type="button" class="btn btn-danger btn-iconLeft btnArticleTagOptionsDelete" id="tag_articleTagOptions_delete___name__"><i class="fas fa-trash"></i>entfernen</button></div></div>';

    newOption +='</div>';
    newOption +='</div>';
    
    newOption = newOption.replace(/__name__/g, counter);
    
    jQuery( "#articleTagOptions-field-list" ).append(newOption);
    
};