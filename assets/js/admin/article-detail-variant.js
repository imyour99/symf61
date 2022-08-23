initArticleVariant = function() {
    
    prepareArticleVariantSettings(false);
    initArticleVariantForm();  
    initArticleVariantEvent();
    initArticleVariantOptionEvent();
    initArticleVariantPriceEvent();
    initArticleVariantTagResource();
    initArticleVariantBundleEvent();
    initArticleVariantLanguageEvent();
    initArticleVariantLanguagetinyMce();
    
};

prepareArticleVariantSettings = function(destroyIt) {
    
    /*
    if(jQuery('#articleCombine_articleType').val() == 'bundle') {    
        jQuery('#articleBundleOptionsAdd').prop('disabled', false);
        
        if (!jQuery("#articleCombine_isStockable").hasClass("btn-info")) {
            jQuery("#articleCombine_isStockable").trigger( "click" );
        }
        
        jQuery('#articleCombine_isStockable').prop('disabled', true);
    } else {
        
        jQuery('.btnArticleBundleOptionsDelete').each(function() {   
            jQuery(this).trigger( "click" );
        });
        
        jQuery('#articleBundleOptionsAdd').prop('disabled', true); 
        jQuery('#articleCombine_isStockable').prop('disabled', false);
    }
    */
    
    jQuery('#articleCombine_isStockable').prop('disabled', false);
    
    if(jQuery('#articleCombine_id').val() > 0) {     
        jQuery('#articleCombine_articleType').prop('disabled', true);
    }
    
    var isRequest = false;
    jQuery(".articleVariantOption").each(function() {      
        if(jQuery(this).find(':selected').attr('data-isrequest') == 1) {
            isRequest = true;
            return false;
        }
    });
    
    
    if(isRequest == true) {
        jQuery('.inputArticlePrice').prop('required',false).prop('disabled', false);
    } else {
        jQuery('.inputArticlePrice').prop('required',true).prop('disabled', false);
    }
    
    //jQuery('.inputArticleOldPrice.firstInputArticleOldPrice').prop('required',false).prop('disabled', false);
    //jQuery('.inputArticleOldPrice').not( ".firstInputArticleOldPrice" ).val('').prop('required',false).prop('disabled', true);
    
    destroyArticleVariantValidator(destroyIt);
    
};

destroyArticleVariantValidator = function(destroyIt)  {  
    if(destroyIt == true) {       
        articleVariantValidator.validator('destroy');
        initArticleVariantForm();
    }
};

initArticleVariantForm = function() {
    articleVariantValidator = jQuery('#article-variant-form').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
};

initArticleVariantEvent = function() { 
    jQuery('#articleCombine_articleType').unbind('change').bind('change', function(e) {  
        prepareArticleVariantSettings(true);
    });
};

initArticleVariantOptionEvent = function() {
    
    jQuery(".articleVariantOption").each(function() { 
        jQuery('#' + this.id).unbind('change').bind('change', function(e) {  
            prepareArticleVariantSettings(true);
        });
    });
};

initArticleVariantPriceEvent = function() {
    
    addArticleVariantPriceOption();
    deleteArticleVariantPriceOptionEvent();
    
};

addArticleVariantPriceOption = function() {
    
    jQuery('#articlePriceConsumerOptionsAdd, #articlePriceProfessionalOptionsAdd').unbind('click').bind('click', function(e) {  
        
        var type = jQuery(this).data("type");
        
        addInputArticleVariantPriceOption(type);
        prepareArticleVariantSettings(true);
        deleteArticleVariantPriceOptionEvent();
    });
    
};

deleteArticleVariantPriceOptionEvent = function() {

    jQuery('.btnArticlePriceOptionsDelete').unbind('click').bind('click', function(e) {    
        var type = jQuery(this).data("type");
        var key = jQuery(this).data("key");
        jQuery('#articleCombine_articlePrice' + type + 'Options_' + key).remove();
        checkArticleVariantPriceOptionClass(type);
        prepareArticleVariantSettings(true);
    });
    
};


addInputArticleVariantPriceOption = function(type) {
    
    var typeSelect = type.substr(0, 1).toLowerCase();
    var listId = '#articlePrice' + type + 'Options-field-list';
    var maxKey = getNextMaxArticleVariantPriceOptionKey(type);
    
    var labelQty = '';
    var classOldPrice = '';
    var newOption = '';
    if(maxKey == 0) {
        classOldPrice = ' firstInputArticleOldPrice';
    } else if(maxKey > 0) {
        labelQty = '&lt;&nbsp;';
    }

    newOption +='<div id="articleCombine_articlePrice' + type + 'Options___name__" class="articlePriceOption"  data-key="__name__">';
        newOption +='<div class="form-row">';  
            
            newOption +='<div class="form-group col-md-3 col-sm-3 col-3 has-feedback">';  
                newOption +='<label for="articleCombine_articlePrice' + type + 'Options___name___type">Preis-Type</label>';
                newOption +='<div class="input-group">';  
                    newOption +='<select id="articleCombine_articlePrice' + type + 'Options___name___type" name="articleCombine[articlePrice' + type + 'Options][__name__][type]" class="form-control" type="select"><option value="' + typeSelect + '">' + type + '</option></select>';
                    newOption +='<span class="fas form-control-feedback inputSelect fa-check" aria-hidden="true"></span>';  
                newOption +='</div>';
                newOption +=' <div class="help-block with-errors"></div>  ';
            newOption +='</div>';
            
            /*
            newOption +='<div class="form-group col-md-2 col-sm-2 col-2 has-feedback">';
                newOption +='<label for="articleCombine_articlePrice' + type + 'Options___name___qty">' + labelQty + 'Menge&nbsp;&gt;=</label>';
                newOption +='<div class="input-group">';  
                    newOption +='<input type="number" id="articleCombine_articlePrice' + type + 'Options___name___qty" name="articleCombine[articlePrice' + type + 'Options][__name__][qty]" required="required" class="form-control" min="1" />';
                    newOption +='<span class="fas form-control-feedback fa-check" aria-hidden="true"></span>';  
                newOption +='</div>';
                newOption +=' <div class="help-block with-errors"></div>  ';
            newOption +='</div>';
            */
           
            newOption +='<div class="form-group col-md-2 col-sm-2 col-2 has-feedback">';
                newOption +='<label for="articleCombine_articlePrice' + type + 'Options___name___price">Preis</label>';
                newOption +='<div class="input-group">';    
                    newOption +='<input type="text" id="articleCombine_articlePrice' + type + 'Options___name___price" name="articleCombine[articlePrice' + type + 'Options][__name__][price]" required="required" class="form-control inputArticlePrice" maxlength="8" pattern="^\\d+(\\.\\d+)?$" data-error="Der angegebene Wert ist Ungültig!" />';
                    newOption +='<span class="fas form-control-feedback fa-check" aria-hidden="true"></span>';                                                                                                                                                              
                newOption +='</div>';
                newOption +=' <div class="help-block with-errors"></div>  ';
            newOption +='</div>';
            
            newOption +='<div class="form-group col-md-2 col-sm-2 col-2 has-feedback">';
                newOption +='<label for="articleCombine_articlePrice' + type + 'Options___name___oldPrice" class="labelStroke" >Preis&nbsp;vorher</label>';
                newOption +='<div class="input-group">';    
                    newOption +='<input type="text" id="articleCombine_articlePrice' + type + 'Options___name___oldPrice" name="articleCombine[articlePrice' + type + 'Options][__name__][oldPrice]" class="form-control inputArticleOldPrice' + classOldPrice + '" maxlength="8" pattern="^\\d+(\\.\\d+)?$" data-error="Der angegebene Wert ist Ungültig!" />';
                    newOption +='<span class="fas form-control-feedback fa-check" aria-hidden="true"></span>';                                                                                                                                                              
                newOption +='</div>';
                newOption +=' <div class="help-block with-errors"></div>  ';
            newOption +='</div>';

            newOption +='<div class="form-group col-md-3 col-sm-3 col-3">';
                newOption +='<input type="hidden" id="articleCombine_articlePrice' + type + 'Options___name___articleCombineId" name="articleCombine[articlePrice' + type + 'Options][__name__][articleCombineId]" value="' + jQuery('#articleCombine_id').val()  + '" > ';  
                newOption +='<label>&nbsp;</label>';
                newOption +='<div class="input-group">';
                    newOption +='<button type="button" class="btn btn-danger btn-iconLeft btnArticlePriceOptionsDelete" id="articleCombine_articlePrice' + type + 'Options_delete___name__" data-type="' + type + '" data-key="__name__"><i class="fas fa-trash"></i>entfernen</button>';
                newOption +='</div>';
            newOption +='</div>'

        newOption +='</div>';
    newOption +='</div>';
    
    newOption = newOption.replace(/__name__/g, maxKey);
    jQuery(listId).append(newOption);
    
};

getNextMaxArticleVariantPriceOptionKey = function(type) {
  
    var maxKey = 0;
    
    if(parseInt(jQuery('#articlePrice' + type + 'Options-field-list').children().length) == 0) {
        return(maxKey);
    }

    jQuery('#articlePrice' + type + 'Options-field-list .articlePriceOption').each(function() {
        if (parseInt(jQuery(this).data('key')) > maxKey) {
            maxKey = parseInt(jQuery(this).data('key'));
        }
    });

    maxKey++;
    return(maxKey);

};

checkArticleVariantPriceOptionClass = function(type) {
  
    var index = 0;
    jQuery('#articlePrice' + type + 'Options-field-list .inputArticleOldPrice').each(function() {
        
        if(index == 0) {
            jQuery(this).addClass("firstInputArticleOldPrice");
        } else if(index > 0) {
            jQuery(this).removeClass("firstInputArticleOldPrice");
        }
        
        index++;
        
    });
    
};

initArticleVariantTagResource = function() {
    
    jQuery('#articleCombine_tagResource').multiSelect({
        selectableHeader: '<label for="article_categoryResource">Tags:</label>',
        selectionHeader: '<label >zugewiesene Tags:</label>',
        selectableOptgroup: true
    });
    
};

initArticleVariantBundleEvent = function() {
  
    addArticleVariantBundleOption();
    deleteArticleVariantBundleOptionEvent();
    
};

addArticleVariantBundleOption = function() {
    
    jQuery('#articleBundleOptionsAdd').unbind('click').bind('click', function(e) {  
        
        addInputArticleVariantBundleOption();
        prepareArticleVariantSettings(true);
        deleteArticleVariantBundleOptionEvent();

    });
    
};

deleteArticleVariantBundleOptionEvent = function() {

    jQuery('.btnArticleBundleOptionsDelete').unbind('click').bind('click', function(e) {    
        var key = jQuery(this).data("key");
        jQuery('#articleBundle_' + key).remove();
        prepareArticleVariantSettings(true);
    });
    
};

addInputArticleVariantBundleOption = function() {
    
    var row = '';
    var listId = '#articleBundleOptions-field-list';
    var rowClass = 'articleBundleOption';
    var maxKey = getNextMaxArticleVarianBundleOptionKey(listId, rowClass);
    
    row +='<div id="articleBundle___name__" class="' + rowClass +'"  data-key="__name__">';
        row +='<div class="form-row">';  
            
            row +='<div class="form-group col-md-6 col-sm-6 col-6 has-feedback">';  
                row +='<label for="articleBundle___name___bundleCombineId">Bundle-Inhalt</label>';
                row +='<div class="input-group">';  
                    row +='<select id="articleBundle___name___bundleCombineId" name="articleCombine[articleBundleOptions][__name__][bundleCombineId]" required="required" class="form-control" type="select"></select>';
                    row +='<span class="fas form-control-feedback inputSelect fa-check" aria-hidden="true"></span>';  
                row +='</div>';
                row +=' <div class="help-block with-errors"></div>  ';
            row +='</div>';
            
            row +='<div class="form-group col-md-3 col-sm-3 col-3 has-feedback">';
                row +='<label for="articleBundle___name___qty">Menge</label>';
                row +='<div class="input-group">';  
                    row +='<input type="number" id="articleBundle___name___qty" name="articleCombine[articleBundleOptions][__name__][qty]" required="required" class="form-control" min="1" />';
                    row +='<span class="fas form-control-feedback fa-check" aria-hidden="true"></span>';  
                row +='</div>';
                row +=' <div class="help-block with-errors"></div>  ';
            row +='</div>';
            
            row +='<div class="form-group col-md-3 col-sm-3 col-3">';
                row +='<input type="hidden" id="articleBundle___name___articleCombineId" name="articleCombine[articleBundleOptions][__name__][articleCombineId]" value="' + jQuery('#articleCombine_id').val()  + '" > ';  
                row +='<label>&nbsp;</label>';
                row +='<div class="input-group">';
                    row +='<button type="button" class="btn btn-danger btn-iconLeft btnArticleBundleOptionsDelete" id="articleBundle_delete___name__" data-key="__name__"><i class="fas fa-trash"></i>entfernen</button>';
                row +='</div>';
            row +='</div>' 
           
        row +='</div>';
    row +='</div>';
    
    row = row.replace(/__name__/g, maxKey);
    jQuery(listId).append(row);
    addArticleBundleSelectOptions(listId, maxKey);
    
};

addArticleBundleSelectOptions = function(listId, key) {
    
    var options = jQuery(listId).data("bundleresource");
    jQuery('#articleBundle_' + key + '_bundleCombineId').append('<option value="" selected="selected" >Bitte Wählen</option>');

    jQuery.each(options, function(val, text) {             
        jQuery('#articleBundle_' + key + '_bundleCombineId').append('<option value="' + val + '">' + text + '</option>');
    });
    
};

getNextMaxArticleVarianBundleOptionKey = function(listId, rowClass) {
  
    var maxKey = 0;
    
    if(parseInt(jQuery(listId).children().length) == 0) {
        return(maxKey);
    }

    jQuery( listId + ' .' + rowClass).each(function() {
        if (parseInt(jQuery(this).data('key')) > maxKey) {
            maxKey = parseInt(jQuery(this).data('key'));
        }
    });

    maxKey++;
    return(maxKey);

};

initArticleVariantLanguageEvent = function() {
    
    jQuery('#articleCombine_articleCombineLanguageOptions_0_articleLanguage').unbind('change').bind('change', function(e) {  
        var language = jQuery(this).val();
        
        var url = jQuery(this).data("variantlanguagereloadurl");
        var newUrl = url.replace(/LG/, language);
        
        window.location = newUrl;
        
    });
};

initArticleVariantLanguagetinyMce = function() { 
    tinyMce.render('textarea#articleCombine_articleCombineLanguageOptions_0_description, textarea#articleCombine_articleCombineLanguageOptions_0_ingredients', 400);
};