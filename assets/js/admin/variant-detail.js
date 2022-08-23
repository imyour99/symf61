jQuery(document).ready(function () {
    
    if(jQuery('body.variant.detail').find('#variant-form').length > 0) {       
        prepareVariantOptionsSettings(false);
        initVariantForm();
        initVariantOptionEvent();
        addVariantOptionEvent();
        deleteVariantOptionEvent();    
        initUnityValueDatePicker('.dateTimeUnityValue');
    }
    
});

var variantValidator = null;

initVariantForm = function() {
    
    variantValidator = jQuery('#variant-form').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};

prepareVariantOptionsSettings = function(destroyIt) {
    
    jQuery('input:checkbox.isTranlation').each(function(key, value) {
            
        var translationIsChecked = false;
        if (jQuery(this).prop('checked')) {
            translationIsChecked = true;
        } 

        var counter = parseInt(jQuery(this).attr("id").replace(/variant_articleVariantOptions_/, ''));
        
        if(translationIsChecked == true) {

            jQuery('#variant_articleVariantOptions_'+ counter +'_unityValue').prop('required',false).val('').prop('disabled', true);
            jQuery('#variant_articleVariantOptions_'+ counter +'_titleTranslation').prop('required',true).prop('disabled', false);
            jQuery('#variant_articleVariantOptions_'+ counter +'_isRequest').prop('required',false).prop('disabled', false);
            
        } else {

            jQuery('#variant_articleVariantOptions_'+ counter +'_unityValue').prop('required',true).prop('disabled', false);
            jQuery('#variant_articleVariantOptions_'+ counter +'_titleTranslation').prop('required',false).val('').prop('disabled', true);
            jQuery('#variant_articleVariantOptions_'+ counter +'_isRequest').prop('required',false).prop('disabled', true);
        }
                 
    });
    
    destroyVariantValidator(destroyIt);
    
};

destroyVariantValidator = function(destroyIt)  {
    
    if(destroyIt == true) {       
        variantValidator.validator('destroy');
        initVariantForm();
    }
    
};


initVariantOptionEvent = function() {
    
    jQuery('input:checkbox.isTranlation').unbind('change').bind('change', function(e) {  
        prepareVariantOptionsSettings(true);
    });
    
};

deleteVariantOptionEvent = function() {

    jQuery('.btnArticleVariantOptionsDelete').unbind('click').bind('click', function(e) {  
        var counter = parseInt(jQuery(this).attr("id").replace(/variant_articleVariantOptions_delete_/, ''));     
        jQuery('#variant_articleVariantOptions_'+counter).remove();
        prepareVariantOptionsSettings(true);
    });
    
};

addVariantOptionEvent = function() {

    jQuery('#variantArticleVariantOptionsAdd').unbind('click').bind('click', function(e) {  
        addVariantOption();
        prepareVariantOptionsSettings(true);
        initVariantOptionEvent();
        deleteVariantOptionEvent();
    });
    
};

addVariantOption = function() {
    
    var counter = jQuery('#articleVariantOptions-field-list').children().length;
   
    var newOption = '';
    newOption +='<div id="variant_articleVariantOptions___name__" class="articleVariantOption" >';
    newOption +='<div class="form-row">';  
    newOption +='<div class="form-group col-md-3 col-sm-3 col-3 has-feedback"><label for="variant_articleVariantOptions___name___title">interner Titel</label><div class="input-group">';
    newOption +='<input type="text" id="variant_articleVariantOptions___name___title" name="variant[articleVariantOptions][__name__][title]" required="required" class="form-control" maxlength="60" minlength="5" />'; 
    newOption +='<span class="fas form-control-feedback" aria-hidden="true"></span></div><div class="help-block with-errors"></div></div>';
    //newOption +='<div class="form-group col-md-3 col-sm-3 col-3 has-feedback"><label for="variant_articleVariantOptions___name___unityValue">Option Zahlenwert</label><div class="input-group">';  
    //newOption +='<input type="number" id="variant_articleVariantOptions___name___unityValue" name="variant[articleVariantOptions][__name__][unityValue]" required="required" pattern="^\d+?$" data-error="Zahlen Wert ungültig!" class="form-control" />';                                             
    newOption +='<div class="form-group col-md-3 col-sm-3 col-3 has-feedback"><label for="variant_articleVariantOptions___name___unityValue">Option Datum</label><div class="input-group">';  
    newOption +='<input type="text" id="variant_articleVariantOptions___name___unityValue" name="variant[articleVariantOptions][__name__][unityValue]" required="required" pattern="(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}" data-error="Datum ungültig!" class="form-control dateTimeUnityValue" />';                                             
    newOption +='<span class="fas form-control-feedback" aria-hidden="true"></span></div><div class="help-block with-errors"></div></div>';
    newOption +='<div class="form-group col-md-2 col-sm-2 col-2 has-feedback" ><label for="variant_articleVariantOptions___name___score">Position</label><div class="input-group">';
    newOption +='<input type="number" id="variant_articleVariantOptions___name___score" name="variant[articleVariantOptions][__name__][score]" required="required" min="10" step="10" class="form-control" />';
    newOption +='<span class="fas form-control-feedback" aria-hidden="true"></span></div><div class="help-block with-errors"></div></div>';
    newOption +='<div class="offset-md-1 offset-sm-1 offset-1 col-md-3 col-sm-3 col-3"><label>&nbsp;</label><div class="input-group"><button type="button" class="btn btn-danger btn-iconLeft btnArticleVariantOptionsDelete" id="variant_articleVariantOptions_delete___name__"><i class="fas fa-trash"></i>entfernen</button></div></div>';
    newOption +='</div>';
    newOption +='<div class="form-row">';
    newOption +='<div class="form-group col-md-4 col-sm-4 col-4 has-feedback"><label for="variant_articleVariantOptions___name___titleTranslation">Option Platzhalter Übersetzung</label><div class="input-group">';
    newOption +='<input type="text" id="variant_articleVariantOptions___name___titleTranslation" name="variant[articleVariantOptions][__name__][titleTranslation]" class="form-control" maxlength="60" minlength="5" />';
    newOption +='<span class="fas form-control-feedback" aria-hidden="true"></span></div><div class="help-block with-errors"></div></div>';
    newOption +='<div class="form-group col-md-4 col-sm-4 col-xs-4"><label for="variant_articleVariantOptions___name___isTranlation">statt Zahlenwert Option Übersetzung benutzen</label><div class="input-group">';
    newOption +='<input type="checkbox" id="variant_articleVariantOptions___name___isTranlation" name="variant[articleVariantOptions][__name__][isTranlation]" class="isTranlation" value="1" />';
    newOption +='</div></div>';
    newOption +='</div>';
    newOption +='</div>';
    
    newOption = newOption.replace(/__name__/g, counter);
    
    jQuery( "#articleVariantOptions-field-list" ).append(newOption);
    
    initUnityValueDatePicker('#variant_articleVariantOptions_' + counter + '_unityValue');
};

initUnityValueDatePicker = function(element) {
    jQuery.datetimepicker.setLocale('de');
    jQuery(element).datetimepicker({
        timepicker: false,
        format: 'd.m.Y',
        debug: true
    });
};